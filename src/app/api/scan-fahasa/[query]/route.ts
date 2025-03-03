import { JSDOM } from 'jsdom';
import {
  Book,
  ScanResult,
  FahasaProduct,
  FahasaSearchResponse,
  Warning,
} from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const { query } = await params;

  const limit = 48;
  const products: FahasaProduct[] = [];
  let page = 1;
  let finished = false;
  do {
    const url =
      'https://www.fahasa.com/api/elsearch/api/as/v1/engines/fhs-production-v2/search.json';
    const params = {
      query: query,
      search_fields: {
        title: {
          weight: 2,
        },
        sku: {
          weight: 0.5,
        },
      },
      page: {
        size: limit,
        current: page,
      },
      filters: {
        all: [
          {
            all: [
              {
                stock_status: 1,
              },
            ],
          },
          {
            none: [
              {
                price: 0,
              },
            ],
          },
          {
            any: [
              {
                visibility: [3, 4],
              },
            ],
          },
          {
            any: [
              {
                visibility_1: 1,
              },
            ],
          },
        ],
      },
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: process.env.FAHASA_AUTH || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const resJson: FahasaSearchResponse = await res.json();
    if (!res.ok) {
      throw resJson;
    }

    const { results } = resJson;
    const matchedProducts = results.filter((product) =>
      product.title.raw?.toLowerCase().includes(query.toLowerCase())
    );
    products.push(...matchedProducts);
    finished = resJson.meta.page.current === resJson.meta.page.total_pages;
    page++;
  } while (!finished);

  // Extract book info from HTML
  const books: Book[] = [];
  const warnings: Warning[] = [];
  for (const product of products) {
    const url = `https://www.fahasa.com${product.link.raw}`;
    const res = await fetch(url);
    const resText = await res.text();
    if (!res.ok) {
      console.error(
        `Failed to fetch ${url}. Status code: ${res.status}. Response text: ${resText}`
      );
      continue;
    }

    const dom = new JSDOM(resText);
    const quantityEl = dom.window.document.querySelector(
      '.view-rate .product-view-qty-num'
    );
    if (!quantityEl) {
      warnings.push({
        message: `quantityEl=${quantityEl}`,
        data: { url, resText },
      });
    }

    const childNodes = quantityEl && Array.from(quantityEl.childNodes);
    const soldNode = childNodes?.find((node: any) => node.nodeName === '#text');
    const sold = parseInt(soldNode?.textContent || '');
    if (typeof sold !== 'number') {
      if (quantityEl) {
        warnings.push({
          message: `sold=${sold}`,
          data: { url, quantityEl: quantityEl.innerHTML },
        });
      }
      continue;
    }

    const sellerEl = dom.window.document.querySelector(
      '.product-view-sa_one .product-view-sa-supplier a'
    );
    const seller = sellerEl?.textContent || undefined;
    if (!seller) {
      warnings.push({
        message: `seller=${seller}`,
        data: { url, sellerEl: sellerEl?.innerHTML },
      });
    }

    books.push({
      name: product.title.raw || '',
      id: product.id.raw || '',
      sku: product.sku.raw || undefined,
      source: 'Fahasa',
      url,
      seller,
      thumbnailUrl: product.thumbnail.raw || undefined,
      sold,
    });
  }

  const result: ScanResult = { results: books };
  if (warnings.length) result.warnings = warnings;
  return Response.json(result);
}

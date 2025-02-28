import { Book, TikiProduct } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const { query } = await params;

  const limit = 40;
  const products: TikiProduct[] = [];
  let page = 1;
  let finished = false;
  do {
    const url =
      'https://tiki.vn/api/v2/products?' +
      new URLSearchParams({
        limit: String(limit),
        page: String(page),
        sort: 'top_seller',
        q: query,
      });
    const res = await fetch(url);
    const resJson = await res.json();
    if (!res.ok) {
      throw resJson?.error || resJson;
    }

    const { data } = resJson;
    const matchedProducts = data.filter((product: TikiProduct) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    products.push(...matchedProducts);
    finished = data.length < limit || matchedProducts.length === 0;
    page++;
  } while (!finished);

  const books = products.map((product) => {
    const {
      name,
      id,
      sku,
      seller_name,
      url_path,
      thumbnail_url,
      quantity_sold,
      visible_impression_info: { amplitude },
    } = product;
    return {
      name,
      id: String(id),
      sku,
      source: 'Tiki',
      url: `https://tiki.vn/${url_path}`,
      seller: seller_name,
      thumbnailUrl: thumbnail_url,
      sold: amplitude.all_time_quantity_sold || quantity_sold?.value,
    } as Book;
  });

  return Response.json({ results: books });
}

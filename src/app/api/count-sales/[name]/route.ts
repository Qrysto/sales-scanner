import { searchTiki } from '@/lib/sales';

export async function GET(request: Request, params: { name: string }) {
  const books = searchTiki(params.name);

  return new Response(JSON.stringify(books));
}

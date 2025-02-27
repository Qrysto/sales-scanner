import { searchTiki } from '@/lib/sales';

export async function GET(request: Request, params: { name: string }) {
  const books = await searchTiki(params.name);

  return Response.json(books);
}

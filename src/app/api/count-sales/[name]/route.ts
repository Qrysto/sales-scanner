import { searchTiki } from '@/lib/sales';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const books = await searchTiki(name);

  return Response.json(books);
}

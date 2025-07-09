import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Article } from '@/lib/definitions'
import { deleteArticle } from './actions'

export function ArticleRow({ article }: { article: Article }) {
  const status = article.is_draft ? 'Draft' : 'Published'
  const statusVariant = article.is_draft ? 'secondary' : 'default'

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={article.judul || 'Article image'}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={article.images || '/placeholder-user.jpg'} // Gunakan placeholder jika tidak ada gambar
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{article.judul}</TableCell>
      <TableCell>
        <Badge variant={statusVariant} className="capitalize">
          {status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{article.author}</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(article.date).toLocaleDateString('id-ID')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={deleteArticle} className="w-full">
              <input type="hidden" name="id" value={article.id} />
              <button
                type="submit"
                className="hover:bg-accent focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm text-red-500 transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                Delete
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

'use client'

import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Article } from '@/lib/definitions'
import { ArticleRow } from './article-row'

export function ArticlesTable({ articles }: { articles: Article[] }) {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Articles</CardTitle>
        <CardDescription>
          Manage your articles and view their status.
        </CardDescription>
      </CardHeader> */}

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <ArticleRow key={article.id} article={article} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

import { File, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getArticles } from '@/lib/db'
import { ArticlesTable } from './articles-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AddArticleDialog } from './components/add-article-dialog'

export default async function DashboardPage() {
  const articles = await getArticles()

  if (!articles) {
    return <div>Failed to load articles. Please try again later.</div>
  }

  return (
    <Card>
      <div className="flex items-center">
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>Manage your articles and view their status.</CardDescription>
        </CardHeader>
        <div className="ml-auto flex items-center gap-2 pr-3">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
          </Button>

          {/* <Button size="sm" variant="outline" className="h-8 gap-2 pr-3">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Article</span>
          </Button> */}

          <AddArticleDialog />
        </div>
      </div>
      <CardContent>
        <ArticlesTable articles={articles} />
      </CardContent>
    </Card>
  )
}

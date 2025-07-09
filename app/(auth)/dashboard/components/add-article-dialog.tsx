'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import { AddArticleForm } from './add-article-form'

export function AddArticleDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-2 pr-3">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Article</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-10 max-h-[calc(100vh-5rem)] translate-y-0 overflow-y-auto sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Article</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new article. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <AddArticleForm onFormSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

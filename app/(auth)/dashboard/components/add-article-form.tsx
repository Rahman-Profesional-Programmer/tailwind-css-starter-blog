'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createArticle } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AddArticleForm({ onFormSuccess }: { onFormSuccess: () => void }) {
  const initialState = { message: '', success: false }
  const [state, dispatch] = useFormState(createArticle, initialState)

  useEffect(() => {
    if (state.success) {
      onFormSuccess() // Panggil fungsi ini untuk menutup dialog
    }
  }, [state, onFormSuccess])

  return (
    <form action={dispatch} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="judul" className="text-right">
          Title
        </Label>
        <Input id="judul" name="judul" className="col-span-3" required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="summary" className="text-right">
          Summary
        </Label>
        <Textarea id="summary" name="summary" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="artikel" className="text-right">
          Content
        </Label>
        <Textarea id="artikel" name="artikel" className="col-span-3" rows={8} required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tags" className="text-right">
          Tags
        </Label>
        <Input id="tags" name="tags" className="col-span-3" placeholder="tag1, tag2, tag3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="images" className="text-right">
          Image URL
        </Label>
        <Input id="images" name="images" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Type
        </Label>
        <Select name="type" defaultValue="article">
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="project">Project</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="is_draft" className="text-right">
          Status
        </Label>
        <div className="col-span-3 flex items-center space-x-2">
          <Checkbox id="is_draft" name="is_draft" />
          <label htmlFor="is_draft" className="text-sm leading-none font-medium">
            Save as Draft
          </label>
        </div>
      </div>

      {state.message && !state.success && <p className="text-sm text-red-500">{state.message}</p>}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      size="sm"
      variant="outline"
      className="mt-4 h-8 w-full gap-1 bg-black text-white hover:bg-gray-800"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Saving...' : 'Save Article'}
    </Button>
  )
}

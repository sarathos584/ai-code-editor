import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'

const FreeTierNoticeDialogProps = () => {
  const [open, setOpen] = useState(true)

  // Optionally, you can add logic to only show once per session using localStorage/sessionStorage

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[90vw] w-full sm:max-w-lg p-4 sm:p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>⚠️ AI Free Tier Notice</DialogTitle>
          <DialogDescription>
            This demo uses a free-tier AI model for code generation. Results may contain serious mistakes or inaccuracies. Please review all generated code carefully before using it in production.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FreeTierNoticeDialogProps

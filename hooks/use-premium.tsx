import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";
import SalesPlans from "@/features/sales/components/sales-plans";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export const usePremium = (): [() => JSX.Element, () => void] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void,
  } | null>(null)

  const handleClose = () => {
    setPromise(null)
  }
  const handleOpen = () => {
    setPromise({
      resolve: () =>
        console.log("Siuuuuuuuuuuuuuu!!"),
    })
  }

  const open = () => {
    promise?.resolve(true)
    handleOpen()
  }

  const ConfirmDialog = () => {
    if (promise !== null) {
      return (
        <Dialog open={promise !== null} onOpenChange={handleClose}>
          <DialogContent className="md:max-w-3xl">
            <div className="max-h-[80vh] overflow-y-auto W-[900px]">
              <SalesPlans isModal />
            </div>
          </DialogContent>
        </Dialog>
      )
    }
    return <></>

  }

  return [ConfirmDialog, open]
}
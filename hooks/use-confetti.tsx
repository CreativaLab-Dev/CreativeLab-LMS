import { useState } from "react";
import ReactConfetti from "react-confetti"


export const useConfetti = (): [() => JSX.Element, () => void] => {
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
        <ReactConfetti
          className="pointer-event-none z-[100]"
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={() => {
            handleClose()
          }}
        />
      )
    }
    return <></>

  }

  return [ConfirmDialog, open]
}
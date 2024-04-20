import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';

type Props = {
    show: boolean,
    close: () => void;
    text: string;
    action: () => void
}

export const ConfirmationPopup = ({show, text, close, action}: Props) => {

    const closeModal = (open: boolean) => {
        if(!open) {
            close()
        }
    }

    const closeWithAction = () => {
        action();
        close();
    }

    return (
        <Dialog modal={true} open={show} onOpenChange={closeModal}>
        {/* <DialogTrigger asChild>
            <Button className={props.className} >
                + Create New Project
          </Button>
        </DialogTrigger> */}
          <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
              <DialogHeader>
              <DialogDescription>
                {text}
              </DialogDescription>
              
              
              </DialogHeader>
              <DialogFooter>
                {/* <DialogClose asChild type='submit'> */}
                    <Button onClick={() => closeWithAction()}>Yes</Button>
                    <Button onClick={() => close()} variant={'secondary'}>No</Button>
                {/* </DialogClose> */}
              </DialogFooter>
          </DialogContent>
        </Dialog>
      )
}
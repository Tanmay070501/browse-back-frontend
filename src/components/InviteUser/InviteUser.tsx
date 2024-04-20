import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ErrorAlert from '../Error/ErrorAlert'
import { InviteUserFormData } from '@/@types/user'
import { InviteUserFormDataKeys, initialInviteUserValue } from '@/constants/auth'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { useInvitePopupStore } from '@/store/useInvitePopupStore'
import { inviteUser } from '@/actions/user'

type Props = {}

export const InviteUser = (_props: Props) => {
    const show = useInvitePopupStore((state) => state.show)
    const setShow = useInvitePopupStore((state) => state.setShow)
    const [formData, setFormData] = React.useState<InviteUserFormData>(initialInviteUserValue)
    const [error, setError] = React.useState("")
    const valueChangeHandler = (key: InviteUserFormDataKeys, value: any) => {
        setFormData(prev => ({
          ...prev,
          [key]: value
        }))
    }
  
    const resetEverything = (open: boolean) => {
      setShow(open)
      setFormData(initialInviteUserValue)
      setError("")
    }
  
    const handleSubmit:React.FormEventHandler<HTMLFormElement>  = e => {
      e.preventDefault()
      setError("")
      if(!formData.email){
        setError("Email name is required")
        return; 
      }
      inviteUser(formData.email)
      resetEverything(false)
    }
  
    return (
      <Dialog open={show} onOpenChange={resetEverything}>
      {/* <DialogTrigger asChild>
          <Button className={props.className} >
              + Create New Project
        </Button>
      </DialogTrigger> */}
        <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
        <form onSubmit={handleSubmit}>
            <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            {
              error && 
              <DialogDescription>
                <ErrorAlert message={error}/>
              </DialogDescription>
            }
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label aria-required htmlFor="project-name">
                  Email
                </Label>
                <Input
                  id="project-name"
                  className="col-span-3"
                  value={formData.email}
                  type='email'
                  required
                  onChange={e => valueChangeHandler(InviteUserFormDataKeys.email, e.target.value)}
                />
              </div>
            </div>
            </DialogHeader>
            <DialogFooter>
              {/* <DialogClose asChild type='submit'> */}
                  <Button type='submit'>Save</Button>
              {/* </DialogClose> */}
            </DialogFooter>
        </form>
        </DialogContent>
      </Dialog>
    )
}
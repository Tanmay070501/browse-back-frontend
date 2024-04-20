import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { ProjectFormData, ProjectFormDataKeys, projectInitialVals } from '@/constants/project'
import ErrorAlert from '../Error/ErrorAlert'
import { createProject } from '@/actions/project'
type Props = {
    className?: string 
}

const CreateProject = (props: Props) => {
  const [formData, setFormData] = React.useState<ProjectFormData>(projectInitialVals)
  const [error, setError] = React.useState("")
  const valueChangeHandler = (key: ProjectFormDataKeys, value: any) => {
      setFormData(prev => ({
        ...prev,
        [key]: value
      }))
  }

  const resetEverything = () => {
    setFormData(projectInitialVals)
    setError("")
  }

  const handleSubmit:React.FormEventHandler<HTMLFormElement>  = e => {
    e.preventDefault()
    setError("")
    if(!formData.projectName){
      setError("Project name is required")
      return; 
    }
    createProject(formData)
  }

  return (
    <Dialog onOpenChange={resetEverything}>
    <DialogTrigger asChild>
        <Button className={props.className} >
            + Create New Project
      </Button>
    </DialogTrigger>
      <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
      <form onSubmit={handleSubmit}>
          <DialogHeader>
          <DialogTitle>Enter Project Details</DialogTitle>
          {
            error && 
            <DialogDescription>
              <ErrorAlert message={error}/>
            </DialogDescription>
          }
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-name">
                Project name
              </Label>
              <Input
                id="project-name"
                className="col-span-3"
                value={formData.projectName}
                onChange={e => valueChangeHandler(ProjectFormDataKeys.projectName, e.target.value)}
              />
            </div>
          </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose  asChild type='submit'>
                <Button>Save</Button>
            </DialogClose>
          </DialogFooter>
      </form>
      </DialogContent>
    {/* <DialogClose asChild>
      <span>x</span>
    </DialogClose> */}
    </Dialog>
  )
}

export default CreateProject
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useErrorStore } from '@/store/useErrorStore'
import { SetupOrgData, SetupOrgDataKeys, setupOrginitialVals } from '@/constants/unauth-type'
import ErrorAlert from '../Error/ErrorAlert'
import { setupOrg } from './actions/actions'
import { useSearchParams } from 'react-router-dom'

type Props = {}

function SetupOrg({}: Props) {
  const errorMessage = useErrorStore((state) => state.message)
  const setErrorMessage = useErrorStore(state => state.setErrorMessage)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [formVals, setFormVals] = React.useState<SetupOrgData>(setupOrginitialVals(token ?? ""))

  const valueChangeHandler = (key: SetupOrgDataKeys, value: any) => {
      setFormVals(prev => ({
        ...prev,
        [key]: value
      }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    
    setErrorMessage("")
    if(!formVals.name){
      setErrorMessage("Email is required")
      return;
    } 
    if(!formVals.orgName){
      setErrorMessage("Organization name is required")
      return;
    }

    setupOrg(formVals, () => setFormVals(setupOrginitialVals(token ?? "")))
  }
  return (
    <>
            <form className='w-[400px]' onSubmit={handleSubmit}>
                <Card>
                <CardHeader>
                    <CardTitle>Setup your Organization</CardTitle>
                    <CardDescription>
                        Fill out these details to get started.
                    </CardDescription>
                    { errorMessage && <ErrorAlert message={errorMessage}/>}
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Your Name</Label>
                        <Input value={formVals.name} onChange={e => valueChangeHandler(SetupOrgDataKeys.name, e.target.value)} id="name" type="text" required/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="orgName">Organization Name</Label>
                        <Input value={formVals.orgName} onChange={e => valueChangeHandler(SetupOrgDataKeys.orgName, e.target.value)} id="orgName" type="text" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Lets do this!</Button>
                </CardFooter>
                </Card>
            </form>
    </>
  )
}

export default SetupOrg
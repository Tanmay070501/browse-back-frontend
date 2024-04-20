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
import ErrorAlert from '../Error/ErrorAlert'
import { useSearchParams } from 'react-router-dom'
import { JoinOrgData, JoinOrgDataKeys, joinOrginitialVals } from '@/constants/unauth-type'
import { joinOrg } from './actions/actions'


type Props = {}

const JoinOrg = (props: Props) => {
  const errorMessage = useErrorStore((state) => state.message)
  const setErrorMessage = useErrorStore(state => state.setErrorMessage)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const orgName = searchParams.get('org_name');

  const [formVals, setFormVals] = React.useState<JoinOrgData>(joinOrginitialVals(token ?? ""))

  const valueChangeHandler = (key: JoinOrgDataKeys, value: any) => {
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
    if(!formVals.password){
      setErrorMessage("Password is required")
      return;
    }

    joinOrg(formVals, () => setFormVals(joinOrginitialVals(token ?? "")));
    // setupOrg(formVals, () => setFormVals(setupOrginitialVals(token ?? "")))
  }
  return (
    <>
        <div className='w-full h-full flex justify-center items-center'>
            <form className='w-[400px]' onSubmit={handleSubmit}>
                <Card>
                <CardHeader>
                    <CardTitle>Join Organization: {orgName}</CardTitle>
                    <CardDescription>
                        Fill out these details to get started.
                    </CardDescription>
                    { errorMessage && <ErrorAlert message={errorMessage}/>}
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Your Name</Label>
                        <Input value={formVals.name} onChange={e => valueChangeHandler(JoinOrgDataKeys.name, e.target.value)} id="name" type="text" required/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="orgName">Password</Label>
                        <Input value={formVals.password} onChange={e => valueChangeHandler(JoinOrgDataKeys.password, e.target.value)} id="orgName" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Join Organization</Button>
                </CardFooter>
                </Card>
            </form>
        </div>
    </>
  )
}

export default JoinOrg;
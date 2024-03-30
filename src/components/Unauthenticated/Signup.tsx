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
import React from "react"
import ErrorAlert from "../Error/ErrorAlert"
import { useErrorStore } from "@/store/useErrorStore"
import { SignupFormData, SignupFormDataKeys, signupInitialVals } from "@/constants/unauth-type"
import { signup } from "./actions/actions"

type Props = {}

const Signup = (props: Props) => {
  const errorMessage = useErrorStore((state) => state.message)
  const setErrorMessage = useErrorStore(state => state.setErrorMessage)
  const [formVals, setFormVals] = React.useState<SignupFormData>(signupInitialVals)

  const valueChangeHandler = (key: SignupFormDataKeys, value: any) => {
      setFormVals(prev => ({
        ...prev,
        [key]: value
      }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    
    setErrorMessage("")
    if(!formVals.email){
      setErrorMessage("Email is required")
      return;
    } 
    if(!formVals.password){
      setErrorMessage("Password is required")
      return;
    }

    signup(formVals, () => setFormVals(signupInitialVals))
  }

  return (
  <form onSubmit={handleSubmit}>
    <Card>
      <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          { errorMessage && <ErrorAlert message={errorMessage}/>}
      </CardHeader>
      <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input value={formVals.email} onChange={e => valueChangeHandler(SignupFormDataKeys.email, e.target.value)} id="email" type="email" required/>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input value={formVals.password} onChange={e => valueChangeHandler(SignupFormDataKeys.password, e.target.value)} autoComplete={"current-password"} id="password" type="password" required />
          </div>
      </CardContent>
      <CardFooter>
          <Button type="submit">Sign up</Button>
      </CardFooter>
    </Card>
  </form>
  )
}

export default Signup
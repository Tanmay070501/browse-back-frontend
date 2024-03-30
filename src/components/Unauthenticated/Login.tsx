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
import { login } from "./actions/actions"
import { LoginFormData, LoginFormDataKeys, loginInitialVals } from "@/constants/unauth-type"

type Props = {}

const Login = (props: Props) => {
  const errorMessage = useErrorStore((state) => state.message)
  const [formVals, setFormVals] = React.useState<LoginFormData>(loginInitialVals)

  const valueChangeHandler = (key: LoginFormDataKeys, value: any) => {
      setFormVals(prev => ({
        ...prev,
        [key]: value
      }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if(!formVals.email){
      return;
    } 
    if(!formVals.password){
      return;
    }
    login(formVals, () => setFormVals(loginInitialVals))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            { errorMessage && <ErrorAlert message={errorMessage}/>}
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
                autoComplete="email"
                value={formVals.email} 
                id="email" 
                type="email" 
                onChange={e => valueChangeHandler(LoginFormDataKeys.email, e.target.value)}  
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input 
                autoComplete={"current-password"}
                value={formVals.password}  
                id="password" 
                type="password"  
                onChange={e => valueChangeHandler(LoginFormDataKeys.password, e.target.value)} 
              />
            </div>
        </CardContent>
        <CardFooter>
            <Button type="submit">Log in</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default Login
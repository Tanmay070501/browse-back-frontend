import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { Link } from "react-router-dom"

type Props = {}

const Login = (_props: Props) => {
  const errorMessage = useErrorStore((state) => state.message)
  const setErrorMessage = useErrorStore(state => state.setErrorMessage)
  const [formVals, setFormVals] = React.useState<LoginFormData>(loginInitialVals)

  const valueChangeHandler = (key: LoginFormDataKeys, value: any) => {
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
    login(formVals, () => setFormVals(loginInitialVals))
  }

  return (
    <>
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
                required 
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
                required 
              />
            </div>
        </CardContent>
        <CardFooter>
            <Button type="submit">Log in</Button>
        </CardFooter>
      </Card>
    </form>
    <Button className="text-blue-400 p-0" variant={"link"} asChild >
      <Link to="/forget_password">
          Forgot Password?
      </Link>
    </Button>
    </>
  )
}

export default Login
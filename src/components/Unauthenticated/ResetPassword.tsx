import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ErrorAlert from "../Error/ErrorAlert"
import { useErrorStore } from "@/store/useErrorStore"
import React from "react"
import { ResetPassFormData, ResetPassFormDataKeys, resetPassInitialVals } from "@/constants/unauth-type"
import { useSearchParams } from "react-router-dom"
import { resetPass } from "./actions/actions"
import { Link } from "react-router-dom"

type Props = {}

export const ResetPassword = (_props: Props) => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const errorMessage = useErrorStore((state) => state.message)
    const setErrorMessage = useErrorStore(state => state.setErrorMessage)
    const [formVals, setFormVals] = React.useState<ResetPassFormData>(resetPassInitialVals(token ?? ""))

    const valueChangeHandler = (key: ResetPassFormDataKeys, value: any) => {
        setFormVals(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setErrorMessage("")
        if(!formVals.password){
            setErrorMessage("Password is required")
            return;
        } 
        resetPass(formVals, () => setFormVals(resetPassInitialVals(token ?? "")));
    }

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div>
            <form className='w-[400px]' onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    { errorMessage && <ErrorAlert message={errorMessage}/>}
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            value={formVals.password} 
                            id="password" 
                            type="password" 
                            onChange={e => valueChangeHandler(ResetPassFormDataKeys.password, e.target.value)} 
                            required 
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </Card>
            </form>
            <Button className="text-blue-400 p-0" variant={"link"} asChild >
                <Link to="/login">
                    Back to Login
                </Link>
            </Button>
        </div>
    </div>
  )
}
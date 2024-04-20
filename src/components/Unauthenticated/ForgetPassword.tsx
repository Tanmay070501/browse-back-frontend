
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
import { ForgetPassFormData, ForgetPassFormDataKeys, forgetPassInitialVals } from "@/constants/unauth-type"
import { resetPass } from "./actions/actions"

type Props = {}

export const ForgetPassword = (_props: Props) => {
    const errorMessage = useErrorStore((state) => state.message)
    const setErrorMessage = useErrorStore(state => state.setErrorMessage)
    const [formVals, setFormVals] = React.useState<ForgetPassFormData>(forgetPassInitialVals)

    const valueChangeHandler = (key: ForgetPassFormDataKeys, value: any) => {
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
        resetPass(formVals, () => setFormVals(forgetPassInitialVals));
    }

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <form className='w-[400px]' onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
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
                        onChange={e => valueChangeHandler(ForgetPassFormDataKeys.email, e.target.value)} 
                        required 
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit">Submit</Button>
            </CardFooter>
        </Card>
        </form>
    </div>
  )
}
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { unverifiedRouterPaths } from "@/constants/router"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"

type Props = {}

const Unauthenticated = (props: Props) => {
    
    const location = useLocation()
    

    return (
        <div className="w-full h-full flex justify-center items-center">
        <Tabs value={`${location.pathname}`} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value={`${unverifiedRouterPaths.LOGIN}`} asChild>
                    <Link to={`${unverifiedRouterPaths.LOGIN}`}>
                    Login
                    </Link>
                </TabsTrigger>
                <TabsTrigger value={`${unverifiedRouterPaths.SIGNUP}`} asChild>
                    <Link to={`${unverifiedRouterPaths.SIGNUP}`}>
                        Signup
                    </Link>
                </TabsTrigger>
            </TabsList>
            <TabsContent value={`${unverifiedRouterPaths.LOGIN}`}>
                <Login/>
            </TabsContent>
            <TabsContent value={`${unverifiedRouterPaths.SIGNUP}`}>
                <Signup/>
            </TabsContent>
            </Tabs>
        </div>
    )
}

export default Unauthenticated
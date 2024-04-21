
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

const Unauthenticated = (_props: Props) => {
    
    const location = useLocation()
    

    return (
        <Tabs value={`${location.pathname}`} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value={`/${unverifiedRouterPaths.LOGIN}`} asChild>
                    <Link to={`/${unverifiedRouterPaths.LOGIN}`}>
                    Login
                    </Link>
                </TabsTrigger>
                <TabsTrigger value={`/${unverifiedRouterPaths.SIGNUP}`} asChild>
                    <Link to={`/${unverifiedRouterPaths.SIGNUP}`}>
                        Signup
                    </Link>
                </TabsTrigger>
            </TabsList>
            <TabsContent value={`/${unverifiedRouterPaths.LOGIN}`}>
                <Login/>
            </TabsContent>
            <TabsContent value={`/${unverifiedRouterPaths.SIGNUP}`}>
                <Signup/>
            </TabsContent>
            </Tabs>
    )
}

export default Unauthenticated
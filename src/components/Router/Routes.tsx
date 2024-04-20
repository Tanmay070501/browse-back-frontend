import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "../Unauthenticated/Login"
import Signup from "../Unauthenticated/Signup"
import Unauthenticated from "../Unauthenticated/Unauthenticated"
import { authenticatedRouterPaths, unverifiedRouterPaths } from "@/constants/router"
import SetupOrg from "../Unauthenticated/SetupOrg"
import { useUserStore } from "@/store/useUserStore"
import Authenticated from "../Layouts/Authenticated"
import Dashboard from "@/pages/Dashboard"
import SessionReplays from "@/pages/SessionReplays"
import SingleSessionReplay from "@/pages/SingleSessionReplay"
import JoinOrg from "../Unauthenticated/JoinOrg"
import Team from "@/pages/Team"

type Props = {}

const unverifiedRouter = createBrowserRouter([
    {
        path: unverifiedRouterPaths.LOGIN,
        element: <Unauthenticated/>
    },
    {
        path: unverifiedRouterPaths.SIGNUP,
        element: <Unauthenticated/>
    }, 
    {
        path: unverifiedRouterPaths.SETUP_ORG,
        element: <SetupOrg/>
    },
    {
      path: unverifiedRouterPaths.JOIN_ORG,
      element: <JoinOrg/>
  },
    {
        path: '*',
        element: <Navigate to={unverifiedRouterPaths.LOGIN}/>
    },

])

const authenticatedRouter = createBrowserRouter([
  {
    path: "*",
    element: <Authenticated/>,
    children: [
      {
        path: authenticatedRouterPaths.DASHBOARD,
        element: <Dashboard/>
      },
      {
        path: authenticatedRouterPaths.SINGLE_SESSION_REPLAY,
        element: <SingleSessionReplay/>
      },
      {
        path: authenticatedRouterPaths.SESSION_REPLAYS,
        element: <SessionReplays/>
      },
      {
        path: authenticatedRouterPaths.TEAM,
        element: <Team/>
      },
      {
        path: "*",
        element: <Navigate to={`/${authenticatedRouterPaths.DASHBOARD}`}/>
      }
    ]
  }
])
const Routes = (props: Props) => {
  const authToken = useUserStore(state => state.authToken)
  const router = authToken ? authenticatedRouter : unverifiedRouter
  return (
    <RouterProvider router={router}/>
  )
}

export default Routes
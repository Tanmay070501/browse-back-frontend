import Routes from "./components/Router/Routes"
import { Toaster } from "./components/ui/sonner"




function App() {

  return (
    <>
    <Toaster closeButton={true} duration={5000}/>
    <Routes/>
    </>
  )
}

export default App

import Routes from "./components/Router/Routes"
import { Toaster } from "./components/ui/sonner"

function App() {


  return (
    <>
    <Toaster closeButton={true} duration={5000}/>
    <Routes/>
    {/* <div id="video-wrapper" style={{width: "800px", height: "500px"}}>
    <Player width={800} height={500}/>
    </div> */}
    </>
  )
}

export default App

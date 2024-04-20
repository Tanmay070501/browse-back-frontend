import React from "react"
import Routes from "./components/Router/Routes"
import { Toaster } from "./components/ui/sonner"
import { BrowseBack } from "@tannu-dev/browse-back"
import axios from "axios"




function App() {
  React.useEffect(() => {
    // console.log("yea")
    //   BrowseBack.init({
    //     apiKey: "67a11260975a671f654b2ee572c8",
    //     socketUrl: "ws://localhost:5000",
    //     username: "Tannu",
    //     user_identifier: "1",
    //     recordErrorOnly: false,
    // })
  }, [])

  

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

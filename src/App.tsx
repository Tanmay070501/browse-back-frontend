import React, { useRef } from 'react'
import rrwebPlayer from 'rrweb-player';
// import 'rrweb-player/dist/style.css';
import { event } from './event';
import { getReplayConsolePlugin } from 'rrweb';
import { Button } from "@/components/ui/button"
import Player from './components/Player/Player';
import { PlayIcon } from '@radix-ui/react-icons';

function App() {
  // const replayer = useRef<rrwebPlayer | null>(null)

  // React.useEffect(() => {
  //   let events = structuredClone(event)
  //   events = events.filter((d) => {
  //       return d.data?.tag !== "ignore-me"
  //   })
      
      
  //     replayer.current = new rrwebPlayer({
  //       target: document.getElementById('video-player') as HTMLDivElement,

  //       props: {
  //          events: events,
  //          autoPlay: false,
  //          showController: true,
  //          triggerFocus: true,
  //         tags: {
  //           "bro": "red"
  //         },
  //         useVirtualDom: true,
  //         skipInactive: true,

  //       }
  //     })
  //     replayer.current.getReplayer().enableInteract()
  //     replayer.current.pause()
      
  //     replayer.current.addEventListener('ui-update-player-state',(e) => {
  //       console.log(e)
  //     })
      

  //   return () => {
  //     replayer.current?.pause()
  //   }

  // }, [])

  return (
    <>
    <div id="video-wrapper" style={{width: "800px", height: "500px"}}>
    <Player width={800} height={500}/>
    </div>
    </>
  )
}

export default App

import { event } from '@/event'
import React from 'react'
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css';
import { Scrubber } from 'react-scrubber';
import 'react-scrubber/lib/scrubber.css'

import { Button } from "@/components/ui/button"
import { EnterFullScreenIcon, ExitFullScreenIcon, PauseIcon, PlayIcon } from '@radix-ui/react-icons';

type Props = {
    padding?: number
}

const Player = ({ padding = 40 }: Props) => {
    const replayer = React.useRef<rrwebPlayer | null>(null)
    const [value, setValue] = React.useState(0)
    const [play, setPlay] = React.useState(false)
    const [width, setWidth] = React.useState(0)
    console.log(document.getElementById('video-wrapper'))
    const [height, _setHeight] = React.useState(0)
    const [fs, setFs] = React.useState(false)
    function toggleFullscreen() {
        const elem = document.getElementById('video-controller');
        if(!elem) return;
        // @ts-ignore
        if (!elem.fullscreenElement && !fs) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
            // @ts-ignore
          } else if (elem?.webkitRequestFullscreen) { /* Safari */
            // @ts-ignore
            elem?.webkitRequestFullscreen();
            // @ts-ignore
          } else if (elem?.msRequestFullscreen) { /* IE/Edge */
            // @ts-ignore
            elem?.msRequestFullscreen();
          }
          setFs(() => true)
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            // @ts-ignore
          } else if (document.webkitExitFullscreen) { /* Safari */
            // @ts-ignore
            document.webkitExitFullscreen();
            // @ts-ignore
          } else if (document.msExitFullscreen) { /* IE/Edge */
            // @ts-ignore
            document.msExitFullscreen();
          }
          setFs(() => false)
        }
      }


    const handlePlayPause = () => {
        if(!replayer.current) return
        if(play){
            setPlay(() => false)
            replayer.current.pause()
            return;
        }
        setPlay(() => true)
        replayer.current.play()
    }

    const handleScrubChange = (d: number) => {
        // console.log(d)
        setValue(() => d)
        
    }

    React.useEffect(() => {
        if(!replayer.current) return
        console.log(value)
        const goToTime = (value/100) * replayer.current.getMetaData().totalTime
        replayer.current?.goto(goToTime)
    }, [value])
    

    React.useEffect(() => {
        const element = document.getElementById('video-controller');
        const wrapperEl = document.getElementById("wrapper")
        if(!element) return
        document.addEventListener('fullscreenchange', (e) => {
            e.preventDefault()
            setPlay(() => false)
            setValue(0)
            if(e.target === element){
                setWidth(wrapperEl?.clientWidth || 0)
            }
        })
    }, [])

    React.useEffect(() => {
        const elWidth = document.getElementById('wrapper')?.clientWidth ?? 0
        const elHeight = document.getElementById('wrapper')?.clientHeight ?? 0
        const element = document.createElement('div')
        document.getElementById('video-player')?.appendChild(element)
        replayer.current = new rrwebPlayer({
            target: element,
            props: {
                events: event,
                showController: false,
                autoPlay: false,
                insertStyleRules: [],
                width: width || elWidth,
                height: height ? height :  elHeight - padding,
            }
        })

        
        replayer.current.addEventListener('ui-update-current-time', (event) => {
            // console.log(event.payload);
            const perentage = (event.payload) / replayer.current?.getMetaData().totalTime
            setValue(() => perentage * 100)
        });

        return () => {
            if(document.getElementById('video-player')){
                document.getElementById('video-player')?.removeChild(element)
            }
            replayer.current?.getReplayer().destroy()
        }
    }, [width, height])

    return (
        <>
        <div
        className='flex flex-col w-full h-full gap-2 border-2 p-2 bg-white'   
        id='video-controller'
        >
            <div id='wrapper' className='shrink-0' style={{width: "100%",flex: 1, display: "flex", justifyContent: "center", alignItems: "center", background: "white"}}>
                <div id='video-player'></div>
            </div>
            <div  className="scrubber-container flex flex-col gap-2 grow-0" id='video-controls'>
                    <Scrubber
                        min={0}
                        max={100}
                        value={value}
                        onScrubStart={d => setValue(() => d)}
                        onScrubEnd={d => setValue(() => d)}
                        onScrubChange={handleScrubChange}
                        tooltip={{
                            enabledOnHover: true,
                            formatString: (value) => {
                                if(!replayer.current) return ''
                                // console.log(value)
                                return `${Math.round((value/100) * replayer.current.getMetaData().totalTime/1000)}`
                            },
                            enabledOnScrub: true,
                            className: "bar-tooltip"
                        }}
                    />
                    <div className='flex gap-2'>
                        <Button className='h-8 w-8' onClick={handlePlayPause} variant="outline" size="icon">
                            {!play ? <PlayIcon className='h-4 w-4' /> : <PauseIcon className='h-4 w-4' />}
                        </Button>
                        <Button className='h-8 w-8' onClick={toggleFullscreen} variant="outline" size="icon">
                            {!fs ? <ExitFullScreenIcon className='h-4 w-4' /> : <EnterFullScreenIcon className='h-4 w-4' />}
                        </Button>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Player
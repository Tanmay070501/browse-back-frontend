import React from 'react'
// import rrwebPlayer from 'rrweb-player'
// import 'rrweb-player/dist/style.css';
import rrwebPlayer from "@tannu-dev/rrweb-player"
import "@tannu-dev/rrweb-player/dist/style.css"
import { Scrubber } from 'react-scrubber';
import 'react-scrubber/lib/scrubber.css';
import moment from "moment"


import { Button } from "@/components/ui/button"
import { EnterFullScreenIcon, ExitFullScreenIcon, PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { errorToast } from '@/toast/toast';

type Props = {
    padding?: number,
    events?: Array<any>
}

const Player = ({ padding = 40, events = [] }: Props) => {
    const [duration, setDuration] = React.useState(0)
    const [timer, setTimer] = React.useState(0)
    const replayer = React.useRef<rrwebPlayer | null>(null)
    const [value, setValue] = React.useState(0)
    const [play, setPlay] = React.useState(false)
    const [width, setWidth] = React.useState(0)
    // console.log(document.getElementById('video-wrapper'))
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

    const handleScrubChange = (value: number) => {
        console.log("scrub change", value)
        if(!replayer.current) return
        const goToTime = (value/100) * replayer.current.getMetaData().totalTime
        replayer.current?.goto(goToTime, play)
        setValue(() => value)
    }

    

    React.useEffect(() => {
        if(value === 100) setPlay(false)
    }, [value])
    

    React.useEffect(() => {
        const element = document.getElementById('video-controller');
        const wrapperEl = document.getElementById("wrapper")
        if(!element) return
        document.addEventListener('fullscreenchange', (e) => {
            e.preventDefault()
            if(e.target === element){
                // setWidth(wrapperEl?.clientWidth || 0)
                // hack for resizing timely    
                setTimeout(() => {
                    if(!replayer.current) return
                    replayer.current.$set({
                        width: wrapperEl?.clientWidth || 0,
                    })
                    replayer.current.triggerResize()
                }, 1000)
            }
        })
    }, [])

    React.useEffect(() => {
        if(replayer.current) return
        if(events.length < 2){
            errorToast("Player needs atleast two events")
            return;
        } 
        const elWidth = document.getElementById('wrapper')?.clientWidth ?? 0
        const elHeight = document.getElementById('wrapper')?.clientHeight ?? 0
        const element = document.createElement('div')
        document.getElementById('video-player')?.appendChild(element)
        replayer.current = new rrwebPlayer({
            target: element,
            props: {
                events: events,
                showController: false,
                autoPlay: false,
                insertStyleRules: [],
                width: width || elWidth,
                height: height ? height :  elHeight - padding,
                skipInactive: true,
            }
        })

        setDuration(() => replayer.current?.getReplayer()?.getMetaData().totalTime ?? 0)

        
        replayer.current.addEventListener('ui-update-current-time', (event) => {
            if(!replayer.current) return
            setTimer(() => event.payload)
            // console.log(event.payload);
            const percentage = (event.payload) / replayer.current.getMetaData().totalTime
            setValue(() => percentage * 100)
        });

        replayer.current.addEventListener('ui-update-player-state', (event) => {
            console.log("player state", event.payload)
            switch(event.payload){
                case 'paused': 
                    setPlay(() => false)
                    break;
                case 'playing': 
                    setPlay(() => true)
                    break;
                default:
                    break;
            }
        });

    }, [])

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
                        onScrubChange={handleScrubChange}
                        tooltip={{
                            enabledOnHover: true,
                            formatString: (value) => {
                                if(!replayer.current) return ''
                                // console.log(value)
                                const x = Math.round((value/100) * replayer.current.getMetaData().totalTime)
                                const duration = moment.utc(x).format('HH:mm:ss');
                                // const hours = Math.floor(duration.asHours());
                                // const minutes = duration.minutes();
                                console.log(x, duration)
                                return `${duration}`
                                // return `${hours}:${minutes.toString().padStart(2, '0')}`;
                                // return `${Math.round((value/100) * replayer.current.getMetaData().totalTime/1000)}`
                            },
                            enabledOnScrub: true,
                            className: "bar-tooltip"
                        }}
                    />
                    <div className='flex gap-2 items-center'>
                        <Button className='h-8 w-8' onClick={handlePlayPause} variant="outline" size="icon">
                            {!play ? <PlayIcon className='h-4 w-4' /> : <PauseIcon className='h-4 w-4' />}
                        </Button>
                        {  
                            <p>{moment.utc(timer).format('HH:mm:ss')}/{moment.utc(duration).format('HH:mm:ss')}</p>
                        }
                        <Button className='h-8 w-8 ml-auto' onClick={toggleFullscreen} variant="outline" size="icon">
                            {!fs ? <ExitFullScreenIcon className='h-4 w-4' /> : <EnterFullScreenIcon className='h-4 w-4' />}
                        </Button>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Player
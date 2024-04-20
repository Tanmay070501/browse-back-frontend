import { getSingleSession } from '@/actions/session'
import EventActionViewer from '@/components/EventActionViewer/EventActionViewer'
import Player from '@/components/Player/Player'
import { useSessionStore } from '@/store/useSesstionStore'
import React from 'react'
import { useParams } from 'react-router'

type Props = {}

const SingleSessionReplay = (props: Props) => {
    const {sessionId} = useParams()
    const [loading, setLoading] = React.useState(false)
    const currentSessionReplay = useSessionStore(state => state.currentSessionReplay)
    console.log(loading, currentSessionReplay?.events)
    React.useEffect(() => {
        const init = async () => {
            setLoading(() => true)
            await getSingleSession(sessionId ?? "")
            setLoading(() => false)
        }

        init()
    }, [])
    // console.log(currentSessionReplay)
    if(loading) return <p>Loading</p>
    if(!Object.keys(currentSessionReplay ?? {}).length)
        return <p>nothing to show</p>
  return (
    <div className='w-full h-full flex'>
        <div style={{width: 800, height:"100%"}}>
            <Player events={currentSessionReplay?.events}/>
        </div>
        <EventActionViewer events={currentSessionReplay?.events ?? []}/>
    </div>
  )
}

export default SingleSessionReplay
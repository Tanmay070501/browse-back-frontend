// import Player from '@/components/Player/Player'
import { getSessionReplays } from '@/actions/session'
import { useProjectStore } from '@/store/useProjectStore'
import React from 'react'

type Props = {}

const SessionReplays = (props: Props) => {
  const currentProject = useProjectStore(state => state.currentProject)

  React.useEffect(() => {
    getSessionReplays(currentProject?.id ?? 0)
  }, [currentProject])
  return (
    <div>
      {/* <div id="video-wrapper" style={{width: "800px", height: "500px"}}>
      <Player/>
      </div> */}
    </div>
  )
}

export default SessionReplays
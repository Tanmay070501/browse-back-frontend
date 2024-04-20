import { event } from '@/@types/events'
import { Console, } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Component'
import moment from 'moment'
import React from 'react'

type Props = {
  events: Array<event>
}

const ConsolePane = (props: Props) => {
  const [logs, setLogs] = React.useState<Array<{method: string, data: Array<any>, timestamp: string}>>([])

  React.useEffect(() => {
    const consoleLogs = props.events.filter(e => {
      return  (e.type === 6 && e?.data?.plugin === "rrweb/console@1")
    })
    
    const finalLogs = consoleLogs.map((ev, _idx) => {
      let data: any = []
      ev?.data?.payload?.payload?.forEach((el: any) => {
          try{
            data.push(JSON.parse(el))
          }catch(err){
            data.push(el)
          }
      })
      return {
        method: ev.data.payload.level,
        data: [...data,  (ev?.data?.payload?.trace ?? []).join('\n')],
        timestamp: moment(ev?.timestamp)?.format("LT")
      }
    })

    setLogs(() => finalLogs)
  }, [])


  return (
    <div className='bg-white relative'>
      <Console logs={logs as Message[]} variant="light" logGrouping={true} />
    </div>
  )
}

export default ConsolePane
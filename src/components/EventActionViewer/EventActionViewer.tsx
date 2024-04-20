import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ConsolePane from './Console'
import { ScrollArea } from '../ui/scroll-area'
import { event } from '@/@types/events'
import { NetworkTab } from './NetworkTab'
import { NETWORK_PLUGIN_NAME } from '@/constants/event'


type Props = {
  events: Array<event>
}

function EventActionViewer({events}: Props) {
  return (
    <div className='flex-1 h-full overflow-hidden border'>
        <Tabs defaultValue="console" className="w-full h-full flex flex-col">
        <TabsList className='w-full flex justify-start items-start rounded-none'>
            <TabsTrigger value="console">Console</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>
          <TabsContent className='mt-0 overflow-hidden flex-1' value="console">
          <ScrollArea className='h-full'>
              <ConsolePane events={events}/>
          </ScrollArea>
          </TabsContent>
          <TabsContent className='overflow-auto flex-1 relative' value="network">
          <ScrollArea className='h-full'>
              <NetworkTab events={events.filter(ev => ev.type === 6 && ev.data.plugin === NETWORK_PLUGIN_NAME)}/>
          </ScrollArea>
          </TabsContent>
        </Tabs>
    </div>
  )
}

export default EventActionViewer
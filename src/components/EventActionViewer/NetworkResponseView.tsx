import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '../ui/button'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { event } from '@/@types/events'
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'

type Props = {
    triggerClose: () => void;
    event: event
}

enum NetworkResponseTab {
    headers = "headers",
    payload = "payload",
    response = "response"
}

const CommonDataPane  = ({data, dontShow}: {data:any, dontShow: boolean}) => {
    if(dontShow) return (
        <div className='flex w-full h-full items-center justify-center'>
            <p className='text-blue-400'>Only Support fetch / xmlhttprequest</p> 
        </div>
    )
    return <div className='w-full'>
        <JsonView data={data} shouldExpandNode={allExpanded} style={{
            ...defaultStyles,
            container: cn(defaultStyles.container, "bg-white")
        }} />
    </div>
}

export const NetworkResponseView = (props: Props) => {
    const dontShow = !['fetch', 'xmlhttprequest'].includes(props.event.data.request?.initiatorType ?? "")
    const headers = {
        General:{
            'Request URL': props.event.data.request?.url,
            'Request Method': props.event.data?.request?.method
        },
        'Request Headers': props.event.data.request?.requestHeaders ?? null,
        'Response Headers': props.event.data.request?.responseHeaders ?? null
    }

    const payload = {
        'Request Payload': props.event.data?.request?.requestBody ?? null
    }

    let isJson = (headers['Response Headers']?.["content-type"] ?? "").includes("application/json");
    let response = props.event.data.request?.responseBody ?? ""
    if(isJson){
        try{
            response = JSON.parse(props.event.data.request?.responseBody)
        }catch(err){
            isJson = false;
            response = props.event.data.request?.responseBody
        }
    }

  return (
    <Tabs defaultValue={NetworkResponseTab.headers} className="w-full h-full flex flex-col">
    <TabsList className='w-full flex justify-start items-start rounded-none'>
        <TabsTrigger value={NetworkResponseTab.headers}>Headers</TabsTrigger>
        <TabsTrigger value={NetworkResponseTab.payload}>Payload</TabsTrigger>
        <TabsTrigger value={NetworkResponseTab.response}>Response</TabsTrigger>
        <Button variant={'ghost'} onClick={props.triggerClose} className='h-full ml-auto'>
            <CrossCircledIcon/>
        </Button>
    </TabsList>
        <TabsContent className='mt-0 p-4 flex-1 overflow-auto' value={NetworkResponseTab.headers}>
            <CommonDataPane dontShow={dontShow} data={headers}/>
        </TabsContent>  
        <TabsContent className='mt-0 p-4 flex-1 overflow-auto' value={NetworkResponseTab.payload}>
            <CommonDataPane dontShow={dontShow} data={payload}/>
        </TabsContent>  
        <TabsContent className='mt-0 p-4 flex-1 overflow-auto' value={NetworkResponseTab.response}>
            {
                dontShow ? 
                    <CommonDataPane dontShow={dontShow} data={response}/>
                : 
                isJson ?
                    <CommonDataPane dontShow={dontShow} data={response}/>
                :
                <p>{response}</p>

            }
        </TabsContent>
    </Tabs>
  )
}
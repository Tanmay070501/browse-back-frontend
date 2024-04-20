import { event } from '@/@types/events'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
  } from "@/components/ui/tooltip"

import { TooltipArrow } from '@radix-ui/react-tooltip'

import { NetworkResponseView } from './NetworkResponseView'
import React from 'react'
   

type Props = {
    events: Array<event>
}

type customTableHelperType = event & {
    duration: number
}
const columnHelper = createColumnHelper<customTableHelperType>()


const columns = [
    columnHelper.accessor('data.request.url', {
        cell: info => info.getValue(),
        header: 'Name',
        maxSize: 30
    }),
    columnHelper.accessor('data.request.status', {
        cell: info => info.getValue(),
        header: 'Status'
    }),
    columnHelper.accessor('data.request.initiatorType', {
        cell: info => info.getValue(),
        header: 'Type'
    }),
    columnHelper.accessor('duration', {
        cell: info => ((info.row.original.data.request?.endTime ?? 0) - (info.row.original.data.request?.startTime ?? 0)) + " ms",
        header: 'Duration'
    })
    
]

export const NetworkTab = (props: Props) => {
    const table = useReactTable({
        data: (props.events as customTableHelperType[]) ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        
      },)

    const [open, setOpen] = React.useState(false)
    const [event, setEvent] = React.useState<event | null>(null)
  return (
    <div className='w-full h-full'>
      <Table className='table-fixed'>
        <TableHeader className=''>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className='bg-black hover:opacity-100 hover:bg-black' key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className='text-white text-center' key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='w-full h-full'>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className='cursor-pointer'
                onClick={() => {setOpen(true); setEvent(row.original)}}
              >
                {row.getVisibleCells().map((cell) => {
                    return (
                  <TableCell  className='overflow-hidden' key={cell.id}>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TooltipTrigger>
                            <TooltipContent side='right'>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                <TooltipArrow/>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                )
            })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {
        open && event &&
        <div className='w-full absolute bottom-0 h-1/2 left-0 bg-white'>
          <NetworkResponseView event={event} triggerClose={() => setOpen(false)}/>
        </div>
      }
      
    </div>
  )
}
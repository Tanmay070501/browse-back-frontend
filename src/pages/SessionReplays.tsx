import { SessionReplay } from '@/@types/session'
import { getSessionReplays } from '@/actions/session'
import { useProjectStore } from '@/store/useProjectStore'
import { useSessionStore } from '@/store/useSesstionStore'
import moment from "moment"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import ReactPaginate from 'react-paginate';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Loader } from '@/components/Loader/Loader'

type customTableHelperType = SessionReplay & {
  // calculated field
  duration: string,
  index: number
}

const columnHelper = createColumnHelper<customTableHelperType>()

const columns = [
  columnHelper.accessor('index', {
    cell: info => info.row.index + 1,
    header: 'index',
  }),
  columnHelper.accessor('metadata.username', {
    cell: info => info?.getValue() ?? 'N/A',
    header: 'Username',
  }),
  columnHelper.accessor('metadata.user_identifier', {
    cell: info => info?.getValue() ?? 'N/A',
    header: 'User Identifier',
  }),
  columnHelper.accessor('metadata.error', {
    cell: info => info.getValue() ?? 'N/A',
    header: 'Recent Error',
  }),
  columnHelper.accessor('started_at', {
    cell: info => moment(info.getValue()).format('lll'),
    header: 'started at',
  }),
  columnHelper.accessor('ended_at', {
    cell: info => moment(info.getValue()).format('lll'),
    header: 'ended at',
  }),
  columnHelper.accessor('type', {
    cell: info => info.getValue(),
    header: 'Recording Type',
  }),
  columnHelper.accessor('duration', {
      header: 'Duration',
      cell: info => {
        const start = moment(info.row.original.started_at)
        const end = moment(info.row.original.ended_at)
        const diffMilliseconds = end.diff(start);
        return  moment.duration(diffMilliseconds).humanize()
      },
  }),
  columnHelper.accessor('sessionId', {
    cell: info => info.getValue(),
    header: 'Session Id',
  }),
]

type Props = {}

const SessionReplays = (_props: Props) => {
  const currentProject = useProjectStore(state => state.currentProject)
  const sessionReplays = useSessionStore(state => state.sessionReplays)
  const [loading, setLoading] = React.useState(false)

  const [page, setPage] = React.useState(0)
  const [pageCount, setPageCount] = React.useState(0);
  
  const table = useReactTable({
    data: (sessionReplays as customTableHelperType[]) ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  },)
  const navigate = useNavigate();

  const handlePageClick = (event: {selected: number}) => {
    setPage(event.selected)
    getSessionReplays(currentProject?.id ?? 0,
      (data) => {
        if(!data){
          return;
        }
        setPageCount(() => data?.totalPage)
      },
       setLoading,
       event.selected
    )
  };


  React.useEffect(() => {
    getSessionReplays(currentProject?.id ?? 0,
      (data) => {
        if(!data){
          return;
        }
        setPageCount(() => data?.totalPage)
      },
       setLoading
    )
  }, [currentProject, ])

  if(loading) return <Loader backdrop={true}/>

  return (
    <div className='h-full flex flex-col gap-4'>
    <ScrollArea className='flex-1'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className='bg-black hover:opacity-100 hover:bg-black' key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className='text-white' key={header.id}>
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className='cursor-pointer'
                onClick={() => {navigate(`/session_replays/${row.original.sessionId}`)}}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell  className='py-6' key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
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
    </ScrollArea>

    <div>
      <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          forcePage={page}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          className='flex gap-2 justify-center'
          pageLinkClassName={cn(
            buttonVariants({
              variant: "ghost",
            })
          )}
          nextLinkClassName = {cn(
            buttonVariants({
              variant: "ghost" 
            }),
            "gap-1"
            )
          }
          previousLinkClassName={cn(
            buttonVariants({
              variant: "ghost" 
            }),
            "gap-1"
            )
          }
          activeLinkClassName={
            cn(
              buttonVariants({
                variant: "outline" 
              }),
              "gap-1"
              )
          }
          disabledClassName={"pointer-events-none cursor-not-allowed"}
        />
      </div>
  </div>
  )
}

export default SessionReplays
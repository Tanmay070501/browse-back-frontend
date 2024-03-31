// import Player from '@/components/Player/Player'
import { SessionReplay } from '@/@types/session'
import { getSessionReplays } from '@/actions/session'
import { useProjectStore } from '@/store/useProjectStore'
import { useSessionStore } from '@/store/useSesstionStore'
import moment from "moment"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

type customTableHelperType = SessionReplay & {
  // calculated field
  duration: string
}

const columnHelper = createColumnHelper<customTableHelperType>()

const columns = [
  columnHelper.accessor('sessionId', {
    cell: info => info.getValue(),
    header: 'Session Id',
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
  })
]

type Props = {}

const SessionReplays = (props: Props) => {
  const currentProject = useProjectStore(state => state.currentProject)
  const sessionReplays = useSessionStore(state => state.sessionReplays)
  const table = useReactTable({
    data: (sessionReplays as customTableHelperType[]) ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    // defaultColumn: () => ({})
  },)
  const navigate = useNavigate();
  // console.log("table", table.getCoreRowModel())

  React.useEffect(() => {
    getSessionReplays(currentProject?.id ?? 0)
  }, [currentProject])
  // console.log(sessionReplays)
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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

      {/* <table className='w-full text-center'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr className='py-5' key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th className='py-4' key={header.id} colSpan={header.colSpan} style={{width: header.getSize()}}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr className='border-y-2' key={row.id}>
                  <div>
                <Link className='block w-full' to={"/"}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td style={{width: cell.column.getSize()}} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                  </Link>
                  </div>
                </tr>
              )
            })}
          </tbody>
        </table> */}

      {/* <div id="video-wrapper" style={{width: "800px", height: "500px"}}>
      <Player/>
      </div> */}
    </div>
  )
}

export default SessionReplays
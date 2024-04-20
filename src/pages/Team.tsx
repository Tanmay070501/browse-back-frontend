import { SingleUser } from '@/@types/user'
import { removeUser } from '@/actions/user'
import { ConfirmationPopup } from '@/components/ConfirmationPopup/ConfirmationPopup.'
import { Button, buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/useUserStore'
import { TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef, PaginationState, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'
import ReactPaginate from 'react-paginate'

type customTableHelperType = SingleUser & {
    index: number,
    action: string,
    role: string,
}

const columnHelper = createColumnHelper<customTableHelperType>()



type Props = {}

const Team = (_props: Props) => {

    const user = useUserStore(state => state.user)
    
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 7,
    })

    const [open, setOpen] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState<number | null>(null);

    const handleUserDelete = (id:number) => {
        setDeleteId(() => id)
        setOpen(true)
    }

    const deleteAction = () => {
        if(!deleteId) return;
        console.log(deleteId)
        removeUser(deleteId)
    }

    const columns = React.useMemo(() => {
        const col: ColumnDef<customTableHelperType, any>[] = [
            columnHelper.accessor('index', {
                cell: info => info.row.index + 1,
                header: 'Row no.',
            }),
            columnHelper.accessor("name", {
                cell: info => info.getValue(),
                header: "Name"
            }),
            columnHelper.accessor("email", {
                cell: info => info.getValue(),
                header: "Email"
            }),
            columnHelper.accessor('role', {
                header: "Role",
                cell: ({row}) => row.original.isAdmin ? 'Admin' : 'Team Member',
            }),
        ]
        if(user?.isAdmin){
            col.push(
                columnHelper.accessor("action", {
                    header: "Action",
                    cell: ({row}) => {
                        if(row.original.user_id == user.user_id) return <></>
                        return <Button onClick={() => handleUserDelete(row.original.user_id)} size={'icon'} variant={'outline'}>
                            <TrashIcon className='text-red-500'/>
                        </Button>
                    },
                })
            )
        }  
        return col;
    }, [user])

    const table = useReactTable({
        data: (user?.org.users as customTableHelperType[]) ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination
        },
        onPaginationChange: setPagination,
        rowCount: ((user?.org.users as customTableHelperType[]) ?? []).length
    },)

    const handlePageClick = (event: {selected: number}) => {
        table.setPageIndex(event.selected)
    };


    
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
                    // className='cursor-pointer'
                    // onClick={() => {navigate(`/session_replays/${row.original.sessionId}`)}}
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

        <ConfirmationPopup show={open} close={() => setOpen(false)} action={deleteAction} text='Are you sure you want to remove user from team?'/>
    
        <div>
          <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={table.getPageCount()}
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

export default Team;
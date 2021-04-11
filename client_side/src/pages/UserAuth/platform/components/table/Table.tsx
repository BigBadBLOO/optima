//core
import React, {useMemo} from "react";
import {
    useTable,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    usePagination,
    useExpanded, useRowSelect,
} from "react-table";

//components
import Pagination from "@pages/UserAuth/platform/components/table/components/Pagination";
import HeaderTable from "@pages/UserAuth/platform/components/table/components/Header";
import BodyTable from "@pages/UserAuth/platform/components/table/components/Body";
import ControlTablePanel from "@pages/UserAuth/platform/components/table/components/ControlPanel";
import CheckBox from "@components/Base/CheckBox";


interface TableType {
    columns: {
        Header: string | ((row: { value: string }) => any),
        accessor?: string,
        Cell?: (row: { value: string }) => any,
        id?: string
    }[],
    data: object[],
    options: {
        width?: number
        delete?: {
            href: string
        }
        selected?: boolean
    }
}

const Table: React.FC<TableType> = ({columns, data, options}) => {

    const defaultColumn = useMemo(() => {
        const width = options.width ? (options.width - 8 - (options.selected ? 35 : 0)) / columns.length : 150
        return {
            minWidth: 100,
            width: width,
            maxWidth: 500,
        }
    }, [])

    const initialState = {}

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        prepareRow,// Prepare the row (this function needs to be called for each row before getting the row props)
        page, //Instead of using 'rows', we'll use page, which has only the rows for the active page

        canPreviousPage, // The rest of these things are super handy, too ;)
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize, selectedRowIds},

    } = useTable({
            columns,
            data,
            defaultColumn,
            initialState
        }, useBlockLayout, useResizeColumns, useSortBy, useExpanded, usePagination, useRowSelect,
        hooks => {
            options.selected && hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    width: 35,
                    minWidth: 35,
                    maxWidth: 35,
                    Header: ({getToggleAllRowsSelectedProps}: any) => <CheckBox
                        type="indeterminate" {...getToggleAllRowsSelectedProps()}/>,
                    Cell: ({row}: any) => <CheckBox type="indeterminate" {...row.getToggleRowSelectedProps()}/>
                },
                ...columns,
            ])
        }
    );
    console.log(selectedRowIds)
    return (
        <>
            <ControlTablePanel pageSize={pageSize} setPageSize={setPageSize}/>
            <div className="bg-white shadow rounded-md p-2">
                <div className="overflow-x-auto" {...getTableProps()}>
                    <HeaderTable headerGroups={headerGroups}/>
                    <BodyTable getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow}/>
                </div>

                <Pagination
                    gotoPage={gotoPage}
                    canPreviousPage={canPreviousPage}
                    previousPage={previousPage}
                    canNextPage={canNextPage}
                    nextPage={nextPage}
                    pageIndex={pageIndex}
                    pageCount={pageCount}
                />
            </div>
        </>
    )
}

export default Table
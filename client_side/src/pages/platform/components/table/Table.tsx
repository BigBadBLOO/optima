//core
import React, {useEffect, useMemo} from "react";
import clsx from "clsx";
import {
    useTable,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    usePagination,
    useExpanded, useRowSelect,
} from "react-table";

//components
import Pagination from "@pages/platform/components/table/components/Pagination";
import HeaderTable from "@pages/platform/components/table/components/Header";
import BodyTable from "@pages/platform/components/table/components/Body";
import ControlTablePanel, {IDateRange} from "@pages/platform/components/table/components/ControlPanel";
import CheckBox from "@components/Base/CheckBox";

export type TableOptions = {
    width?: number
    selected?: boolean
    loading?: boolean
    pageCount: number
    pageIndex: number
    rowCount: number
    sortBy: {id: string, desc: boolean}[]
    getSubRows?: (row: object) => []
    getPaginationParams: (arg: [number, number, { id: string, desc: boolean }[]]) => void
    add?: () => void
    delete?: {
        onClick: () => void
        setData: ([]) => void
    }
    dateRange?: IDateRange
    template?: string
}

interface TableType {
    columns: {
        id?: string
        width?: number
        Header: string | ((row: { value: string }) => any),
        accessor?: string,
        Cell?: (row: { value: string }) => any,
    }[],
    data: any[],
    options: TableOptions
}

const Table: React.FC<TableType> = ({columns, data, options}) => {
    const defaultColumn = useMemo(() => {
        const columns_with_width = columns.filter(el => el.width)
        const count_columns_with_width = columns_with_width.length
        const total_width = columns_with_width.reduce((acc, value) => acc += value.width, 0)
        const width = options.width ? (options.width - 8 - (options.selected ? 35 : 0) - total_width) / (columns.length - count_columns_with_width) : 150
        return {
            minWidth: 100,
            width: width,
            maxWidth: 500,
        }
    }, [])

    const initialState = {
        pageIndex: options.pageIndex,
        pageCount: options.pageCount,
        sortBy: options.sortBy
    }

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        prepareRow,// Prepare the row (this function needs to be called for each row before getting the row props)
        page, //Instead of using 'rows', we'll use page, which has only the rows for the active page

        selectedFlatRows,
        canPreviousPage, // The rest of these things are super handy, too ;)
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize, sortBy, selectedRowIds},

    } = useTable({
            columns,
            data,
            defaultColumn,
            initialState,
            getSubRows: options.getSubRows,
            manualPagination: true,
            pageCount: options.pageCount,
            manualSortBy: true,
        }, useBlockLayout, useResizeColumns, useSortBy, useExpanded, usePagination, useRowSelect,
        hooks => {
            options.selected && hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    width: 40,
                    minWidth: 40,
                    maxWidth: 40,
                    Header: ({getToggleAllRowsSelectedProps}: any) => <CheckBox className="m-1"
                        type="indeterminate" {...getToggleAllRowsSelectedProps()}/>,
                    Cell: ({row}: any) => <CheckBox className="m-1" type="indeterminate" {...row.getToggleRowSelectedProps()}/>
                },
                ...columns,
            ])
        }
    );

    useEffect(() => {
        if (options.getPaginationParams) options.getPaginationParams([pageIndex, pageSize, sortBy])
    }, [pageIndex, pageSize, sortBy])

    useEffect(() => {
        if (options.delete) options.delete.setData(selectedFlatRows)
    }, [Object.keys(selectedRowIds).length])

    return (
        <>
            <ControlTablePanel pageSize={pageSize} setPageSize={setPageSize} options={options} selectedRows={selectedFlatRows}/>
            <div className="bg-white shadow rounded-md p-2">
                <div className="overflow-x-auto" {...getTableProps()}>
                    <HeaderTable headerGroups={headerGroups}/>
                    {
                        options.loading
                            ? Array(pageSize)
                                .fill(0)
                                .map((_,index) => <div key={index} className={clsx("p-2 break-words text-white animate-pulse",
                                        {"bg-gray-200 text-gray-200 bg-opacity-50": index % 2 !== 0})}>.</div>)
                            : <BodyTable getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow}/>
                    }

                </div>

                <Pagination
                    gotoPage={gotoPage}
                    canPreviousPage={canPreviousPage}
                    previousPage={previousPage}
                    canNextPage={canNextPage}
                    nextPage={nextPage}
                    pageIndex={pageIndex}
                    pageCount={pageCount}
                    rowCount={options.rowCount}
                />
            </div>
        </>
    )
}

export default Table
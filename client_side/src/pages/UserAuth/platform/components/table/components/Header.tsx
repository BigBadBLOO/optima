//core
import React from "react";

interface IHeaderTable {
    headerGroups: object[]
}

const HeaderTable: React.FC<IHeaderTable> = ({headerGroups}) => {
    return (
        <>
            {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; headers: any[]; }) => (
                <div {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map(column => (
                            <div className="p-2 py-4 bg-gray-200 bg-opacity-50 transition-opacity hover:bg-opacity-25"
                                 {...column.getHeaderProps()}
                            >
                                <div className="flex flex-row pr-6 truncate" {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                    {
                                        column.isSorted && (column.isSortedDesc
                                                ? <p className="material-icons text-xs ml-1 my-auto">south</p>
                                                : <p className="material-icons text-xs ml-1 my-auto">north</p>
                                        )
                                    }
                                </div>
                                {/*<span className="material-icons absolute transition-opacity opacity-0 hover:opacity-100 top-0 right-0 z-0 p-2 py-4 cursor-pointer">*/}
                                {/*  menu*/}
                                {/*</span>*/}
                                <div className="absolute top-0 right-0 h-full w-1 z-10" {...column.getResizerProps()}/>
                            </div>
                        ))}
                </div>
            ))}
        </>
    )
}

export default HeaderTable
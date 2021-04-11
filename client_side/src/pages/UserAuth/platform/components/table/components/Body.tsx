import React from "react";
import clsx from "clsx";

type RowType = {
    getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>
    cells: {
        getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>
        render: (arg0: string) => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
    }[]
}

interface IBodyTable {
    getTableBodyProps: () => void,
    page: [],
    prepareRow: (arg: RowType) => void
}

const BodyTable: React.FC<IBodyTable> = ({getTableBodyProps, page, prepareRow}) => {
    return (
        <div {...getTableBodyProps()}>
            {page.map((row: RowType, i: number) => {
                prepareRow(row);
                return (
                    <div {...row.getRowProps()}>
                        {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; render: (arg0: string) => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) => {
                            return (
                                <div
                                    className={clsx("p-2 break-words", {"bg-gray-200 bg-opacity-50": i % 2 !== 0})}
                                    {...cell.getCellProps()}
                                >
                                    {cell.render("Cell")}
                                </div>
                            )
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default BodyTable
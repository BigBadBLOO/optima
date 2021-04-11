import React from "react";
import clsx from "clsx";

interface IPagination {
    gotoPage: (arg: number) => void,
    canPreviousPage: boolean,
    previousPage: () => void,
    canNextPage: boolean,
    nextPage: () => void,
    pageIndex: number,
    pageCount: number
}
const Pagination: React.FC<IPagination> = ({gotoPage, canPreviousPage, previousPage, canNextPage, nextPage, pageIndex, pageCount}) => {
    return <div className="flex justify-center mt-4">
    <span
        onClick={() => canPreviousPage && gotoPage(0)}
        className={
            clsx("material-icons text-gray-300 my-auto cursor-default",
                {"hover:text-gray-600 cursor-pointer": canPreviousPage})
        }
    >
      first_page
    </span>
        <span
            onClick={() => canPreviousPage && previousPage()}
            className={
                clsx("material-icons text-gray-300 my-auto cursor-default",
                    {"hover:text-gray-600 cursor-pointer": canPreviousPage})
            }
        >
      chevron_left
    </span>

        <span className="text-gray-300 my-auto cursor-default">
        {pageIndex + 1} из {pageCount}
    </span>

        <span
            onClick={() => canNextPage && nextPage()}
            className={
                clsx("material-icons text-gray-300 my-auto cursor-default",
                    {"hover:text-gray-600 cursor-pointer": canNextPage})
            }
        >
      chevron_right
    </span>

        <span
            onClick={() => canNextPage && gotoPage(pageCount - 1)}
            className={
                clsx("material-icons text-gray-300 my-auto cursor-default",
                    {"hover:text-gray-600 cursor-pointer": canNextPage})
            }
        >
      last_page
    </span>
    </div>
}

export default Pagination
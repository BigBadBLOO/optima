//core
import React from "react";
import clsx from "clsx";

//types
import {
    user_group,
    UserType
} from "@pages/platform/typePlatform/TrafficArbitrage/pages/controlPersonal/СontrolPersonal";

const header_table_personals = (updateUser: (user: UserType) => void) => [
    {
        Header: "ID",
        accessor: "id",
        Cell: ({row}: any) => {
            const expand = row.canExpand ? (
                <span
                    className={clsx("material-icons ml-2 transition duration-500 ease-in-out", {'transform rotate-180 ': row.isExpanded})}
                    {...row.getToggleRowExpandedProps()}
                >
                    expand_more
                </span>
            ) : null
            return <div className="flex place-items-center">
                <span className="">{row.values.id}</span>
                {expand}
            </div>
        }
    },
    {
        Header: "Имя пользователя",
        accessor: "username",
    },
    {
        Header: "Группа",
        accessor: "group",
        Cell: ({row}: any) => {
            return user_group[row.values.group]
        }
    },
    {
        Header: "Статус",
        accessor: "status",
        Cell: ({row}: any) => {
            return typeof row.values.status !== "undefined"
                ? (
                    <span
                        className="p-1 text-sm my-auto rounded"
                        style={{
                            background: row.values.status ? "#F7FAED" : '#FFF2F7',
                            color: row.values.status ? '#8BA63A' : '#CC5C81'
                        }}
                    >
                        {(row.values.status ? "Активный" : "Не активный")}
                    </span>
                )
                : null
        }
    },
    {
        Header: "Оффер",
        accessor: "offer",
    },
    {
        Header: "Редактировать",
        accessor: "edit",
        Cell: ({row}: any) => {
            const { __typename, ...data} = row.original
            if(row.values.id) return <div className="flex cursor-pointer" onClick={() => {updateUser(data)}}>
                <span className="material-icons mr-2 my-auto text-gray-500">edit</span>
                <span className="my-auto text-gray-500">Редактировать</span>
            </div>
            return null
        }
    },
]

export default header_table_personals
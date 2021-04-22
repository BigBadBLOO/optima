//core
import React, {useMemo, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import {useAlert} from "react-alert";

//components
import Table from "@pages/platform/components/table/Table";
import ModalAdmin from "@pages/platform/typePlatform/TrafficArbitrage/pages/controlPersonal/modals/Modal_admin"

//data
import header_table_personals
    from "@pages/platform/typePlatform/TrafficArbitrage/pages/controlPersonal/header.table.personals";
import GetListWorker from "@gql/ControlPerson/getListWorker.gql";
import DeleteWorker from "@gql/ControlPerson/deleteWorker.gql";

//types
import {URL_PARAMS} from "@pages/platform/Platform";

export type UserType = {
    id?: number
    platform: string,
    username: string,
    email: string,
    password?: string,
    password_control?: string,
    status: boolean,
    group: string,
    offers?: [],
    children?: UserType[]
    parent?: UserType
}

export const user_group = {
    CLIENT_ADMIN: 'Администратор',
    CLIENT_TEAM_LEAD: 'Тимлид',
    CLIENT_TRAFFIC_MANAGER: 'Траффик-менеджер',
}

const ControlPersonal: React.FC = () => {
    //initial
    let persons = []
    let pageCount = 1
    let rowCount = 0

    let params: URL_PARAMS = useParams();
    const alert = useAlert();

    const [[pageIndex, pageSize, sortBy], setPaginationParams] = useState([0, 100, []])

    const initUser = {
        platform: params.platformId,
        username: '',
        email: '',
        password: '',
        password_control: '',
        status: true,
        group: 'CLIENT_ADMIN',
        children: []
    }
    const [addUser, setAddUser] = useState(initUser)

    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('add')
    const [deleteMutation] = useMutation(DeleteWorker);
    const [deleteArray, setDeleteArray] = useState([])

    //get list Worker
    let {loading, error, data, refetch} = useQuery(GetListWorker, {
        variables: {
            platformName: params.platformId,
            pagination: {pageIndex, pageSize, sortBy}
        }
    });

    //update Worker
    const updateData = (data: any) => {
        setModalType("update")
        data.platform = params.platformId
        setAddUser(data)
        setShowModal(true)
    }

    //delete workers
    const deleteData = () => {
        const data = deleteArray.map(el => el.values.id)
        deleteMutation({
            variables: {
                deleteWorkerData: {
                    id: data
                }
            }
        }).then(r => {
            alert.success("Данные удалены");
            refetch()
        })
    }

    if (data) {
        persons = data.getListWorker.users
        pageCount = Math.ceil(data.getListWorker.count / pageSize)
        rowCount = data.getListWorker.count
    }

    const columns = useMemo(() => header_table_personals(updateData), [])

    const table_options = {
        width: window.innerWidth - 112,
        selected: true,
        loading,
        pageIndex,
        pageCount,
        rowCount,
        sortBy: [{id: "id", desc: true}],
        getSubRows: (row: any) => {
            return row.children || []
        },
        getPaginationParams: setPaginationParams,
        add: () => {
            setModalType("add")
            setAddUser(initUser)
            setShowModal(true)
        },
        delete: {
            onClick: deleteData,
            setData: setDeleteArray
        }
    }

    const modal_jsx = <ModalAdmin
        show={showModal}
        showModal={setShowModal}
        user={addUser}
        setUser={setAddUser}
        refetch={refetch}
        type={modalType}
    />

    return (
        <>
            <div>
                <span className="text-2xl font-bold">Управление сотрудниками</span>
            </div>
            <div>
                <Table
                    columns={columns}
                    data={persons}
                    options={table_options}
                />
            </div>
            {modal_jsx}
        </>
    )
}

export default ControlPersonal
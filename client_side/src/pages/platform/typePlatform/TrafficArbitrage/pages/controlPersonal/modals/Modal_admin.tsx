//core
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {useAlert} from "react-alert";

//components
import {Input} from "@components/Base/Input";
import {Selector} from "@components/Base/Selector";
import {Button} from "@components/Base/Button";

//interfaces
import MyModal, {IModalProps} from "@components/Modal/Modal";
import {URL_PARAMS} from "@pages/platform/Platform";

//request
import AddWorker from "@gql/ControlPerson/addWorker.gql";
import UpdateWorker from "@gql/ControlPerson/updateWorker.gql";
import {
    user_group,
    UserType
} from "@pages/platform/typePlatform/TrafficArbitrage/pages/controlPersonal/СontrolPersonal";
import GetListWorker from "@gql/ControlPerson/getListWorker.gql";
import {User} from "../../../../../../../../../server_side/src/user/user.entity";


interface IModalAdmin extends IModalProps {
    user: UserType
    setUser: (arg0: UserType) => void
    refetch: () => void
    type: string
}

const ModalAdmin: React.FC<IModalAdmin> = ({show, showModal, user, setUser, refetch, type}) => {
    const alert = useAlert();
    let params: URL_PARAMS = useParams();

    const [addWorkerMutation] = useMutation(AddWorker);
    const [updateWorkerMutation] = useMutation(UpdateWorker);

    let {loading, error, data} = useQuery(GetListWorker, {
        variables: {
            platformName: params.platformId,
            pagination: {pageIndex: 0, pageSize: 1000,  sortBy: {"id": "username", desc: true}}
        }
    });

    let userSelector: UserType[] = []

    if (data) {
        userSelector = data.getListWorker.users
    }

    const [modalUser, setModalUser] = useState(user)

    useEffect(() => {
        setModalUser(user)
    }, [user])



    const addUser = () => {
        let {password_control, __typename, ...data} = modalUser
        data.children = data.children.map((el: User) => ({"id": el.id}))
        data.parent = data.parent && {"id": data.parent.id}
        addWorkerMutation({
            variables: {
                addWorkerData: data
            }
        }).then(r => {
            refetch()
            showModal(false)
            alert.success("Данные успешно добавлены")
        })
    }

    const updateUser = () => {
        const {password_control, ...data} = modalUser
        data.children = data.children.map((el: User) => ({"id": el.id}))
        data.parent = data.parent && {"id": data.parent.id}
        updateWorkerMutation({
            variables: {
                updateWorkerData: data
            }
        }).then(r => {
            refetch()
            showModal(false)
            alert.success("Данные успешно изменены")
        })
    }

    return (
        <MyModal show={show} showModal={showModal}>
            <p className="flex border-b pb-2">
                <span className="font-semibold text-xl ">
                    {
                        type === 'add' ? "Добавление данных" : "Изменение данных"
                    }
                </span>
                <span className="material-icons ml-auto my-auto cursor-pointer text-gray-600"
                      onClick={() => showModal(false)}>close</span>
            </p>
            <div className="mt-4 border-b pb-4">
                <p className="text-left">Тип пользователя</p>
                <Selector
                    type="modal"
                    value={{value: modalUser.group, label: user_group[modalUser.group]}}
                    onChange={({value}) => setModalUser({...modalUser, group: value})}
                    options={Object.keys(user_group).map((key) => ({value: key, label: user_group[key]}))}
                />
                <p className="text-left mt-4">Имя пользователя</p>
                <Input
                    className="mx-0 my-2"
                    placeholder="Введите имя ..."
                    value={modalUser.username}
                    setValue={(data) => setModalUser({...modalUser, username: data})}
                />
                <p className="text-left mt-4">Email</p>
                <Input
                    className="mx-0 my-2"
                    placeholder="Введите email ..."
                    value={modalUser.email}
                    setValue={(data) => setModalUser({...modalUser, email: data})}
                />
                <p className="text-left mt-4">Пароль</p>
                <Input
                    className="mx-0 my-2"
                    placeholder="Введите пароль"
                    value={modalUser.password}
                    setValue={(data) => setModalUser({...modalUser, password: data})}
                />
                <Input
                    className="mx-0 my-2"
                    placeholder="Повторите пароль"
                    value={modalUser.password_control}
                    setValue={(data) => setModalUser({...modalUser, password_control: data})}
                />
                <p className="text-left mt-4">Статус</p>
                <Selector
                    type="modal"
                    value={{value: modalUser.status, label: (modalUser.status ? 'Активный' : 'Неактивный')}}
                    onChange={({value}) => setModalUser({...modalUser, status: Boolean(value)})}
                    options={[true, false].map(status => {
                        return {value: status, label: (status ? 'Активный' : 'Неактивный')}
                    })}
                />
                {
                    modalUser.group === 'CLIENT_TEAM_LEAD' && !loading && <>
                        <p className="text-left mt-4">Траффик-менеджеры</p>
                        <Selector
                            type="modal"
                            isMulti={true}
                            value={
                                modalUser.children.map((el: UserType) => ({value: el.id, label: el.username}))
                            }
                            onChange={(data) => {
                                const childrenUserArr = data.map(({value}: {value: number}) => {
                                    return  userSelector.find(el => el.id === value)
                                            || modalUser.children.find(el => el.id === value)
                                })
                                setModalUser({...modalUser, children: childrenUserArr})
                            }}
                            options={userSelector
                                .filter((el: UserType) => el.group === 'CLIENT_TRAFFIC_MANAGER')
                                .map((el: UserType) => ({value: el.id, label: el.username}))
                            }
                        />
                    </>
                }
                {
                    modalUser.group === 'CLIENT_TRAFFIC_MANAGER' && !loading && <>
                        <p className="text-left mt-4">Тимлид</p>
                        <Selector
                            type="modal"
                            value={modalUser.parent && ({value: modalUser.parent.id, label: modalUser.parent.username})}
                            onChange={({value}) => {
                                const parentUser = userSelector.find(el => el.id === value)
                                setModalUser({...modalUser, parent: parentUser})
                            }}
                            options={userSelector
                                .filter((el: UserType) => el.group === 'CLIENT_TEAM_LEAD')
                                .map((el: UserType) => ({value: el.id, label: el.username}))
                            }
                        />
                    </>
                }
            </div>
            <div className="flex mt-4 justify-center">
                <Button className="mr-2" type="secondary" text="Отмена" onClick={() => setModalUser(user)}/>
                <Button type="primary" text="Сохранить" onClick={() => type === 'add' ? addUser() : updateUser()}/>
            </div>

        </MyModal>
    )
}

export default ModalAdmin
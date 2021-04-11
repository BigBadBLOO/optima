//core
import React from "react";

//components
import {Button} from "@components/Base/Button";
import {Selector} from "@components/Base/Selector";

interface IControlTablePanel {
    pageSize: number,
    setPageSize: (arg0: number) => void
}

const ControlTablePanel: React.FC<IControlTablePanel> = ({pageSize, setPageSize}) => {
    return <div className="mt-6 mb-4 flex">
        <Button type="primary" text="Добавить" icon="add"/>
        <Button type="secondary" text="Удалить" icon="close" className="mx-2"/>
        <Selector
            type="secondary"
            className="mx-2"
            value={{value: pageSize, label: `Строк: ${pageSize}`}}
            onChange={({value}) => {
                setPageSize(Number(value))
            }}
            options={[10, 25, 50, 100].map(pageSize => {
                return {value: pageSize, label: `Строк: ${pageSize}`}
            })}
        >
        </Selector>
    </div>
}

export default ControlTablePanel
//core
import React from "react";

//components
import {Button} from "@components/Base/Button";
import {Selector} from "@components/Base/Selector";

interface IControlTablePanel {
    pageSize: number,
    setPageSize: (arg0: number) => void,
    options: any
}

const ControlTablePanel: React.FC<IControlTablePanel> = ({pageSize, setPageSize, options}) => {
    const button_add = options.add && <Button type="primary" text="Добавить" icon="add" onClick={options.add}/>
    const button_delete = options.delete && <Button type="secondary" text="Удалить" icon="close" className="mx-2" onClick={options.delete.onClick}/>
    return <div className="mt-6 mb-4 flex">
        {button_add}
        {button_delete}
        <Selector
            type="secondary"
            value={{value: pageSize, label: `Строк: ${pageSize}`}}
            onChange={({value}) => {
                setPageSize(Number(value))
            }}
            options={[10, 25, 50, 100].map(pageSize => {
                return {value: pageSize, label: `Строк: ${pageSize}`}
            })}
        />
    </div>
}

export default ControlTablePanel
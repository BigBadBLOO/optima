import React from "react";
import {Button} from "@components/Base/Button";

const ControlPersonal: React.FC = () => {
  
  return (
    <>
      <div>
        <span className="text-2xl font-bold">Управление сотрудниками</span>
      </div>
      <div className="mt-6 mb-4 flex">
        <Button type="primary" text="Добавить" icon="add"/>
        <Button type="secondary" text="Удалить" icon="close" className="mx-2"/>
      </div>
      <div>
        Table
      </div>
    </>
  )
}

export default ControlPersonal
//core
import React from "react";
import {Selector} from "@components/Base/Selector";

interface ITemplateTable {
  templateType: string,
}

const TemplateTable: React.FC<ITemplateTable> = ({templateType}) => {
  const id_template = localStorage.getItem(templateType);
  const allTemplates = [];

  return (
    <>
      <Selector
        type="secondary"
        options={[
          {value: '', label: <p className="border-b pb-2">Все</p>},
          {value: '1', label: 'My'},
          {value: '1', label: 'My1'},
          {
            value: 'control',
            label: <p className="flex border-t pt-2">
              <i className="material-icons my-auto text-sm mr-2">settings</i>
              <span className="my-auto">Управление шаблонами</span>
            </p>
          }
        ]}
        onChange={(data) => {

          localStorage.setItem('leads', data.value)
        }}
        value={{value: '', label: 'Все'}}
      />

    </>
  )
}

export default TemplateTable
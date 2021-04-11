//core
import React, {useMemo, useState} from "react";

//components
import Table from "@pages/UserAuth/platform/components/table/Table";

//data
import header_table_personals from "@pages/UserAuth/platform/typePlatform/TrafficArbitrage/pages/controlPersonal/header.table.personals";

const ControlPersonal: React.FC = () => {
  const columns = useMemo(() => header_table_personals, [])

  const [persons, setPersons] = useState([
    {
      id: 1,
      username: 'Test',
      group: 'CLIENT_ADMIN',
      status: false,
    },
    {
      id: 2,
      username: 'Агапов Е.В.',
      group: 'CLIENT_PROJECT_MANAGER',
      status: true,
    },
    {
      id: 3,
      username: 'Test3',
      group: 'CLIENT_PROJECT_MANAGER',
      status: true,
      offer: null,
      subRows: [
        {
          id: 4,
          username: 'Test4',
          group: 'CLIENT_TRAFFIC_MANAGER',
          status: false,
          offer: "TOTAL_2",
          subRows: [
            {
              offer: 'OFFER_1'
            },
            {
              offer: 'OFFER_2'
            }
          ]
        },
        {
          id: 5,
          username: 'Test4',
          group: 'CLIENT_TRAFFIC_MANAGER',
          status: true,
          offer: "OFFER_3",
        }
      ]
    },
  ]);

  const table_options = {
    width: window.innerWidth - 112,
    selected: true,
    add: {
      href: ''
    },
    delete: {
      href: ''
    },

  }

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
    </>
  )
}

export default ControlPersonal
import React, {useState} from 'react'
import Button from "../../../../components/BaseElement/Button";
import GridLayout from 'react-grid-layout';
import Box from "../utils/LayoutComponents";
import PropTypes from 'prop-types'

function Dashboard({onToggleFullScreen}) {

  const [editWidget, setEditWidget] = useState(false)
  const layout = [
    {i: 'a', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2, maxH: 2},
    {i: 'b', x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2, maxH: 2},
    {i: 'c', x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2, maxH: 2},
    {i: 'd', x: 9, y: 0, w: 3, h: 2, minW: 3, minH: 2, maxH: 2}
  ];

  return (
    <>
      <div>
        <span className="text-bold text-2xl lg:text-3xl p-1">Дэшборд</span>
        <Button className="hidden lg:inline-block" type="secondary" icon="settings" text="Изменить виджеты"
                onClick={setEditWidget.bind(this, !editWidget)}/>
        <div className="float-right">
          <Button type="withoutText" icon="settings" text=""/>
          <Button type="withoutText" icon="fullscreen" text="" onClick={onToggleFullScreen}/>
        </div>
      </div>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}
                  isDraggable={editWidget} isResizable={editWidget}>
        <div key="a"><Box icon="monetization_on" name="Факт. профит за мес." value="113 150 ₽"/></div>
        <div key="b"><Box icon="monetization_on" name="Неоплаченных счетов" value="2"/></div>
        <div key="c"><Box icon="monetization_on" name="Ожидаемые поступления" value="12"/></div>
        <div key="d"><Box icon="monetization_on" name="Актив. рекламодателей" value="14"/></div>
      </GridLayout>
    </>
  )
}

Dashboard.propTypes = {
  onToggleFullScreen: PropTypes.func,
};
export default Dashboard
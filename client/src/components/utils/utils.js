import React, {useEffect, useState} from 'react'
import clsx from 'clsx';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Button from "../BaseElement/Button";
import {setModule} from "../../redux/actions/actions";
import './utils.scss'
import Input, {ImageUploader} from "../BaseElement/Input";
import Moment from "react-moment";
import workWithServer from "../../core/workWithServer";

MakePlatformBase.propTypes = {
  modules: PropTypes.object,
  typePlatforms: PropTypes.object,
  setModule: PropTypes.func,
  selectedTypePlatform: PropTypes.object,
  setSelectedTypePlatform: PropTypes.func,
  currentPlatform: PropTypes.object,
  setCurrentPlatform: PropTypes.func,
}

function MakePlatformBase({platforms, setPlatforms, modules, setModule, typePlatforms}) {
  // const massWithHeaderIcon = Object.values(modules)
  //
  // const [selectedModule, setSelectedModule] = useState({})
  //
  // if (massWithHeaderIcon.length === 0) {
  //   return <div>Loading...</div>
  // }
  //
  // let descriptionHeader = (
  //   <div key="-1" className={clsx("text-gray-600 h-32 w-32 items-start inline-block p-5 align-top text-center",
  //     {"border-b-2 border-gold": currentPlatform.active})} onClick={() => {
  //     setSelectedModule({})
  //     setCurrentPlatform({...currentPlatform, active: true})
  //   }}>
  //     <i className={clsx("material-icons text-3xl", {"text-gold": currentPlatform.active})}>error_outline</i>
  //     <p className={clsx("text-sm", {"text-black": currentPlatform.active})}>Описание</p>
  //   </div>
  // )
  // let listHeader = massWithHeaderIcon.map((elem) => {
  //   const active = elem.name === selectedModule.name
  //   return (
  //     <div key={elem.id} className={clsx("text-gray-600 h-32 w-32 items-start inline-block p-5 align-top text-center",
  //       {"border-b-2 border-gold": active})} onClick={() => {
  //       setSelectedModule(elem)
  //       setCurrentPlatform({...currentPlatform, active: false})
  //     }}>
  //       <i className={clsx("material-icons text-3xl", {"text-gold": active})}>{elem.icon}</i>
  //       <p className={clsx("text-sm", {"text-black": active})}>{elem.name}</p>
  //       {elem.default || elem.add ?
  //         <span className="rounded p-1 bg-opacity-25 bg-orange-200 text-xs text-gold">Добавлен</span> : ''}
  //     </div>
  //   )
  // })
  // listHeader = [descriptionHeader, ...listHeader]
  // return (
  //   <>
  //     <div className="flex justify-center">
  //       <span className="text-xl font-semibold text-gray-600 my-auto">
  //         {currentPlatform && currentPlatform.name}
  //       </span>
  //       <i className="material-icons rounded-full border-4 border-gold text-gold mx-2 my-auto font-semibold
  //       cursor-pointer" onClick={() => {
  //         const idx = currentPlatform.id === 0 ? Object.keys(typePlatforms).length - 1 : currentPlatform.id - 1
  //         setSelectedModule({})
  //         setCurrentPlatform({...typePlatforms[idx], active: true})
  //       }}>arrow_back</i>
  //       <i className="material-icons rounded-full border-4 border-gold text-gold mx-2 my-auto font-semibold
  //       cursor-pointer" onClick={() => {
  //         const idx = currentPlatform.id === Object.keys(typePlatforms).length - 1 ? 0 : currentPlatform.id + 1
  //         setSelectedModule({})
  //         setCurrentPlatform({...typePlatforms[idx], active: true})
  //       }}>arrow_forward</i>
  //     </div>
  //
  //     <div className="m-3 mt-4 shadow bg-white rounded border">
  //       <div className="overflow-auto whitespace-no-wrap flex justify-start md:justify-center">
  //         {listHeader}
  //       </div>
  //       <hr className="m-0"/>
  //       <div className="grid grid-cols-2 text-left">
  //         {Object.keys(selectedModule).length > 0 &&
  //         <SelectedModuleBody modules={modules} selectedModule={selectedModule} setModule={setModule}/>}
  //         {currentPlatform.active &&
  //         <SelectedPlatformInfo currentPlatform={currentPlatform}/>}
  //       </div>
  //     </div>

      {/*<div className="text-center md:text-left m-3 shadow rounded block md:flex justify-center p-4">*/}
      {/*  <div>*/}
      {/*    <p className="font-semibold">Добавили все необходимые модули?</p>*/}
      {/*    <p>Войдите в созданную платформу и начните работать с ней прямо сейчас</p>*/}
      {/*  </div>*/}
      {/*  <span className="material-icons hidden md:inline-block my-auto text-4xl text-gray-600 mx-2 text-opacity-50">*/}
      {/*    navigate_next*/}
      {/*  </span>*/}
      {/*  <Button type="primary" className="w-full md:w-auto" text="Войдите в демо платформы"/>*/}
      {/*</div>*/}

    // </>
  // )
}


function mapStateToProps(state) {
  return {
    modules: state.staticData.modules,
    typePlatforms: state.staticData.typePlatforms,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setModule: module => dispatch(setModule(module)),
  }
}

const MakePlatform = connect(mapStateToProps, mapDispatchToProps)(MakePlatformBase)

SelectedModuleBody.propTypes = {
  selectedModule: PropTypes.object,
  modules: PropTypes.object,
  setModule: PropTypes.func
}

function SelectedModuleBody({selectedModule, modules, setModule}) {
  return (
    <>
      <p className="m-4 text-semibold text-3xl text-left flex my-auto ">{selectedModule.name}</p>
      <div className='flex justify-end m-4'>
        <Button type="secondary" classNameText="hidden md:inline-block" icon="visibility" text="Предпросмотр"/>
        <Button type="primary" classNameText="hidden md:inline-block"
                icon={selectedModule.default || selectedModule.add ? 'lock' : 'add'}
                disabled={selectedModule.default}
                text={selectedModule.default || selectedModule.add ? 'Модуль добавлен' : 'Добавить модуль'}
                onClick={() => {
                  selectedModule.add = !selectedModule.add
                  const data = {}
                  data[selectedModule.id] = selectedModule
                  setModule(data)
                }}
        />
      </div>
      <span className="m-4  col-span-2 md:col-span-1">{selectedModule.description}</span>
      <div className="m-4 col-span-2 md:col-span-1">
        <p className="mb-2 text-sm text-gray-600">Стоимость</p>
        <p className="text-semibold">От {selectedModule.payment} ₽ в день</p>
        <p className="my-2 text-sm text-gray-600 cursor-pointer">
          Этот модуль связан с другими модулями<i className="material-icons text-sm text-opacity-75">help</i>
        </p>
        <p className="text-semibold">
          {selectedModule.dependencies && selectedModule.dependencies.length > 0 ? selectedModule.dependencies.map(elem => {
            return modules[elem].name
          }).join(' / ') : 'Нет взаимосвязей'}
        </p>
      </div>
    </>
  )
}

SelectedPlatformInfo.propTypes = {
  currentPlatform: PropTypes.object,
  modules: PropTypes.object,
  setModule: PropTypes.func
}

function SelectedPlatformInfo({currentPlatform}) {
  return (
    <>
      <p className="m-4 text-semibold text-3xl text-left flex my-auto ">{currentPlatform.name}</p>
      <div className='flex justify-end m-4'>
        <Button type="secondary" classNameText="hidden md:inline-block" icon="visibility" text="Демо платформы"/>
        {/*<Button type="primary" classNameText="hidden md:inline-block"*/}
        {/*        icon={selectedModule.default || selectedModule.add ? 'lock' : 'add'}*/}
        {/*        disabled={selectedModule.default}*/}
        {/*        text={selectedModule.default || selectedModule.add ? 'Модуль добавлен' : 'Добавить модуль'}*/}
        {/*        onClick={() => {*/}
        {/*          selectedModule.add = !selectedModule.add*/}
        {/*          const data = {}*/}
        {/*          data[selectedModule.id] = selectedModule*/}
        {/*          setModule(data)*/}
        {/*        }}*/}
        {/*/>*/}
      </div>
      <span className="m-4  col-span-2 md:col-span-1">{currentPlatform.description}</span>
      <div className="m-4 col-span-2 md:col-span-1">
        <p className="mb-2 text-sm text-gray-600">Стоимость</p>
        <p className="text-semibold">От {currentPlatform.payment} ₽ в день</p>
        <p className="my-2 text-sm text-gray-600 cursor-pointer">
          Для новых пользователей
        </p>
        <p className="text-semibold">
          Доступен 14-дневный пробный период
        </p>
      </div>
    </>
  )
}

function ArrowProgress() {
  return (
    <div className="flex border rounded border-opacity-25 cursor-default mt-4 overflow-x-auto">
      <div className="step text-center p-4 relative w-1/3 text-gray-500 active ">
        <p className="name">Шаг 1</p>
        <p className="value font-semibold">Выберите модули</p>
      </div>
      <div className="step text-center p-4 relative w-1/3 text-gray-500">
        <p className="name">Шаг 2</p>
        <p className="value font-semibold">Выберите тариф</p>
      </div>
      <div className="step text-center p-4 relative w-1/3 text-gray-500 ">
        <p className="name">Шаг 3</p>
        <p className="value font-semibold">Введите данные</p>
      </div>
    </div>
  )
}

SettingUserTabPanelFirst.propTypes = {
  userLocal: PropTypes.object,
  setUserLocal: PropTypes.func,
}

function SettingUserTabPanelFirst({userLocal, setUserLocal}) {
  const [changePassword, setChangePassword] = useState(false)

  return (
    <div className="mt-2 bg-white p-2 rounded py-4">
      <div className="md:grid md:grid-cols-4 md:gap-4">

        <label className="text-right my-auto">Аватар</label>
        <div className="col-span-3 flex">
          <ImageUploader image={userLocal.avatar} setImage={(img) => {
            const url_img = img ? URL.createObjectURL(img) : null
            setUserLocal({...userLocal, avatar: url_img, avatar_file: img})
          }}/>
        </div>


        <label className="text-right my-auto">Имя</label>
        <div className="col-span-3 flex">
          <Input className="col-span-3 w-full mx-0" value={userLocal.name}
                 setValue={value => setUserLocal({...userLocal, name: value})}/>
        </div>

        <label className="text-right my-auto">Электронная почта</label>
        <div className="col-span-3 flex">
          <Input className="col-span-3 w-full mx-0" value={userLocal.email}
                 setValue={value => setUserLocal({...userLocal, email: value})}/>
        </div>

        <label className="text-right my-auto">Пароль</label>
        <div className="col-span-3 md:flex">
          {changePassword
            ? (
              <>
                <Input type="password" value={userLocal.password}
                       setValue={(value) => setUserLocal({...userLocal, password: value})}/>
                <Button type="secondary" text="Сохранить пароль" onClick={() => setChangePassword(false)}/>
              </>
            )
            : <Button type="secondary" text="Изменить пароль" onClick={() => setChangePassword(true)}/>
          }
        </div>
      </div>
    </div>
  )
}

SettingUserTabPanelSecond.propTypes = {
  userLocal: PropTypes.object,
  setUserLocal: PropTypes.func,
}


function SettingUserTabPanelSecond({userLocal, setUserLocal}) {
  return (
    <>
      <div className="mt-2 bg-white p-2 rounded py-4">
        <div className="md:grid md:grid-cols-4 md:gap-4">

          <label className="text-right my-auto">Двухэтапная аутентификация</label>
          <div className="col-span-3 flex my-2">
        <span className="text-gold rounded bg-gold bg-opacity-25 p-1 mx-2 my-auto">
        {userLocal.twoAuth ? 'Подключено' : 'Отключено'}
        </span>
            <span className="text-gray-600 my-auto cursor-pointer"
                  onClick={() => setUserLocal({...userLocal, twoAuth: !userLocal.twoAuth})}>
        {userLocal.twoAuth ? 'Отключить' : 'Включить'}
        </span>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-white p-2 rounded py-4">
        <div className="md:grid md:grid-cols-4 md:gap-4">
          <label className="text-right">Последняя активность</label>
          <div className="col-span-3">
            <p><Moment
              format="HH:mm DD.MM.YYYY">{userLocal.last_login}</Moment> {' (' + userLocal.lastLoginDevice + ')'}</p>
            <p className="text-gold my-4">Показать историю активности</p>
            <p className="text-gold my-4 cursor-pointer" onClick={() => {
              workWithServer.closeAllSession()
            }}>Завершить все сеансы</p>
          </div>
        </div>
      </div>
    </>
  )
}

export {
  MakePlatform,
  ArrowProgress,
  SettingUserTabPanelFirst,
  SettingUserTabPanelSecond,
}
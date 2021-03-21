import React, {useEffect, useState} from "react";
import Button from "../BaseElement/Button";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import PropTypes from "prop-types";
import dashboard from "../../images/dashboard.svg";
import {MakePlatform} from "../utils/utils";
import {Link} from "react-router-dom";
import './body.scss'
import Popover from "react-popover";

import Flicking from "@egjs/react-flicking";
import clsx from "clsx";

function Body() {
  const data = [
    {
      name: '1', profit: 0
    },
    {
      name: '5', profit: 3000
    },
    {
      name: '10', profit: 2000
    },
    {
      name: '15', profit: 2780
    },
    {
      name: '20', profit: 1890
    },
    {
      name: '25', profit: 2390
    },
    {
      name: '30', profit: 3490
    },
  ];
  return (
    <div className="bg-gray-200 p-4 md:p-8">
      <div className="block  md:flex mb-4">
        <span className="text-2xl font-semibold">
          Мои платформы
        </span>

        <Button type="secondary" icon="add" text={<Link to="/newPlatform/">Новая платформа</Link>} className="mx-0 w-full block md:flex md:w-auto
        md:ml-auto "/>
      </div>

      <div className="rounded p-4 md:px-8 bg-white">
        <div className="flex border-b border-opacity-50 py-4">
          <span className="text-2xl font-semibold my-auto">Leadgen</span>
          <Button type="secondary" icon="settings" className="mx-2"/>
          <Button type="secondary" text="Изменить модули" className="mx-2 hidden md:flex"/>
          <Button type="primary" icon="arrow_forward" text="Войти в платформу" classNameText="align-text-top"
                  className="text-xs sm:text-base mx-2 ml-auto"/>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="mt-4 ml-2 flex">
            <i className="material-icons my-auto mr-4 text-gold text-2xl">stars</i>
            <div>
              <p className="text-gray-600 text-sm">
                Текущий тариф
              </p>
              <p className="text-lg font-semibold">
                2000
              </p>
            </div>
          </div>

          <div className="mt-4 flex">
            <i className="material-icons my-auto mr-4 text-gold text-2xl">add</i>
            <div>
              <p className="text-gray-600 text-sm">
                Лимит лидов
              </p>
              <p className="text-lg font-semibold">
                985 из 2000
              </p>
            </div>
          </div>

          <div className="mt-4 flex">
            <i className="material-icons my-auto mr-4 text-gold text-2xl">add</i>
            <div>
              <p className="text-gray-600 text-sm">
                Ср. лидов в день
              </p>
              <p className="text-lg font-semibold">
                20
              </p>
            </div>
          </div>

          <div className="mt-4 flex">
            <i className="material-icons my-auto mr-4 text-gold text-2xl">add</i>
            <div>
              <p className="text-gray-600 text-sm">
                Ср. конверсия
              </p>
              <p className="text-lg font-semibold">
                39%
              </p>
            </div>
          </div>
        </div>
        <p className="text-lg font-semibold my-4">
          Расчетный профит за Июль 2020
        </p>
        <div style={{width: '100%', height: 300}}>
          <ResponsiveContainer>
            <AreaChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} key="renderHorizontal"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip dataKey={"name"}/>
              <Area type="monotone" dataKey="profit" stroke="#E0BB87" fill="#e0bb8761"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default Body



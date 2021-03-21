import React from "react";

import {Link} from "react-router-dom";
import Button from "../components/BaseElement/Button";
import {ArrowProgress, MakePlatform} from "../components/utils/utils";

function NewPlatform() {

  return (
    <>
      <div className="m-3 md:m-10">
        <div className="flex">
          <Link to="/" className="h-6 my-auto">
            <span className="material-icons my-auto">keyboard_backspace</span>
          </Link>
          <span className="text-xl md:text-2xl my-auto md:ml-4">Новая платформа</span>
          <Button className="hidden md:inline-block ml-auto my-auto" type="primary" text="Следующий шаг"/>
        </div>

        <ArrowProgress/>
        <MakePlatform/>

        <Button className="inline-block md:hidden mx-0 w-full mt-2" type="primary" text="Следующий шаг"/>

      </div>
    </>
  )
}

export default NewPlatform



import React from "react";
import {Link} from "react-router-dom";

function Documentation() {

  return (
    <>
      <div className="bg-white">

        <Link to="/">
          <span className="mx-2">Назад</span>
        </Link>
        <div className="m-3 md:m-10 ">
          <p>
            Документация
          </p>
        </div>
      </div>
    </>
  )
}

export default Documentation
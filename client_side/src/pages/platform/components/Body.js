import React from 'react'

function Body({children}) {
  return (
    <>
      <div className="bg-gray-100 fixed w-full h-full left-0 top-0 mt-16 z-0 p-6 lg:pl-20">
        {children}
      </div>
    </>

  )
}

export default Body
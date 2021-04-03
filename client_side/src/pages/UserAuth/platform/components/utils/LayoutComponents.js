import React from 'react'

export default function Box({icon, name, value}) {
  return (
    <div className="w-full h-full flex content-center bg-white rounded-md shadow-sm">
      <span className="material-icons my-auto mx-4 text-gold">{icon}</span>
      <div className="my-auto mr-4 grid">
        <span className="text-gray-600">{name}</span>
        <span className="font-bold">{value}</span>
      </div>
    </div>
  )
}
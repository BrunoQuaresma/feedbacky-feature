import React from 'react'

const CardPlaceholder: React.FC = () => {
  return (
    <div className="p-6 rounded-lg bg-white shadow mb-2 md:max-w-xs md:inline-block md:w-full sm:mr-2">
      <div className="bg-gray-400 mb-2 h-3 w-3/5"></div>
      <div className="bg-gray-200 h-2"></div>
    </div>
  )
}

export default CardPlaceholder

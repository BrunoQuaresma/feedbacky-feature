import React from 'react'
import spinner from './spinner.svg'

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center py-24">
      <div className="relative inline-block">
        <img src={spinner} alt="Loading spinner" className="h-24" />
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <i className="far fa-comment-dots text-4xl text-indigo-500"></i>
        </div>
      </div>
    </div>
  )
}

export default Loading

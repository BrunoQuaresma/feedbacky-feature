import React, { useState } from 'react'
import { Reply } from './types'
import * as timeago from 'timeago.js'

const ReplyCard: React.FC<{ reply: Reply }> = ({ reply }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(isOpen => !isOpen)

  return (
    <div className="p-4 rounded-lg bg-white shadow mb-2 flex flex-wrap items-baseline">
      <button
        className="relative w-8 h-8 rounded-full bg-indigo-100  mr-4"
        onClick={toggle}
      >
        <div className="flex items-center justify-center">
          <i className="far fa-comment text-indigo-500"></i>
        </div>

        <div className="absolute bottom-0 right-0 leading-none h-4 w-4 -mr-1 bg-indigo-500 text-white rounded-full flex items-center justify-center">
          {isOpen ? (
            <i className="fas fa-chevron-down text-xxs"></i>
          ) : (
            <i className="fas fa-chevron-right text-xxs"></i>
          )}
        </div>
      </button>

      <div className={`flex-1 ${isOpen ? '' : 'truncate'} md:flex`}>
        <p
          className={`text-lg  max-w-xl ${
            isOpen ? 'whitespace-pre-line' : 'truncate'
          }`}
        >
          {reply.content}
        </p>

        <p className="text-sm text-gray-700 ml-auto">
          {timeago.format(reply.created_at)}
        </p>
      </div>
    </div>
  )
}

export default ReplyCard

import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Reply } from './types'

const ReplyCard: React.FC<{ reply: Reply }> = ({ reply }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(isOpen => !isOpen)

  return (
    <div className="py-4 pl-2 pr-6 rounded-lg bg-white shadow mb-2 flex">
      <div className="pr-1">
        {isOpen ? (
          <button className="text-sm h-8 w-8" onClick={toggle}>
            <i className="fas fa-chevron-down"></i>
          </button>
        ) : (
          <button className="text-sm h-8 w-8" onClick={toggle}>
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
      <div className={isOpen ? '' : 'truncate'}>
        <p
          className={`text-lg w-full ${
            isOpen ? 'whitespace-pre-line' : 'truncate'
          }`}
        >
          {reply.content}
        </p>
        <p className={`text-sm text-gray-700 ${isOpen ? 'mt-2' : ''}`}>
          Replyed on {dayjs(reply.created_at).format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    </div>
  )
}

export default ReplyCard

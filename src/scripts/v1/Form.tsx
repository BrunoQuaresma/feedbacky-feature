import React, { useState, useEffect } from 'react'
import { fetchForm, sendReply } from './api'

const Form: React.FC<{ id: string; voterId: string }> = ({ id, voterId }) => {
  const [form, setForm] = useState<{ title: string }>()
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<'idle' | 'sending' | 'finished'>(
    'idle'
  )

  useEffect(() => {
    fetchForm({ formId: id, voterId }).then(response => setForm(response.form))
  }, [id, voterId])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormState('sending')
    await sendReply({ formId: id, voterId, content: message })
    setFormState('finished')
    setMessage('')
  }

  if (!form) return <></>

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message" className="form__title">
          {form.title}
        </label>
        <textarea
          required
          id="message"
          rows={5}
          className="form__field"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <div className="form__actions">
          <button
            type="submit"
            className="form__button"
            disabled={formState === 'sending' || formState === 'finished'}
          >
            {formState === 'idle' && 'Send message'}
            {formState === 'sending' && 'Sending message...'}
            {formState === 'finished' && 'Message sent successfully'}
          </button>
        </div>
      </form>
    </>
  )
}

export default Form

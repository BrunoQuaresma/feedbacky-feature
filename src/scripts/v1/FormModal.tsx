import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { fetchForm, sendReply } from './api'

const FormModal: React.FC<{
  id: string
  voterId: string
}> = ({ id, voterId }) => {
  const [form, setForm] = useState<{ title: string }>()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<'idle' | 'sending' | 'finished'>(
    'idle'
  )

  useEffect(() => {
    fetchForm({ formId: id, voterId }).then(response => setForm(response.form))
  }, [id, voterId])

  useEffect(() => {
    const triggerElements = document.querySelectorAll(`*[data-target="${id}"]`)

    if (triggerElements.length === 0) {
      console.warn(`No trigger elements found for form ${id}`)
      return
    }

    triggerElements.forEach(element => {
      element.addEventListener('click', toggle)
    })

    return () =>
      triggerElements.forEach(element => {
        element.removeEventListener('click', toggle)
      })
  }, [id])

  const toggle = () => setIsOpen(isOpen => !isOpen)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormState('sending')
    await sendReply({ formId: id, voterId, content: message })
    setFormState('finished')
    setMessage('')
    setTimeout(() => toggle(), 1000)
  }

  if (!form) return <></>

  return (
    <Modal id={id} toggle={toggle} isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <div className="modal__header">{form.title}</div>

        <div className="modal__body">
          <textarea
            autoFocus
            required
            id="message"
            rows={5}
            className="form__field"
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
        </div>

        <div className="modal__footer">
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
    </Modal>
  )
}

export default FormModal

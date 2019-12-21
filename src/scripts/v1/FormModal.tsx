import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { fetchForm } from './api'

const FormModal: React.FC<{
  id: string
  voterId: string
}> = ({ id, voterId }) => {
  const [form, setForm] = useState<{ title: string }>()
  const [isOpen, setIsOpen] = useState(false)

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

  if (!form) return <></>

  return (
    <>
      <Modal id={id} toggle={toggle} isOpen={isOpen}>
        <div className="modal__header">{form.title}</div>

        <div className="modal__body">
          <textarea
            autoFocus
            id="message"
            rows={5}
            className="form__field"
          ></textarea>
        </div>

        <div className="modal__footer">
          <button type="submit" className="form__button">
            Send message
          </button>
        </div>
      </Modal>
    </>
  )
}

export default FormModal

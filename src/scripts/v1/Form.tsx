import React, { useState, useEffect } from 'react'
import { fetchForm } from './api'

const Form: React.FC<{ id: string; voterId: string }> = ({ id, voterId }) => {
  const [form, setForm] = useState<{ title: string }>()

  useEffect(() => {
    fetchForm({ formId: id, voterId }).then(response => setForm(response.form))
  }, [id, voterId])

  if (!form) return <></>

  return (
    <>
      <form action="">
        <label htmlFor="message" className="form__title">
          {form.title}
        </label>
        <textarea id="message" rows={5} className="form__field"></textarea>
        <button type="submit" className="form__button">
          Send message
        </button>
      </form>
    </>
  )
}

export default Form

import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'

type NewFeatureForm = {
  name: string
  description: string
}

const NewFeaturesPage: React.FC = () => {
  const { register, handleSubmit } = useForm<NewFeatureForm>()
  const history = useHistory()

  const onSubmit = async (form: NewFeatureForm) => {
    await axios.post('/api/features', form)
    history.push('/')
  }

  return (
    <>
      <h1>New feature</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Name</label>
          <input required autoFocus name="name" type="text" ref={register} />
        </div>

        <div>
          <label htmlFor="">Description</label>
          <textarea required name="description" rows={10} ref={register} />
        </div>

        <div>
          <button>Save</button>
        </div>
      </form>
    </>
  )
}

export default NewFeaturesPage

import React, { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'

const FormDepartamentos = () => {

  // Configurar States
  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState(false)

  const [sigla, setSigla] = useState('')
  const [errorSigla, setErrorSigla] = useState(false)

  const [error, setError] = useState('')

  // Seta as Referencias do Form
  const nameInputRef = useRef(null)
  const siglaInputRef = useRef(null)

  const formValidate = () => {

    // PrimeiroLimpa a mensagem
    setError('')
    setErrorName(false)
    setErrorSigla(false)

    if (name == '') {
      setError('Preencha seu nome')
      setErrorName(true)
      nameInputRef.current.focus()
      return false
    }

    if (sigla == '') {
      setError('Preencha a Silga')
      setErrorSigla(true)
      siglaInputRef.current.focus()
      return false
    }

    return true
  }

  return (
    <>
      <h1 className='text-xl my-6'>
        <i className='pi pi-plus mr-4' />
        Cadastro de Departamentos
      </h1>

      <div className='flex mt-12'>

        <div className="p-float-label w-1/2 pr-2">
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full !shadow-none ${errorName ? 'p-invalid' : ''}`}
            autoComplete='off'
            ref={nameInputRef}
          />
          <label htmlFor="name">Nome</label>
        </div>

        <div className="p-float-label w-1/4">
          <InputText
            id="sigla"
            value={sigla}
            onChange={(e) => setSigla(e.target.value)}
            className={`w-full !shadow-none ${errorSigla ? 'p-invalid' : ''}`}
            autoComplete='off'
            ref={siglaInputRef}
          />
          <label htmlFor="sigla">Sigla</label>
        </div>

      </div>

      <div className='flex mt-6'>
        <div className='mr-4'>

          <Button
            type='submit'
            label='Save'
            severity='info'
            icon='pi pi-check'
            onClick={() => {
              formValidate()
            }}
          />
        </div>


        {error !== '' &&
          <Message
            severity='error'
            text={error}
          />
        }

      </div>
    </>
  )
}

export default FormDepartamentos
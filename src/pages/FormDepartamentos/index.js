import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { insertDepartamento } from '../../services/departamentos'

const FormDepartamentos = () => {

  const { id_departamento } = useParams()
  const navigate = useNavigate()

  // Configurar States
  const [nome, setNome] = useState('')
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

    if (nome == '') {
      setError('Preencha seu nome')
      setErrorName(true)
      nameInputRef.current.focus()
      return false
    }

    if (sigla == '') {
      setError('Preencha a Sigla')
      setErrorSigla(true)
      siglaInputRef.current.focus()
      return false
    }

    return true
  }

  const createDepartamento = async () => {
    try {
      await insertDepartamento({ nome, sigla })
      navigate('/departamentos')

    } catch (e) {
      const { code } = e.response.data.exception.code
      if (code === 'ER_DUP_ENTRY') {
        setError('Registro duplicado na base de dados')
      } else {
        setError('Erro na inserção no registro')
      }
    }
  }


  return (
    <>
      <h1 className='text-xl my-6'>
        <i className='pi pi-plus mr-4' />
        {id_departamento ? 'Edição' : 'Cadastro'} de Departamentos
      </h1>

      <div className='flex mt-12'>

        <div className="p-float-label w-1/2 pr-2">
          <InputText
            id="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
            label='Cadastrar'
            severity='info'
            icon='pi pi-check'
            onClick={() => {
              if (formValidate()) {
                createDepartamento()
              }
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
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import getDepartamentos from '../../services/departamentos'
import { ProgressBar } from 'primereact/progressbar'

const Departamentos = () => {

  const [departamentos, setDepartamentos] = useState()
  const [Loading, setLoading] = useState(true)

  const loadDepartamentos = async () => {
    try {
      const result = await getDepartamentos()
      console.log(result)
      setDepartamentos(result.data)
      setLoading(false)
    } catch (e) {
      console.log('erro da api', e)
    }
  }

  // Monitora o state departamentos e caso null chama api
  useEffect(() => {
    if (!departamentos) {
      loadDepartamentos()
    }
  }, [departamentos])

  return (
    <>
      <ProgressBar
        mode='indeterminate'
        hidden={!Loading}
        className='!absolute top-0 left-0 w-full !h-[2px]'
      />

      <h1 className='text-x1 mt-6'>
        <i className='pi pi-list mr-3' />
        Listagem de Departamentos
      </h1>

      <DataTable
        value={departamentos}
        emptyMessage='Nenhum departamento encontrado'
        paginator rows={4}
      >

        <Column
          header='ID'
          field='id_departamento'
        />

        <Column
          header='Nome'
          field='nome'
        />

        <Column
          header='Sigla'
          field='sigla'
        />

      </DataTable>

    </>
  )
}

export default Departamentos
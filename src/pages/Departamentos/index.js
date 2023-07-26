import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import getDepartamentos, { deleteDepartamento } from '../../services/departamentos'

const Departamentos = () => {

  const toast = useRef(null)
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

  const removeDepartamento = async (id_departamento) => {
    try {
      await deleteDepartamento({
        id_departamento
      })

      toast.current.show({
        summary: 'SUCESSO',
        detail: 'Departamento excluído',
        severity: 'success'
      })
      loadDepartamentos()
    } catch (e) {
      let detail = ''
      if (e.response.data.exception && e.response.data.exception.code) {
        if (e.response.data.exception.code === 'ER_ROW_IS_REFERENCED_2') {
          detail = 'Existem funcionários vinculados ao Departamento.'
        }
      } else {
        detail = 'Departamento não encontrado.'
        loadDepartamentos()
      }
      toast.current.show({
        summary: 'ERRO',
        detail,
        severity: 'error'
      })
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
        loading={Loading}
      >

        <Column
          header='ID'
          field='id_departamento'
          sortable
        />

        <Column
          header='Nome'
          field='nome'
        />

        <Column
          header='Sigla'
          field='sigla'
        />

        <Column
          body={(depto) => (
            <Button
              icon='pi pi-trash'
              severity='danger'
              rounded
              onClick={() => {

                confirmDialog({
                  header: 'Exclusão de Departamento',
                  message: `Você tem certeza que deseja excluir? ${depto.nome}?`,
                  icon: 'pi pi-info-circle',
                  draggable: false,
                  acceptLabel: 'Sim',
                  acceptClassName: 'p-button-danger',
                  rejectLabel: 'Não',
                  className: 'w-[500px]',
                  accept: () => {
                    removeDepartamento(depto.id_departamento)
                  },
                  reject: () => { console.log('Cancelou') }
                })

              }}
            />
          )}
        />
      </DataTable>


      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  )
}

export default Departamentos
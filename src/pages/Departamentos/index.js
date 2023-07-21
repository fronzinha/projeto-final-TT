import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const Departamentos = () => {

  const departamentos = [
    { 'id_departamento': 1, 'sigla': 'CPD', 'nome': 'Centro de Processamento de Dados' },
    { 'id_departamento': 2, 'sigla': 'RH', 'nome': 'Recursos Humanos' },
    { 'id_departamento': 3, 'sigla': 'FINANC', 'nome': 'Financeiro' },
    { 'id_departamento': 4, 'sigla': 'DP', 'nome': 'Departamento. Pessoal' },
    { 'id_departamento': 5, 'sigla': 'SO', 'nome': 'Security Office' },
    { 'id_departamento': 6, 'sigla': 'SRE', 'nome': 'Site Reliability' },
  ]

  return (
    <>
      <h1 className='text-x1 mt-6'>
        <i className='pi pi-list mr-3' />
        Listagem de Departamentfdfos
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
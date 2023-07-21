import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import logo from '../../assets/img/logo-tt.svg'

const Menu = () => {

  const naviGate = useNavigate()

  const menuItems = [
    {
      label: 'Departamentos',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Listas',
          icon: 'pi pi-list',
          command: () => {
            naviGate('/departamentos')
          }
        },
        {
          separator: true
        },
        {
          label: 'Adicionar',
          icon: 'pi pi-plus',
          command: () => {
            naviGate('/departamentos/new')
          }
        }
      ]
    },
  ]

  const start = () => (
    <Link to='/'>
      <img src={logo} className='w-6 mr-4' />
    </Link>
  )

  return (
    <Menubar model={menuItems} start={start} />
  )
}

export default Menu
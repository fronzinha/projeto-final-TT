import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import Menu from './components/Menu'
import Departamentos from './pages/Departamentos'


const App = () => {

  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Menu />


        <div className='container mx-auto'>
          <Routes>
            <Route path='/'>
              <Route index element={<h1>Olá Dev!</h1>} />

              <Route path='departamentos'>
                <Route index element={<Departamentos/ >} />
                <Route path='new' element={<h1>Cadastro de Departamentos</h1>} />
              </Route>


              <Route path='/*' element={<h1>Não encontrado</h1>} />

            </Route>
          </Routes>
        </div>

      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App

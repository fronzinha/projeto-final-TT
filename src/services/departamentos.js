import api from './api'

// Não tem o EXPORT pois é exportado como DEFAULT, logo no import não precisa de {}
const getDepartamentos = async () => {
  const resp = await api.get('/departamentos')

  return resp
}

export const getDepartamentoById = async ({ id_departamento }) => {
  const resp = await api.get(`/departamentos/${id_departamento}`)

  return resp
}


export const deleteDepartamento = async ({ id_departamento }) => {
  const resp = await api.delete(`/departamentos/${id_departamento}`)

  return resp
}

export const insertDepartamento = async ({ nome, sigla }) => {
  const resp = await api.post('/departamentos', { nome, sigla })

  return resp
}

export const updateDepartamento = async ({ nome, sigla, id_departamento }) => {
  const resp = await api.patch(`/departamentos/${id_departamento}`, { nome, sigla })

  return resp
}

export default getDepartamentos
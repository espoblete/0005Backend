import { UserModel } from '../models/user.model.js'
import validateCreateUserBody from '../validators/user.validator.js'

//crea por metodo de moongoose con lo que se le pasa por el body
export const createUser = async (body) => {
  const newUser = await UserModel.create(body)
  return newUser
}

//export const createUser = async (req, res) => {
//  const body = req.body
//  try {
//    const value = await validateCreateUserBody(body)
//    const newUser = await UserModel.create(value)
//    return res.json(newUser)
//  } catch (error) {
//    const errorResponse = {
//      status: 'FAILED',
//      details: error.message
//    }
//    return res.status(400).json(errorResponse)
// }
//}



export const findUserByEmail = async (email) => {
  const userFound = await UserModel.findOne({ email: email })
  return userFound
}

//devuelve como respuesta la info que tiene almacenado el token, por el middleware de carpeta auth
export const getProfile = async (req, res) => {
  const user = req.user
  return res.json(user)
}
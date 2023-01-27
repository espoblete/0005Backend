import { Router } from 'express'
import { verifyToken } from '../../auth/middlewares/auth.middlewares.js'
import { createOrder } from '../controllers/orders.controller.js'

// Definimos la instancia de nuestro express router
const ordersRouter = Router()

// Se define la base de la URI para exponer el servicio
const baseURI = '/orders'

ordersRouter.post( baseURI, verifyToken, createOrder )



export default ordersRouter
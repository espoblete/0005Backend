import awaitCatcher from 'await-catcher'
//import mercadopago from 'mercadopago' hay que instalarla ------> npm i -s mercadopago
import environment from '../../../config/environment.js'
import { OrderModel } from '../models/orders.model.js'


//*****COLOCAR LAS 3 LINEAS DE ABAJO ******
//mercadopago.configure( {
//  access_token: environment.TOKEN_MERCADO_PAGO
//} )
export const createOrder = async ( req, res ) => {
  const user = req.user
  const body = {products: req.body.products.map(product => product._id), user: user.id}
  const [ orderCreated, orderCreatedError ] = await awaitCatcher( OrderModel.create( body ) )
  if ( !orderCreated || orderCreatedError ) {
    const errorResponse = {
      status: 'FAILED',
      details: orderCreatedError?.message || 'Ha ocurrido un error al procesar la solicitud'
    }
    return res.status( 400 ).json( errorResponse )
  }

  const [ orderPopulated, orderPopulatedError ] = await awaitCatcher( orderCreated.populate( 'user' ).populate( 'products' ).execPopulate() )
  if ( !orderPopulated || orderPopulatedError ) {
    const errorResponse = {
      status: 'FAILED',
      details: orderPopulatedError?.message || 'Ha ocurrido un error al procesar la solicitud'
    }
    return res.status( 400 ).json( errorResponse )
  }

  const items = orderPopulated.products.map( product => {
    return { title: product.name, unit_price: parseInt( product.price ), quantity: 1 }
  } )

  const [ preferenceId, preferenceIdError ] = await awaitCatcher( mercadopago.preferences.create( { items } ) )
  if ( !preferenceId || preferenceIdError ) {
    const errorResponse = {
      status: 'FAILED',
      details: preferenceIdError?.message || 'Ha ocurrido un error al procesar la orden'
    }
    return res.status( 400 ).json( errorResponse )
  }

  return res.status( 201 ).json( { preferenceId } )
}
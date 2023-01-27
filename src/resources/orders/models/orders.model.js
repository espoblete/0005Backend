import mongoose, { SchemaTypes } from 'mongoose'

const orderSchema = new mongoose.Schema( {
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [ {
    type: SchemaTypes.ObjectId,
    ref: 'Product'
  } ]
}, { timestamps: true } )

// Se crea la instancia del modelo.
export const OrderModel = new mongoose.model( 'Order', orderSchema )
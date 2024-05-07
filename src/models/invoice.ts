import mongoose from 'mongoose'
import { UserDoc } from './user'

interface InvoiceAttrs {
  price: string
  status: string
  user: UserDoc
}

// an interface that describes the properties
// that a User model has
interface InvoiceModel extends mongoose.Model<InvoiceDoc> {
  build(attrs: InvoiceAttrs): InvoiceDoc
}

// an interface that describes the properties
// that a User document has
interface InvoiceDoc extends mongoose.Document {
  price: string
  status: string
  user: UserDoc
}

const invoiceSchema = new mongoose.Schema({
  price: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

invoiceSchema.statics.build = (attrs: InvoiceAttrs) => {
  return new Invoice(attrs)
}

const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>('Invoice', invoiceSchema)

export { Invoice }

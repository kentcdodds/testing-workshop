import mongoose from 'mongoose'
import './expect-extensions'

process.env.NODE_ENV = 'test'
mongoose.Promise = Promise

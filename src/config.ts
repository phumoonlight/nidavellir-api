import dotenv from 'dotenv'

dotenv.config()

const DEFAULT_PORT = 4000
const DEFAULT_NODE_ENV = 'development'

export const env = {
  port: process.env.PORT || DEFAULT_PORT,
  nodeEnv: process.env.NODE_ENV || DEFAULT_NODE_ENV,
  mongoConnection: process.env.MONGO_CONNECTION || '',
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || '',
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY || '',
}

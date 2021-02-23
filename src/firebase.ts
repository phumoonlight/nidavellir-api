import admin from 'firebase-admin'

import { env } from './config'

const serviceAccount: admin.ServiceAccount = {
  projectId: env.firebaseProjectId,
  clientEmail: env.firebaseClientEmail,
  privateKey: env.firebasePrivateKey,
}
let firebaseApp: admin.app.App

export const initFirebaseApp = () => {
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const getFirestore = () => {
  return firebaseApp.firestore()
}

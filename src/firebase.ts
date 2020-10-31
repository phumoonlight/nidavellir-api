import firebaseAdmin from 'firebase-admin'

import { Config } from './config'

export namespace Firebase {
  export const app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: Config.env.firebaseProjectId,
      clientEmail: Config.env.firebaseClientEmail,
      privateKey: Config.env.firebasePrivateKey,
    }),
  })

  export const firestore = app.firestore()
}
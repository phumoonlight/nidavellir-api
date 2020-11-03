import { RequestHandler } from 'express'

import { Firebase } from '../../firebase'
import { ResponseBuilder } from '../../shared/utils/response-builder.util'
import { ComicModel } from './comic.model'

const { firestore } = Firebase
const COLLECTION_NAME = 'comics'

const collectionRef = firestore.collection(COLLECTION_NAME)

// const snapshot = await collectionRef.get()
// const mappedDocs = snapshot.docs.map((doc) => ({
//   id: doc.id,
//   ...doc.data(),
// }))

const ERROR_PREFIX = '[controller][get][comic]'

export namespace ComicGetController {
  export const getAll: RequestHandler = async (req, res) => {
    try {
      const comicDocs = await ComicModel.find()
      res.status(200).json(comicDocs)
    } catch (error) {
      console.error(ERROR_PREFIX, error)
      res.status(200).json(ResponseBuilder.build500(error))
    }
  }

  export const getById: RequestHandler = async (req, res) => {
    const paramId = req.params.id
    try {
      const docRef = collectionRef.doc(paramId)
      const snapshot = await docRef.get()
      const response = snapshot.exists
        ? { id: snapshot.id, ...snapshot.data() }
        : null
      res.status(200).json(response)
    } catch (error) {
      console.error(error)
      const response = ResponseBuilder.build500(error)
      res.status(500).json(response)
    }
  }

  export const search: RequestHandler = async (req, res, next) => {
    const searchKey = req.query.search as string
    if (!searchKey) return next()
    try {
      console.log('search')
      const queryRef = collectionRef.orderBy('name').startAt(searchKey).endAt(searchKey)
      const snapshot = await queryRef.get()
      const mappedDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      res.status(200).json(mappedDocs)
    } catch (error) {
      console.error(error)
      const response = ResponseBuilder.build500(error)
      res.status(500).json(response)
    }
  }
}

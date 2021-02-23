import { Router } from 'express'
import validator from 'validator'

import { handle } from '../../core/request-handler'
import { validateParam, validateBody } from '../../core/request-validator'
import { Response } from '../../core/response'
import { StatusCode } from '../../enums/status-code.enum'
import {
  getComicList,
  getComicCount,
  getComicById,
  updateComic,
  isComicRefIdNotDuplicated,
} from '../../services/comic-service'

export const comicController = Router()

comicController.get(
  '/',
  handle(async (req) => {
    const page = (req.query.page as string) || '1'
    const docs = await getComicList(+page)
    const count = await getComicCount()
    return new Response(StatusCode.Ok, {
      docs,
      count,
    })
  })
)

comicController.get(
  '/:id',
  validateParam({
    name: 'id',
    validator: (value) => validator.isMongoId(value),
  }),
  handle(async (req) => {
    const mongoId = req.params.id
    const doc = await getComicById(mongoId)
    return new Response(StatusCode.Ok, doc)
  })
)

comicController.patch(
  '/:id',
  validateParam({
    name: 'id',
    validator: (value) => validator.isMongoId(value),
  }),
  validateBody({
    name: 'refId',
    isOptional: true,
    validator: async (value) => isComicRefIdNotDuplicated(value.refId),
  }),
  handle(async (req) => {
    const mongoId = req.params.id
    const { genre, refId, name, synopsis, thumbnail } = req.body
    const updatedDoc = await updateComic({
      id: mongoId,
      genre,
      refId,
      name,
      synopsis,
      thumbnail,
    })
    return new Response(StatusCode.Ok, updatedDoc)
  })
)

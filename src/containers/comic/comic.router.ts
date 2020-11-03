import { Router } from 'express'

import { ComicCreateController } from './comic-create.controller'
import { ComicGetController } from './comic-get.controller'
import { ComicUpdateController } from './comic-update.controller'

export namespace TagRouter {
  export const router = Router()

  router.get(
    '/',
    ComicGetController.getAll,
  )

  router.get(
    '/:id',
    ComicGetController.getById,
  )

  router.post(
    '/',
    ComicCreateController.create,
  )

  router.patch(
    '/:mongoId',
    ComicUpdateController.update,
  )

  // router.delete(
  //   '/:refId',
  //   TagDeleteValidator.checkHeader,
  //   TagDeleteController.deleteOneAndAllCollections,
  // )
}

import { Router } from 'express'

export namespace TagRouter {
  export const router = Router()

  router.get(
    '/',
  )

  // router.get(
  //   '/:refId',
  //   TagGetController.getOne,
  // )

  // router.post(
  //   '/',
  //   TagCreateValidator.checkBody,
  //   TagCreateValidator.checkDuplicatedRefId,
  //   TagCreateController.createOne,
  // )

  // router.patch(
  //   '/:refId',
  //   TagUpdateValidator.checkBody,
  //   TagUpdateController.updateOne,
  // )

  // router.delete(
  //   '/:refId',
  //   TagDeleteValidator.checkHeader,
  //   TagDeleteController.deleteOneAndAllCollections,
  // )
}

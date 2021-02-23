import { RequestHandler } from 'express'

import { ResponseStatusCode } from 'src/types/response'
import { ComicModel } from 'src/models/comic'
import { getInfoResponse, getInternalErrorResponse } from 'src/utils/response'

export const addEpisode: RequestHandler = async (req, res) => {
  const requiredMongoId = req.body.mongo_id
  const optionalEpisodeName = req.body.name
  const optionalThumbnail = req.body.thumbnail
  const optionalNote = req.body.note
  const requiredPages = req.body.pages
  try {
    const comicDoc = await ComicModel.findById(requiredMongoId)
    if (comicDoc) {
      comicDoc.episode.push({
        name: optionalEpisodeName,
        thumbnail: optionalThumbnail,
        note: optionalNote,
        pages: requiredPages,
      })
      const updatedComicDoc = await comicDoc.save()
      return res.status(200).json(updatedComicDoc)
    }
    res
      .status(ResponseStatusCode.UnprocessableEntity)
      .json(
        getInfoResponse(
          ResponseStatusCode.UnprocessableEntity,
          'comic not exist'
        )
      )
  } catch (error) {
    console.error(error)
    res
      .status(ResponseStatusCode.InternalServerError)
      .json(getInternalErrorResponse(error))
  }
}

export const increaseViewCount: RequestHandler = async (req, res) => {
  const requiredMongoId = req.body.mongo_id
  try {
    const comicDoc = await ComicModel.findById(requiredMongoId)
    if (comicDoc) {
      comicDoc.view_count += 1
      await comicDoc.save()
      return res.status(200).json({
        info: 'view count increased',
        total_view_count: comicDoc.view_count,
      })
    }
    res
      .status(ResponseStatusCode.UnprocessableEntity)
      .json(
        getInfoResponse(
          ResponseStatusCode.UnprocessableEntity,
          'comic not exist'
        )
      )
  } catch (error) {
    res
      .status(ResponseStatusCode.InternalServerError)
      .json(getInternalErrorResponse(error))
  }
}

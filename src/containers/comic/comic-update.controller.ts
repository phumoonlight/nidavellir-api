import { RequestHandler } from 'express'

import { ComicModel } from './comic.model'
import { ResponseBuilder } from '../../shared/utils/response-builder.util'

export namespace ComicUpdateController {
  export const update: RequestHandler = async (req, res) => {
    const paramMongoId = req.params.mongoId
    const requiredAuthorId = req.body.author_id
    const requiredName = req.body.name
    const optionalRefId = req.body.ref_id
    const optionalSynopsis = req.body.synopsis
    const optionalThumbnail = req.body.thumbnail
    const optionalGenre = req.body.genre
    const optionalFirstEpisodeName = req.body.first_episode_name
    const optionalFirstEpisodeThumbnail = req.body.first_episode_thumbnail
    try {
      const comicDoc = await ComicModel.findById(paramMongoId)
      if (comicDoc) {
        comicDoc.author_id = 'updated'
        comicDoc.episode.push({
          name: 'ep1',
        })
        const createdComic = await comicDoc.save()
        return res.status(200).json(createdComic)
      }
      res.status(404).json(ResponseBuilder.build404('comic not found'))
    } catch (error) {
      console.error(error)
      const response = ResponseBuilder.build500(error)
      res.status(500).json(response)
    }
  }
}

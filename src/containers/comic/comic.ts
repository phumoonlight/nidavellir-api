import { RequestHandler } from 'express'

// import { ComicDocument } from '../../shared/interfaces/comic-document.interface'
import { ComicModel } from 'src/models/comic'
import { getInfoResponse, getInternalErrorResponse } from 'src/utils/response'
import { ResponseStatusCode } from 'src/types/response'

// const DEFAULT_THUMBNAIL = 'https://media.discordapp.net/attachments/727116403512967203/772363203136192512/download.jpg'

const testComic = (params: { name: string; age: string }) => {
  console.log(params)
  return {
    statusCode: 200,
    response: {}
  }
}

export const testHandler: RequestHandler = async (req, res) => {
  const { response, statusCode } = testComic({
    age: '',
    name: '',
  })
  res.status(statusCode).json(response)
}

export const createComic: RequestHandler = async (req, res) => {
  const optionalRefId = req.body.ref_id
  const requiredAuthorId = req.body.author_id
  const requiredName = req.body.name
  const optionalSynopsis = req.body.synopsis
  const optionalThumbnail = req.body.thumbnail
  const optionalTags = req.body.tags
  const optionalIsCreateFirstEpisode = req.body.is_create_first_episode
  const optionalFirstEpisodeName = req.body.first_episode_name
  const optionalFirstEpisodeThumbnail = req.body.first_episode_thumbnail
  try {
    const newComic = new ComicModel({
      ref_id: optionalRefId,
      author_id: requiredAuthorId,
      name: requiredName,
      synopsis: optionalSynopsis,
      thumbnail: optionalThumbnail,
      tags: optionalTags,
    })
    if (optionalIsCreateFirstEpisode) {
      newComic.episode.push({
        name: optionalFirstEpisodeName,
        thumbnail: optionalFirstEpisodeThumbnail,
      })
    }
    const createdComic = await newComic.save()
    // const collectionRef = firestore.collection(COLLECTION_NAME)
    // const docRef = collectionRef.doc()
    // const data: ComicData = {
    //   author_id: requiredAuthorId,
    //   name: requiredName,
    //   synopsis: optionalSynopsis || '',
    //   thumbnail: optionalThumbnail || DEFAULT_THUMBNAIL,
    //   view_count: 0,
    //   is_completed: false,
    //   genre: optionalGenre || [],
    //   episode: [],
    //   followed_by: [],
    //   rated_by: [],
    // }
    // await docRef.set(data)
    res.status(ResponseStatusCode.Created).json(createdComic)
  } catch (error) {
    console.error(error)
    const response = getInfoResponse(
      ResponseStatusCode.InternalServerError,
      error
    )
    res.status(ResponseStatusCode.InternalServerError).json(response)
  }
}

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
    res.status(404).json(getInfoResponse(ResponseStatusCode.NotFound))
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json(getInfoResponse(ResponseStatusCode.InternalServerError))
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
      .status(404)
      .json(getInfoResponse(ResponseStatusCode.NotFound, 'comic not found'))
  } catch (error) {
    res
      .status(ResponseStatusCode.InternalServerError)
      .json(getInternalErrorResponse(error))
  }
}

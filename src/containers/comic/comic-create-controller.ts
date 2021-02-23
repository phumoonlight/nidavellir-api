import { RequestHandler } from 'express'

// import { ComicDocument } from '../../shared/interfaces/comic-document.interface'
import { ComicModel } from 'src/models/comic'
import { getInfoResponse } from 'src/utils/response'
import { ResponseStatusCode } from 'src/types/response'

// const DEFAULT_THUMBNAIL = 'https://media.discordapp.net/attachments/727116403512967203/772363203136192512/download.jpg'

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

import { RequestHandler } from 'express'

// import { ComicDocument } from '../../shared/interfaces/comic-document.interface'
import { ComicModel } from './comic.model'
// import { Firebase } from '../../firebase'
import { ResponseBuilder } from '../../shared/utils/response-builder.util'

// const DEFAULT_THUMBNAIL = 'https://media.discordapp.net/attachments/727116403512967203/772363203136192512/download.jpg'

export namespace ComicCreateController {
  export const create: RequestHandler = async (req, res) => {
    const optionalRefId = req.body.ref_id
    const requiredAuthorId = req.body.author_id
    const requiredName = req.body.name
    const optionalSynopsis = req.body.synopsis
    const optionalThumbnail = req.body.thumbnail
    const optionalGenre = req.body.genre
    const optionalFirstEpisodeName = req.body.first_episode_name
    const optionalFirstEpisodeThumbnail = req.body.first_episode_thumbnail
    try {
      const newComic = new ComicModel({
        ref_id: optionalRefId,
        author_id: requiredAuthorId,
        name: requiredName,
        synopsis: optionalSynopsis,
        thumbnail: optionalThumbnail,
        genre: optionalGenre,
        episode: [{
          name: optionalFirstEpisodeName,
          thumbnail: optionalFirstEpisodeThumbnail,
        }],
      })
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
      res.status(201).json(createdComic)
    } catch (error) {
      console.error(error)
      const response = ResponseBuilder.build500(error)
      res.status(500).json(response)
    }
  }
}

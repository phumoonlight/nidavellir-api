import { ComicModel } from '../models/comic.model'

interface FilterQuery {}

interface UpdateComicParams {
  id: string
  name?: string
  refId?: string
  synopsis?: string
  thumbnail?: string
  genre?: string
}

const LIMIT = 100

export const getComicList = async (
  page: number = 1,
  filterQuery: FilterQuery = {}
) => {
  const comicDocs = await ComicModel.find(filterQuery)
    .limit(LIMIT)
    .skip((page - 1) * LIMIT)
    .select(['-__v'])
  return comicDocs
}

export const getComicCount = async () => {
  const count = await ComicModel.find().estimatedDocumentCount()
  return count
}

export const getComic = async (filterQuery: FilterQuery = {}) => {
  const doc = await ComicModel.findOne(filterQuery)
  return doc
}

export const getComicById = async (id: string) => {
  const doc = await ComicModel.findById(id).select(['-__v'])
  return doc
}

export const createComic = async () => {
  const newComic = new ComicModel({
    author_id: 'test',
    name: 'requiredName',
    tags: 't',
  })
  const createdDocument = await newComic.save()
  return createdDocument
}

export const updateComic = async (params: UpdateComicParams) => {
  const doc = await ComicModel.findById(params.id)
  if (!doc) return null
  doc.name = params.name ?? doc.name
  doc.ref_id = params.refId ?? doc.ref_id
  doc.synopsis = params.synopsis ?? doc.synopsis
  doc.thumbnail = params.thumbnail ?? doc.thumbnail
  doc.genre = params.genre ?? doc.genre
  doc.increment()
  const updatedDoc = await doc.save()
  return updatedDoc
}

export const isComicRefIdNotDuplicated = async (refId: string) => {
  const doc = await ComicModel.findOne({
    ref_id: refId,
  })
  const isNotExist = !doc
  return isNotExist
}

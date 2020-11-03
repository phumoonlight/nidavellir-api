import mongoose, { Schema, SchemaOptions, SchemaDefinition } from 'mongoose'
import { v4 } from 'uuid'

import { ComicDocument } from '../../shared/interfaces/comic-document.interface'

const COLLECTION_NAME = 'comics'
const DEFAULT_THUMBNAIL = 'https://media.discordapp.net/attachments/727116403512967203/772363203136192512/download.jpg'
const episodeChildSchema = new Schema({
  name: {
    type: String,
    default: 'untitled',
  },
  thumbnail: {
    type: String,
    default: DEFAULT_THUMBNAIL,
  },
  liked_by: {
    type: [String],
  },
}, {
  _id: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
const comicSchemaDefinition: SchemaDefinition = {
  ref_id: {
    type: String,
    default: () => v4(),
    unique: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'untitled',
  },
  synopsis: {
    type: String,
    default: 'no synopsis',
  },
  banner: {
    type: String,
    default: DEFAULT_THUMBNAIL,
  },
  thumbnail: {
    type: String,
    default: DEFAULT_THUMBNAIL,
  },
  view_count: {
    type: Number,
    default: 0,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  genre: {
    type: [String],
  },
  rated_by: {
    type: [String],
  },
  followed_by: {
    type: [String],
  },
  episode: {
    type: [episodeChildSchema],
  },
}
const schemaOptions: SchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
}
const schema = new Schema(comicSchemaDefinition, schemaOptions)
export const ComicModel = mongoose.model<ComicDocument>(COLLECTION_NAME, schema)

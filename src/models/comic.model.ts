import mongoose, { Schema, SchemaOptions, SchemaDefinition } from 'mongoose'
import { v4 } from 'uuid'

import { ComicDocument } from '../types/comic-document'

const COLLECTION_NAME = 'comics'
const DEFAULT_THUMBNAIL =
  'https://media.discordapp.net/attachments/727116403512967203/772363203136192512/download.jpg'
const DEFAULT_NAME = 'untitled'
const DEFAULT_PLOT = ''

const schemaOptions: SchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
}

const episodeSchemaDefinition: SchemaDefinition = {
  name: {
    type: String,
    default: DEFAULT_NAME,
  },
  thumbnail: {
    type: String,
    default: DEFAULT_THUMBNAIL,
  },
  note: {
    type: String,
    default: '',
  },
  like_count: {
    type: Number,
    default: 0,
  },
  pages: [String],
}

const comicSchemaDefinition: SchemaDefinition = {
  ref_id: {
    type: String,
    default: () => v4(),
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: DEFAULT_NAME,
  },
  plot: {
    type: String,
    default: DEFAULT_PLOT,
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
  tags: [String],
  followers: [String],
  episode: [new Schema(episodeSchemaDefinition, schemaOptions)],
}

const comicSchema = new Schema(comicSchemaDefinition, schemaOptions)

export const ComicModel = mongoose.model<ComicDocument>(
  COLLECTION_NAME,
  comicSchema
)

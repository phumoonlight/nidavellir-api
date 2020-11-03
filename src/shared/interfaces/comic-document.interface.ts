/* eslint-disable camelcase */
import { Document } from 'mongoose'

interface Episode {
  name?: string
  thumbnail?: string
  liked_by?: string[]
}

interface Rate {
  user_id: string
  point: number
}

export interface ComicDocument extends Document {
  author_id: string
  name: string
  synopsis: string
  thumbnail: string
  view_count: number
  genre: string[]
  episode: Episode[]
  rated_by: Rate[]
  followed_by: string[]
  is_completed: boolean
}

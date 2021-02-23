/* eslint-disable camelcase */
import { Document } from 'mongoose'

interface Episode {
  name?: string
  thumbnail?: string
  note?: string
  pages?: string[],
  comments?: string[],
  liked_by?: string[]
}

interface Rate {
  user_id: string
  point: number
}

export interface ComicDocument extends Document {
  author_id: string
  name: string
  ref_id: string
  synopsis: string
  thumbnail: string
  view_count: number
  genre: string
  tags: string[]
  episode: Episode[]
  rated_by: Rate[]
  followed_by: string[]
  is_completed: boolean
}

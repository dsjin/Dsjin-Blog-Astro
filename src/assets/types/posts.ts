export type Post = {
  coverImage?: string
  tags: Tag[]
  slug: string
  title: string
  description: string
  author: Author
  datetime: number
  featured: boolean
}

export type Tag = {
  name: string
}

export type Author = {
  profileImage?: string
  name: string
}

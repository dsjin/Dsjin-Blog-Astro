export type Post = {
  coverImage?: string
  tags: string[]
  slug: string
  title: string
  description: string
  author: Author
  createdDate: Date
  featured: boolean
}

export type Author = {
  profileImage?: string
  name: string
}

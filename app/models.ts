export interface Article {
  id: number
  title: string
  subtitle?: string
  content?: string
  createTime?: string
  updateTime?: string
  tags?: Tag[]
  category?: Category
}

export interface Tag {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
}
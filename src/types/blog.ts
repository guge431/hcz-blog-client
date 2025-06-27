// types/blog.ts
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  category: string;
  readTime: number;
  views: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  title?: string; // 对应后端的search参数
}

export interface BlogFilters {
  page: number;
  limit: number;
  search: string;
  category: string;
  sortBy: string;
  sortOrder: string;
}
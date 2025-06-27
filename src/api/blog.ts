
import api from './axios';

export const getBlogAllList = () => api.get('/blog');
export const queryBlogTitle= (title:string) => api.get(`/blog/search`,{ params: { title }});
export const getItemDetail = (id:number) => api.get(`/blog/${id}`);
export const addBlogData = (blogData:any) => api.post(`/blog`,blogData);
export const updateBlog=(id:number,blogData:any) => api.patch(`/blog/${id}`,blogData);




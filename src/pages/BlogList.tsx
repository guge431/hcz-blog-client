import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../compoments/BlogCard';
import { getBlogAllList,queryBlogTitle } from '../api/blog'

const BlogList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [blogList, setBlogList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
   const searchQuery = searchParams.get('search') || '';

  //参数获取筛选条件
  const [filters, setFilters] = useState<any>({
    search: searchParams.get('search') || '',
  });

  const getInitList = async () => {
    setLoading(true)
    try {
      const res = await getBlogAllList()
      setBlogList(res.data)
    } catch (error) {
      console.log("error", error)
    }
    setLoading(false)
  }

  const getQueryBlogTitle = async (title:string) => {
    console.log(222222222,title)
     if (!title.trim()) {
      throw new Error('搜索标题不能为空');
    }
    setLoading(true)
    try {
      const res = await queryBlogTitle(title)
      console.log(24344)
      setBlogList(res.data || [])
    } catch (error) {
      console.log("error", error)
    }finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getInitList();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilters(searchQuery)
      getQueryBlogTitle(searchQuery);
    } else {
      getInitList();
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {'文章列表'}
        </h1>
        <p className="text-gray-600">
          共找到 {blogList.length} 篇文章
        </p>
      </div>
      {blogList.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {blogList.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {filters.search ? '没有找到匹配的文章' : '暂无文章'}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
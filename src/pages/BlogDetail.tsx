import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemDetail } from '../api/blog'

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [info, setInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const getBlogInfo = async () => {
    setLoading(true);
    try {
      const res = await getItemDetail(Number(id))
      setInfo(res.data)
    } catch (error) {
      console.error('获取文章详情失败:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogInfo();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="text-gray-500 text-lg mb-4">文章不存在</div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回
      </button>
      <article className="bg-white rounded-lg shadow-md p-8 mb-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {info.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span>作者: {info.author}</span>
            <span>发布时间: {info.createdAt}</span>
            <span>阅读时间: 约 {info.readTime} 分钟</span>
            <span>浏览次数: {info.views}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {info.tags.map((tag: any) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: info.content.replace(/\n/g, '<br>') }} />
        </div>

        <div>
          <img src="https://img0.baidu.com/it/u=3590274749,3325643690&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667" alt="" />
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
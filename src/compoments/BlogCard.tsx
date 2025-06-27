import React from 'react';
import { useNavigate } from 'react-router-dom';


const BlogCard: React.FC<any> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
          {new Date(post.createdAt).toLocaleDateString('zh-CN')}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>作者: {post.author}</span>
          <span>阅读时间: {post.readTime}分钟</span>
          <span>浏览: {post.views}次</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag:any) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

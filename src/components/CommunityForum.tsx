import React, { useState } from 'react';
import { INITIAL_FORUM_POSTS } from '../constants';
import { ForumPost } from '../types';
import { MessageSquare, Clock, Plus, Flame } from 'lucide-react';

export default function CommunityForum() {
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Question');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      author: 'Current User', // Mock current user
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      replies: 0,
      category: newCategory
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowForm(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Question': return 'bg-blue-100 text-blue-800';
      case 'Experience': return 'bg-green-100 text-green-800';
      case 'Advice': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Citizen Forum</h2>
          <p className="text-gray-600">Share experiences, ask questions, and support others navigating the legal system.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Create a New Post</h3>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value as ForumPost['category'])}
                className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Question">General Question</option>
                <option value="Experience">Share Experience</option>
                <option value="Advice">Seeking Advice</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., How to handle a property dispute?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea 
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Share the details here..."
              ></textarea>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Publish Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-start gap-4 shadow-sm">
            <div className="hidden sm:flex flex-col items-center bg-gray-50 rounded-lg p-3 min-w-[60px]">
              <Flame className="w-5 h-5 text-gray-400 mb-1" />
              <span className="font-medium text-gray-700 text-sm">{Math.floor(Math.random() * 20) + 1}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.content}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-xs font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{post.author}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm hover:text-orange-600 transition-colors">
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  {post.replies} Replies
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

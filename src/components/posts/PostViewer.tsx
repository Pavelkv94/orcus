import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchPostById, setCurrentPost, fetchPostsShort } from '@/store/slices/postsSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';

const PostViewer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentPost, postsShort, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id) as any);
    } else {
      dispatch(setCurrentPost(null));
      // If no ID, show list of posts
      if (postsShort.length === 0) {
        dispatch(fetchPostsShort() as any);
      }
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="mt-4"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (!currentPost && !id) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Welcome to Orcus Blog</h2>
          <p className="mb-6 text-lg text-gray-600">
            Select a category and article from the navigation menu to start reading.
          </p>
          {postsShort.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">Recent Posts</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {postsShort.slice(0, 6).map((post) => (
                  <div
                    key={post.id || post._id}
                    className="cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    onClick={() => navigate(`/post/${post.id || post._id}`)}
                  >
                    <h4 className="font-semibold text-gray-900">{post.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{post.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentPost && id) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-4xl">
            {currentPost.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-800 sm:px-3">
              {currentPost.category}
            </span>
            <time dateTime={currentPost.createdAt}>
              {formatDate(currentPost.createdAt)}
            </time>
          </div>
        </header>
        
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {currentPost.text}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default PostViewer;


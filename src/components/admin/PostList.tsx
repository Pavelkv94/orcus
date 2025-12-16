import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsShort, deletePost, fetchPostById } from '@/store/slices/postsSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PostEditor from './PostEditor';
import type { PostShort, Post } from '@/types';

const PostList = () => {
  const dispatch = useDispatch();
  const { postsShort, loading } = useSelector((state: RootState) => state.posts);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPostsShort() as any);
  }, [dispatch]);

  const handleDeleteClick = (postId: string) => {
    setDeletingPostId(postId);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPostId) return;

    try {
      await dispatch(deletePost(deletingPostId) as any).unwrap();
      setDeletingPostId(null);
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const handleEditClick = async (post: PostShort) => {
    // Fetch full post data
    try {
      const result = await dispatch(
        fetchPostById(post.id || post._id || '') as any
      ).unwrap();
      setEditingPost(result);
    } catch (err) {
      console.error('Failed to fetch post:', err);
    }
  };

  const handleEditSuccess = () => {
    setEditingPost(null);
    dispatch(fetchPostsShort() as any);
  };

  if (loading && postsShort.length === 0) {
    return <p className="text-gray-600">Loading posts...</p>;
  }

  if (editingPost) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Edit Post</h3>
          <Button variant="outline" onClick={handleEditSuccess}>
            Back to List
          </Button>
        </div>
        <PostEditor postToEdit={editingPost} onSuccess={handleEditSuccess} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Manage Posts</h3>
      
      {postsShort.length === 0 ? (
        <p className="text-gray-600">No posts yet. Create one to get started.</p>
      ) : (
        <div className="space-y-2">
          {postsShort.map((post: PostShort) => (
            <div
              key={post.id || post._id}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div className="flex-1">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-600">{post.category}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(post)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(post.id || post._id || '')}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!deletingPostId} onOpenChange={() => setDeletingPostId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingPostId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostList;


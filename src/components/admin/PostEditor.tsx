import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import { createPost, updatePost, clearError } from '@/store/slices/postsSlice';
import { fetchCategories } from '@/store/slices/categoriesSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Post } from '@/types';

interface PostEditorProps {
  postToEdit?: Post | null;
  onSuccess?: () => void;
}

const PostEditor = ({ postToEdit, onSuccess }: PostEditorProps) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);
  const { loading, error } = useSelector((state: RootState) => state.posts);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setText(postToEdit.text);
      setCategory(postToEdit.category);
    } else {
      setTitle('');
      setText('');
      setCategory('');
    }
  }, [postToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!title.trim() || !text.trim() || !category.trim()) {
      return;
    }

    try {
      if (postToEdit) {
        await dispatch(
          updatePost({
            id: postToEdit.id || postToEdit._id || '',
            data: { title, text, category },
          }) as any
        ).unwrap();
      } else {
        await dispatch(
          createPost({ title, text, category }) as any
        ).unwrap();
      }

      // Reset form
      setTitle('');
      setText('');
      setCategory('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Error is handled by Redux slice
      console.error('Failed to save post:', err);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="post-title">Title</Label>
          <Input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
            minLength={3}
            maxLength={200}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="post-category">Category</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start mt-1">
                {category || 'Select category'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-[300px] w-56 overflow-y-auto">
              {categories.map((cat) => (
                <DropdownMenuItem
                  key={cat.id || cat._id}
                  onClick={() => setCategory(cat.title)}
                >
                  {cat.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Content (Markdown)</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="md:hidden"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
          
          <div className="md:hidden">
            {showPreview ? (
              <div className="min-h-[400px] rounded-md border border-input bg-background p-4">
                <MDEditor.Markdown source={text} />
              </div>
            ) : (
              <MDEditor
                value={text}
                onChange={(value) => setText(value || '')}
                data-color-mode="light"
                height={400}
              />
            )}
          </div>
          
          <div className="hidden md:block">
            <MDEditor
              value={text}
              onChange={(value) => setText(value || '')}
              data-color-mode="light"
              height={500}
            />
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={loading || !title || !text || !category}>
            {loading ? 'Saving...' : postToEdit ? 'Update Post' : 'Create Post'}
          </Button>
          {postToEdit && onSuccess && (
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostEditor;


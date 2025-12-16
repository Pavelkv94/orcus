import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, clearError } from '@/store/slices/categoriesSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.categories);
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!title.trim()) {
      return;
    }

    try {
      await dispatch(createCategory({ title }) as any).unwrap();
      setTitle('');
    } catch (err) {
      // Error is handled by Redux slice
      console.error('Failed to create category:', err);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="category-title">Category Title</Label>
          <Input
            id="category-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter category title"
            required
            minLength={2}
            maxLength={100}
            className="mt-1"
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={loading || !title.trim()}>
          {loading ? 'Creating...' : 'Create Category'}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;


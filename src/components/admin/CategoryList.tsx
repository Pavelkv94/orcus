import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, updateCategory } from '@/store/slices/categoriesSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Category } from '@/types';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state: RootState) => state.categories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setEditTitle(category.title);
  };

  const handleSaveEdit = async () => {
    if (!editingCategory || !editTitle.trim()) {
      return;
    }

    try {
      await dispatch(
        updateCategory({
          id: editingCategory.id || editingCategory._id || '',
          data: { title: editTitle },
        }) as any
      ).unwrap();
      setEditingCategory(null);
      setEditTitle('');
    } catch (err) {
      console.error('Failed to update category:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditTitle('');
  };

  if (loading && categories.length === 0) {
    return <p className="text-gray-600">Loading categories...</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Manage Categories</h3>
      
      {categories.length === 0 ? (
        <p className="text-gray-600">No categories yet. Create one to get started.</p>
      ) : (
        <div className="space-y-2">
          {categories.map((category: Category) => (
            <div
              key={category.id || category._id}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <span className="font-medium">{category.title}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditClick(category)}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editingCategory} onOpenChange={handleCancelEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category title below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-category-title">Title</Label>
              <Input
                id="edit-category-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter category title"
                required
                minLength={2}
                maxLength={100}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editTitle.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryList;


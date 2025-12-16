import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostEditor from './PostEditor';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import PostList from './PostList';

const AdminPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Panel</h1>
      
      <Tabs defaultValue="create-post" className="w-full">
        <TabsList className="!h-auto min-h-10 grid w-full grid-cols-2 md:grid-cols-4 gap-1.5 p-1.5">
          <TabsTrigger value="create-post" className="text-xs sm:text-sm w-full">Create Post</TabsTrigger>
          <TabsTrigger value="create-category" className="text-xs sm:text-sm w-full">Create Category</TabsTrigger>
          <TabsTrigger value="manage-categories" className="text-xs sm:text-sm w-full">Manage Categories</TabsTrigger>
          <TabsTrigger value="manage-posts" className="text-xs sm:text-sm w-full">Manage Posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create-post" className="mt-6">
          <PostEditor />
        </TabsContent>
        
        <TabsContent value="create-category" className="mt-6">
          <CategoryForm />
        </TabsContent>
        
        <TabsContent value="manage-categories" className="mt-6">
          <CategoryList />
        </TabsContent>
        
        <TabsContent value="manage-posts" className="mt-6">
          <PostList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;


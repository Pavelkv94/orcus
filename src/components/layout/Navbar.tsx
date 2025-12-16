import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/slices/authSlice';
import { fetchCategories } from '@/store/slices/categoriesSlice';
import { fetchPostsShort, setCurrentPost } from '@/store/slices/postsSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu, LogOut, User } from 'lucide-react';
import type { Category, PostShort } from '@/types';

// Helper selector
const selectIsAdmin = (state: RootState) => {
  const roles = state.auth.user?.roles || [];
  return roles.includes('Admin');
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { postsShort } = useSelector((state: RootState) => state.posts);
  const isAdmin = useSelector(selectIsAdmin);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCategories() as any);
      dispatch(fetchPostsShort() as any);
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCategorySelect = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
  };

  const handlePostSelect = (post: PostShort) => {
    const postId = post.id || post._id;
    if (postId) {
      navigate(`/post/${postId}`);
    }
  };

  const filteredPosts = selectedCategory
    ? postsShort.filter((post) => post.category === selectedCategory)
    : [];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 
              className="text-xl font-bold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors"
              onClick={() => navigate('/')}
            >
              Orcus Blog
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="max-h-[300px] w-56 overflow-y-auto">
                  {categories.length === 0 ? (
                    <DropdownMenuItem disabled>No categories</DropdownMenuItem>
                  ) : (
                    categories.map((category: Category) => (
                      <DropdownMenuItem
                        key={category.id || category._id}
                        onClick={() => handleCategorySelect(category.title)}
                        className={selectedCategory === category.title ? 'bg-accent' : ''}
                      >
                        {category.title}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedCategory && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      Articles
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="max-h-[300px] w-56 overflow-y-auto">
                    {filteredPosts.length === 0 ? (
                      <DropdownMenuItem disabled>No articles in this category</DropdownMenuItem>
                    ) : (
                      filteredPosts.map((post: PostShort) => (
                        <DropdownMenuItem
                          key={post.id || post._id}
                          onClick={() => handlePostSelect(post)}
                        >
                          {post.title}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Right side - Admin, user info, and logout */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAdmin && (
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="hidden lg:flex"
              >
                Admin
              </Button>
            )}
            
            <div className="hidden sm:flex sm:items-center sm:gap-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">{user?.username}</span>
            </div>
            
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="gap-2"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 max-h-[80vh] overflow-y-auto">
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    Home
                  </DropdownMenuItem>
                  
                  {/* Categories Section */}
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    Categories
                  </div>
                  {categories.length === 0 ? (
                    <DropdownMenuItem disabled>No categories</DropdownMenuItem>
                  ) : (
                    categories.map((category: Category) => (
                      <DropdownMenuItem
                        key={category.id || category._id}
                        onClick={() => handleCategorySelect(category.title)}
                        className={selectedCategory === category.title ? 'bg-accent' : ''}
                      >
                        {category.title}
                      </DropdownMenuItem>
                    ))
                  )}
                  
                  {/* Articles Section */}
                  {selectedCategory && (
                    <>
                      <DropdownMenuSeparator />
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                        Articles ({selectedCategory})
                      </div>
                      {filteredPosts.length === 0 ? (
                        <DropdownMenuItem disabled>No articles in this category</DropdownMenuItem>
                      ) : (
                        filteredPosts.map((post: PostShort) => (
                          <DropdownMenuItem
                            key={post.id || post._id}
                            onClick={() => {
                              handlePostSelect(post);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {post.title}
                          </DropdownMenuItem>
                        ))
                      )}
                    </>
                  )}
                  
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        navigate('/admin');
                        setMobileMenuOpen(false);
                      }}>
                        Admin
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


import { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setSignUpModalOpen } from '@/store/slices/uiSlice';
import { authApi } from '@/api/auth';
import { RootState } from '@/store';

const SignUpModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.signUpModalOpen);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    if (username.length < 4 || username.length > 15) {
      setError('Username must be between 4 and 15 characters');
      return false;
    }
    if (password.length < 4 || password.length > 10) {
      setError('Password must be between 4 and 10 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await authApi.register({ username, password });
      setSuccess(true);
      setTimeout(() => {
        dispatch(setSignUpModalOpen(false));
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.errorsMessages?.[0]?.message || 
                          err.response?.data?.message || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => dispatch(setSignUpModalOpen(open))}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Enter your details to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="signup-username">Username</Label>
              <Input
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="4-15 characters"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="4-10 characters"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-confirm-password">Confirm Password</Label>
              <Input
                id="signup-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-3">
                <p className="text-sm text-green-800">Account created successfully!</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(setSignUpModalOpen(false))}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;


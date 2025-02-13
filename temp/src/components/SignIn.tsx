import { Button} from './ui/button';
import {Input } from './ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your authentication logic here
    navigate('/dashboard'); // Redirect to dashboard after successful login
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

import { Href } from 'expo-router';
import { Blocks, Home, User } from 'lucide-react';

type Route = {
  label: string;
  path: Href<string>;
  icon?: React.ReactNode;
  protected: boolean;
  hideAuthenticated?: boolean;
};

const ROUTES: Route[] = [
  { label: 'Home', path: '/', icon: <Home size={20} />, protected: false },
  {
    label: 'Categories',
    path: '/(pages)/categories',
    icon: <Blocks size={20} />,
    protected: false,
  },
  {
    label: 'Login',
    path: '/(pages)/login',
    icon: <User size={20} />,
    protected: false,
    hideAuthenticated: true,
  },
  {
    label: 'Register',
    path: '/(pages)/register',
    icon: <User size={20} />,
    protected: false,
    hideAuthenticated: true,
  },
];

export { Route, ROUTES };

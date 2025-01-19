import { Href } from 'expo-router';
import {
  Blocks,
  History,
  Home,
  KeyRound,
  Mail,
  Search,
  ShoppingCart,
  Signature,
} from 'lucide-react';

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
    label: 'Search',
    path: '/(pages)/search',
    icon: <Search size={20} />,
    protected: false,
  },
  {
    label: 'My Cart',
    path: '/(pages)/cart',
    icon: <ShoppingCart size={20} />,
    protected: true,
  },
  {
    label: 'Order History',
    path: '/(pages)/history',
    icon: <History size={20} />,
    protected: true,
  },
  {
    label: 'Contact Us',
    path: '/(pages)/contact',
    icon: <Mail size={20} />,
    protected: false,
  },
  {
    label: 'Login',
    path: '/(pages)/login',
    icon: <KeyRound size={20} />,
    protected: false,
    hideAuthenticated: true,
  },
  {
    label: 'Register',
    path: '/(pages)/register',
    icon: <Signature size={20} />,
    protected: false,
    hideAuthenticated: true,
  },
];

export { Route, ROUTES };

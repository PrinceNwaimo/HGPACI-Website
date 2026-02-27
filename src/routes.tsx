import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServiceTimesPage from './pages/ServiceTimesPage';
import MinistriesPage from './pages/MinistriesPage';
import EventsPage from './pages/EventsPage';
import SermonsPage from './pages/SermonsPage';
import ContactPage from './pages/ContactPage';
import GivePage from './pages/GivePage';
import UploadSermonPage from './pages/UploadSermonPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageSermonsPage from './pages/ManageSermonsPage';
import ManageUsersPage from './pages/ManageUsersPage';
import MembershipFormPage from './pages/MembershipFormPage';
import ManageMembershipPage from './pages/ManageMembershipPage';
import PastorsMessagePage from './pages/PastorsMessagePage';
import ManageContactPage from './pages/ManageContactPage';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;   // For navbar display
  admin?: boolean;     // For route protection
}

const routes: RouteConfig[] = [
  // =========================
  // Public Routes
  // =========================
  {
    name: 'Home',
    path: '/',
    element: <HomePage />,
    visible: true
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />,
    visible: true
  },
  {
    name: 'Service Times',
    path: '/service-times',
    element: <ServiceTimesPage />,
    visible: true
  },
  {
    name: 'Ministries',
    path: '/ministries',
    element: <MinistriesPage />,
    visible: true
  },
  {
    name: 'Events',
    path: '/events',
    element: <EventsPage />,
    visible: true
  },
  {
    name: 'Pastors message',
    path: '/pastors-message',
    element: <PastorsMessagePage />,
    visible: true
  },
  {
    name: 'Sermons',
    path: '/sermons',
    element: <SermonsPage />,
    visible: true
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />,
    visible: true
  },
    {
    name: 'Membership',
    path: '/membership',
    element: <MembershipFormPage />,
    visible: true
  },

  // =========================
  // Semi-Public / Hidden
  // =========================
  {
    name: 'Give',
    path: '/give',
    element: <GivePage />,
    visible: false
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false
  },

  // =========================
  // Admin Protected Routes
  // =========================
  {
    name: 'Upload Sermon',
    path: '/upload-sermon',
    element: <UploadSermonPage />,
    visible: false,
    admin: true
  },
  {
    name: 'Admin Dashboard',
    path: '/admin',
    element: <AdminDashboardPage />,
    visible: false,
    admin: true
  },
  {
    name: 'Manage Sermons',
    path: '/admin/sermons',
    element: <ManageSermonsPage />,
    visible: false,
    admin: true
  },
  {
    name: 'Manage Users',
    path: '/admin/users',
    element: <ManageUsersPage />,
    visible: false,
    admin: true
  },
  {
    name: 'Manage Membership',
    path: '/admin/membership',
    element: <ManageMembershipPage />,
    visible: false,
    admin: true
  },
   {
    name: 'Manage Contact',
    path: '/admin/contact',
    element: <ManageContactPage />,
    visible: false
  }
];

export default routes;

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServiceTimesPage from './pages/ServiceTimesPage';
import MinistriesPage from './pages/MinistriesPage';
import EventsPage from './pages/EventsPage';
import SermonsPage from './pages/SermonsPage';
import ContactPage from './pages/ContactPage';
import GivePage from './pages/GivePage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />
  },
  {
    name: 'Service Times',
    path: '/service-times',
    element: <ServiceTimesPage />
  },
  {
    name: 'Ministries',
    path: '/ministries',
    element: <MinistriesPage />
  },
  {
    name: 'Events',
    path: '/events',
    element: <EventsPage />
  },
  {
    name: 'Sermons',
    path: '/sermons',
    element: <SermonsPage />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />
  },
  {
    name: 'Give',
    path: '/give',
    element: <GivePage />,
    visible: false
  }
];

export default routes;

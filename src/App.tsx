import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load components for better performance
const Services = React.lazy(() => import('./components/Services'));
const Pricing = React.lazy(() => import('./components/Pricing'));
const UserSearch = React.lazy(() => import('./components/UserSearch'));
const ContactForm = React.lazy(() => import('./components/ContactForm'));

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <Services />
        <Pricing />
        <UserSearch />
        <ContactForm />
      </Suspense>
    </div>
  );
}

export default App;
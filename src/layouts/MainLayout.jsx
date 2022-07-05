import { Outlet } from 'react-router-dom';
// components
import Footer from '../components/footer';
import Header from '../components/header';
import ScrollUp from '../components/scroll-to-top';
import ScrollIndicator from '../components/scroll-indicator';

// ----------------------------------------------------------------------

const MainLayout = () => {
  return (
    <div style={{ backgroundColor: '#262626' }}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="relative min-h-screen">
          <ScrollIndicator />
          <Header />
          <Outlet />
          <ScrollUp />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

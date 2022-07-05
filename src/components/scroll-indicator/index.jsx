import React, { useRef, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function ScrollIndicator() {
  const scrollIndicatorRef = useRef();

  useEffect(() => {
    const handleScrollIndicator = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollIndicatorRef.current.style.width = `${scrolled}%`;
    };
    window.addEventListener('scroll', handleScrollIndicator);
    return () => {
      window.removeEventListener('scroll', handleScrollIndicator);
    };
  }, []);

  return (
    <div
      ref={scrollIndicatorRef}
      className="mx-auto fixed top-0 h-0.5 mt-812:h-1 bg-red-600 z-50"
      style={{ width: '0%' }}
    ></div>
  );
};

import { useRef, useEffect } from 'react';

const handleScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

const ScrollUp = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const visibleScrollUp = () => {
            if (
                document.body.scrollTop > 300 ||
                document.documentElement.scrollTop > 300
            ) {
                scrollRef.current.classList.remove('hidden');
                scrollRef.current.classList.add('inline-block');
            } else {
                scrollRef.current.classList.remove('inline-block');
                scrollRef.current.classList.add('hidden');
            }
        };
        window.addEventListener('scroll', visibleScrollUp);
        return () => {
            window.removeEventListener('scroll', visibleScrollUp);
        };
    }, []);
    return (
        <div
            ref={scrollRef}
            className="bg-penetration-8 p-2 rounded shadow-lg hidden fixed bottom-16 right-5 z-30"
            onClick={handleScrollToTop}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-gray-300 duration-150 hover:text-gray-500 cursor-pointer"
            >
                <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
            </svg>
        </div>
    );
};

export { ScrollUp };

export default handleScrollToTop;

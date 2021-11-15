import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../logo';

const nav = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Movies',
        path: '/movies',
    },
    {
        name: 'TV Shows',
        path: '/tv-shows',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const mobileRef = useRef(null);

    useEffect(() => {
        const fixedHeader = () => {
            if (
                document.body.scrollTop > 64 ||
                document.documentElement.scrollTop > 64
            ) {
                headerRef.current.classList.add('bg-penetration-8');
            } else {
                headerRef.current.classList.remove('bg-penetration-8');
            }
        };
        window.addEventListener('scroll', fixedHeader);
        return () => {
            window.removeEventListener('scroll', fixedHeader);
        };
    }, []);

    const handleMobile = () => {
        mobileRef.current.classList.toggle('-translate-y-full');
    };

    return (
        <div
            ref={headerRef}
            className="h-16 px-3 mt-568:px-10 max-w-screen-2xl w-screen fixed top-0 z-30 duration-300"
        >
            <div className="flex items-center justify-between">
                <Logo height="h-10" />
                <div
                    ref={mobileRef}
                    className="header__moblie transform -translate-y-full mt-568:translate-y-0 duration-300 mt-568:bg-transparent mt-568:pt-0"
                >
                    <ul className="text-gray-300 font-semibold uppercase space-y-3 mt-568:space-y-0 mt-568:space-x-10 mt-3">
                        {nav.map((item, i) => (
                            <li key={i} className="block mt-568:inline">
                                <Link
                                    onClick={handleMobile}
                                    to={item.path}
                                    className={`${
                                        pathname === item.path
                                            ? 'text-red-600'
                                            : 'hover:text-red-600'
                                    } duration-300`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div
                        onClick={handleMobile}
                        className="cursor-pointer text-gray-300 hover:text-red-600 duration-200 block mt-568:hidden absolute top-2 right-2"
                    >
                        <svg
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                        </svg>
                    </div>
                </div>

                <div
                    onClick={handleMobile}
                    className="cursor-pointer text-gray-300 hover:text-red-600 duration-200 inline mt-568:hidden mt-2 -mr-1"
                >
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        className="fill-current"
                    >
                        <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Header;

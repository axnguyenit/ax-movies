import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo-ax.png';

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

const Header = (props) => {
    const location = useLocation();
    const headerRef = useRef(null);

    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 64 ||
                document.documentElement.scrollTop > 64
            ) {
                headerRef.current.classList.add('bg-penetration-5');
            } else {
                headerRef.current.classList.remove('bg-penetration-5');
            }
        };
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);
    // style={{ backgroundColor: "rgba(20, 20, 20, .7)" }}
    return (
        <div
            ref={headerRef}
            className="h-16 px-10 max-w-screen-2xl w-screen fixed top-0 z-30 duration-300"
        >
            <div className="flex items-center justify-between">
                <div className="">
                    <img src={logo} className="h-10 mt-3" alt="" />
                </div>

                <div>
                    <ul className="text-gray-300 font-semibold uppercase space-x-10 mt-3">
                        {nav.map((item, i) => (
                            <li key={i} className="inline">
                                <Link
                                    to={item.path}
                                    className={`${
                                        location.pathname === item.path
                                            ? 'text-red-600'
                                            : 'hover:text-red-600'
                                    } duration-300`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;

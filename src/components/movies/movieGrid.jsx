import React, { useState, useEffect } from 'react';
import tmdbApi, { movieType, tvType, category } from '../../api/tmdbApi';
import MovieItem from '../../components/movies/movieItem';

const MovieGrid = (props) => {
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {
                        params,
                    });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {
                        params,
                    });
            }
            setItems(response.results);
            setItems2(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
        setSearchTerm('');
    }, [props.category]);

    const loadMore = async () => {
        let response = null;
        const params = {
            page: page + 1,
        };
        switch (props.category) {
            case category.movie:
                response = await tmdbApi.getMoviesList(movieType.upcoming, {
                    params,
                });
                break;
            default:
                response = await tmdbApi.getTvList(tvType.popular, { params });
        }
        setItems([...items, ...response.results]);
        setItems2([...items2, ...response.results]);
        setPage(page + 1);
    };

    const search = async (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        if (value) {
            const params = {
                query: value,
            };
            let response = await tmdbApi.search(props.category, { params });
            setItems(response.results);
        } else {
            setItems(items2);
        }
    };

    return (
        <div className="w-full mt-812:w-11/12 mx-auto">
            <div class="flex justify-end mr-3 mb-3 text-gray-500 pl-3">
                <div className="relative w-full mt-568:w-1/2 mt-812:w-1/3 mt-1024:w-1/4">
                    <input
                        type="text"
                        class="p-2 pl-8 w-full border border-gray-300 bg-gray-300 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={search}
                    />
                    <svg
                        className="w-4 h-4 absolute left-2.5 top-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>
            <div className="grid grid-cols-1 mt-568:grid-cols-2 mt-812:grid-cols-3 mt-1280:grid-cols-4 gap-0 min-h-screen">
                {items &&
                    items.map((item, i) => (
                        <MovieItem
                            key={i}
                            item={item}
                            category={props.category}
                        />
                    ))}
            </div>

            {page < totalPage && (
                <div className="flex justify-center mt-3 mb-10">
                    <button
                        onClick={loadMore}
                        className="flex items-center justify-center font-semibold tracking-wider capitalize text-sm space-x-1 text-gray-300 hover:text-gray-400 duration-200 group"
                    >
                        <span className="pt-0.5">Load more</span>
                        <svg
                            width="20"
                            height="20"
                            className="ml-0 transform duration-200 group-hover:translate-x-1.5"
                            viewBox="0 0 24 24"
                            style={{ fill: '#D1D5DB' }}
                        >
                            <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieGrid;

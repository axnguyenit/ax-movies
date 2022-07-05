import React, { useState, useEffect } from 'react';
import MovieItem from './MovieItem';
import Preloader from '../../components/preloader';
// api
import { tmdbApi, movieType, tvType, category } from '../../api';
import { useDebounce } from '../../hooks';

// ----------------------------------------------------------------------

export default function MovieGrid({ category: _category }) {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [preloader, setPreloader] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    const getList = async () => {
      setPreloader(true);
      let response = null;
      const params = {};
      try {
        switch (_category) {
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
      } catch (error) {}
      setItems(response.results);
      setItems2(response.results);
      setTotalPage(response.total_pages);
      setPreloader(false);
    };
    getList();
    setSearchTerm('');
  }, [_category]);

  const handleLoadMore = async () => {
    setPreloader(true);
    let response = null;
    const params = {
      page: page + 1,
    };
    try {
      switch (_category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } catch (error) {}
    setItems([...items, ...response.results]);
    setItems2([...items2, ...response.results]);
    setPage(page + 1);
    setPreloader(false);
  };

  useEffect(
    () => {
      (async () => {
        if (!debouncedSearchTerm) return setItems(items2);

        setPreloader(true);
        try {
          const params = {
            query: debouncedSearchTerm,
          };
          const { results } = await tmdbApi.search(_category, { params });
          setItems(results);
        } catch (error) {}

        setPreloader(false);
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm]
  );

  if (preloader) return <Preloader />;

  return (
    <div className="w-full mt-812:w-11/12 mx-auto">
      <div className="flex justify-end mr-3 mb-3 text-gray-500 pl-3">
        <div className="relative w-full mt-568:w-1/2 mt-812:w-1/3 mt-1024:w-1/4">
          <input
            type="text"
            className="p-2 pl-8 w-full border border-gray-300 bg-gray-300 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded overflow-hidden"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div
        id="movie__grid"
        className="grid grid-cols-1 mt-568:grid-cols-2 mt-812:grid-cols-3 mt-1280:grid-cols-4 mt-1700:grid-cols-5 gap-0 min-h-full"
        style={
          {
            // minHeight: 'calc(100vh - 1200px)'
          }
        }
      >
        {items.length > 0 &&
          items.map((item, i) => <MovieItem key={i} item={item} category={_category} />)}
      </div>

      {page < totalPage && items && (
        <div className="flex justify-center mt-3 mb-10">
          <button
            onClick={handleLoadMore}
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
}

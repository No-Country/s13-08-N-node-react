/* eslint-disable */

import { useState } from 'react';
function SearchMap({ setResults }) {
  const [input, setInput] = useState('');
  const fetchData = (value) => {
    fetch('https://points-dev-jeqd.3.us-1.fl0.io/recycling-center/points')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((point) => {
          return value && point && point.nombre && point.nombre.toLowerCase().includes(value);
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <form className="w-9/12 sm:w-4/12 mx-auto">
      <div className="flex">
        <button
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg "
          type="button"
        >
          <svg width="16px" height="16px" viewBox="0 0 0.96 0.96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.16 0.2h0.24m0 0a0.08 0.08 0 1 0 0.16 0m-0.16 0a0.08 0.08 0 1 1 0.16 0m0 0h0.24M0.16 0.48h0.48m0 0a0.08 0.08 0 1 0 0.16 0 0.08 0.08 0 0 0 -0.16 0Zm-0.32 0.28h0.48M0.32 0.76a0.08 0.08 0 1 0 -0.16 0 0.08 0.08 0 0 0 0.16 0Z"
              stroke="#000000"
              strokeWidth="0.06"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500  "
            placeholder="Busqueda..."
            onChange={(e) => handleChange(e.target.value)}
            value={input}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-white rounded-e-lg border  hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Busqueda</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchMap;

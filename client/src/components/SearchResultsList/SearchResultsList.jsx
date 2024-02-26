/* eslint-disable */

import { SearchResult } from '../SearchResult/SearchResult';
import React, { useRef, useEffect } from 'react';

export const SearchResultsList = ({ results, setResults }) => {
  const resultsListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsListRef.current && !resultsListRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setResults]);

  return (
    <div
      ref={resultsListRef}
      className="w-3/4 sm:w-2/4 bg-white text-black flex flex-col shadow-md rounded-lg mt-2 overflow-y-auto"
      style={{ maxHeight: '20rem' }}
    >
      {results.map((result, id) => {
        return <SearchResult result={result.nombre} results={results} key={id} />;
      })}
    </div>
  );
};

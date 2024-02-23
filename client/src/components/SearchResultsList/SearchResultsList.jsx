/* eslint-disable */

import { SearchResult } from '../SearchResult/SearchResult';

export const SearchResultsList = ({ results }) => {
  return (
    <div className="w-3/4 sm:w-1/4 bg-white text-black flex flex-col shadow-md rounded-lg mt-2 max-h-content overflow-y-auto">
      {results.map((result, id) => {
        return <SearchResult result={result.nombre} results={results} key={id} />;
      })}
    </div>
  );
};

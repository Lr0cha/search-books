import { useState } from "react";
import { BsSearch } from "react-icons/bs";
const Search = () => {
  interface Book {
    title: string;
    author_name?: string[];
    cover_i?: number;
  }

  const [query, setQuery] = useState<string>("");

  return (
    <div className="flex items-center justify-center w-full px-4">
      <form className="w-full max-w-lg flex items-center gap-2 p-4 bg-white rounded shadow-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome de um livro..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          <BsSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;

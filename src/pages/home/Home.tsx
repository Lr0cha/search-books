import { useState } from "react";
import Search from "../../components/home/Search";
import ViewBooks from "../../components/home/ViewBooks";

const Home = () => {
  interface Book {
    title: string;
    cover_i?: number;
    key: string; // ID único do livro
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const COUNT: number = 10;
  const [offset, setOffset] = useState<number>(0);

  function filteredBooks(data: any) {
    return data.docs.map((book: any) => ({
      title: book.title,
      cover_i: book.cover_i,
      key: book.key,
    }));
  }

  function handleSearch(query: string) {
    if (!query) return;
    setSearch(query);
    setOffset(0); // Resetando offset ao procurar no input
    getData(query, 0); // Passando 0 como offset inicial
  }

  const BASE_URL = "https://openlibrary.org";

  const getData = async (query: string, offset: number) => {
    setError(null); // Limpa erro anterior
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/search.json?q=${query}&limit=${COUNT}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Falha ao recuperar os dados");
      }

      const data = await response.json();

      setBooks(filteredBooks(data));
      setLoading(false);
    } catch (error) {
      setError("Erro ao buscar os livros");
    }
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - COUNT);
      getData(search, offset - COUNT);
    }
  };

  const handleNext = () => {
    if (offset < 20) {
      setOffset(offset + COUNT);
      getData(search, offset + COUNT);
    }
  };

  return (
    <div className="min-h-screen p-2 gap-3">
      <Search handleSearchFunc={handleSearch} />

      {error && <div className="error">{error}</div>}
      <ViewBooks books={books} loading={loading} />

      {books.length > 0 && (
        <div className="flex justify-between w-1/2 m-auto text-center p-5">
          <button
            onClick={handlePrevious}
            disabled={offset === 0}
            className={`px-4 py-2 text-white font-semibold rounded-lg transition-all duration-300 ${
              offset === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            disabled={offset >= 20 || books.length < COUNT}
            className={`px-4 py-2 text-white font-semibold rounded-lg transition-all duration-300 ${
              offset >= 20 || books.length < COUNT
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

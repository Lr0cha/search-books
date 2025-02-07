import { useState } from "react";
import Search from "../../components/home/Search";

const Home = () => {
  interface Book {
    title: string;
    cover_i?: number;
    key: string; // ID único do livro
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleSearch(query: string) {
    if (!query) return;
    getData(query);
  }

  const BASE_URL = "https://openlibrary.org";

  const getData = async (query: string) => {
    setError(null); // Limpa erro anterior

    try {
      const response = await fetch(
        `${BASE_URL}/search.json?q=${query}&limit=1`
      );

      if (!response.ok) {
        throw new Error("Falha ao recuperar os dados");
      }

      const data = await response.json();

      const filteredBooks = data.docs.map((book: any) => ({
        title: book.title,
        cover_i: book.cover_i,
        key: book.key,
      }));

      setBooks(filteredBooks);
      console.log(filteredBooks);
    } catch (error) {
      setError("Erro ao buscar os livros");
    }
  };

  return (
    <div className="min-h-screen p-2">
      <Search handleSearchFunc={handleSearch} />

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Home;

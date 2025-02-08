import { Link } from "react-router-dom";
import { Book } from "../../pages/home/Home";

interface ViewBooksProps {
  books: Book[];
  loading: Boolean;
}

const ViewBooks = ({ books, loading }: ViewBooksProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-6">
        {books.length > 0 &&
          books.map((book) => (
            <div
              key={book.key}
              className="flex flex-col items-center bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out max-w-xs"
            >
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-lg shadow-md"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <p className="text-gray-600">Capa não encontrada</p>
                </div>
              )}

              <div className="p-4">
                <Link to={`/detail${book.key}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-all duration-300">
                    {book.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {books.length === 0 && !loading && (
        <div className="flex justify-center h-screen border-4 border-blue-300 bg-white p-6 rounded-lg">
          <p className="text-center text-gray-600 sm:text-lg md:text-xl lg:text-3xl font-semibold">
            Nenhum livro encontrado no momento...
          </p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center h-screen border-4 border-blue-300 bg-white p-6 rounded-lg">
          <p className="text-center text-gray-600 sm:text-lg md:text-xl lg:text-3xl font-semibold">
            Carregando ...
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewBooks;

interface Book {
  title: string;
  author_name?: string[];
  cover_i?: number;
  key: string;
}

interface ViewBooksProps {
  books: Book[];
  loading: Boolean;
}

const ViewBooks = ({ books, loading }: ViewBooksProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {books.length > 0 &&
          books.map((book) => (
            <div
              key={book.key}
              className="flex flex-col items-center bg-blue-50 rounded-lg shadow-lg overflow-hidden p-6 transform hover:scale-105 transition-all duration-300"
            >
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-md shadow-md"
                />
              )}

              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-blue-900 hover:text-blue-700 transition-all">
                  {book.title}
                </h3>
                {book.author_name && (
                  <p className="mt-2 text-sm text-blue-700">
                    {book.author_name.join(", ")}
                  </p>
                )}
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

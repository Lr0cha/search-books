import { Author, BookDetail } from "../../pages/detail/Detail";

interface BookDetailsProps {
  book: BookDetail | null;
  author: Author | null;
}

const ViewBookDetails = ({ book, author }: BookDetailsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {book?.covers && book.covers[0] ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={book.title}
          className="w-64 h-auto object-cover rounded-lg shadow-md"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">
          <p className="text-gray-600">Capa não encontrada</p>
        </div>
      )}
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold text-gray-900">{book?.title}</h2>

        {author ? (
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Autor: {author.name}
          </p>
        ) : (
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Autor desconhecido
          </p>
        )}

        {book?.description ? (
          <p className="mt-4 text-sm text-gray-600">{book.description}</p>
        ) : (
          <p className="mt-4 text-md text-gray-600">Sinopse não encontrada</p>
        )}
      </div>
    </div>
  );
};

export default ViewBookDetails;

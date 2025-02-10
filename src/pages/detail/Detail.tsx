import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewBookDetails from "../../components/detail/ViewBookDetails";

export interface Author {
  name: string;
}

export interface BookDetail {
  title: string;
  desc?: string;
  covers: number[];
  authors: { author: { key: string } }[];
}

const Detail = () => {
  const { key } = useParams<{ key: string }>();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [author, setAuthor] = useState<Author | null>(null); // Novo estado para o autor
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const findAuthor = async (data: any) => {
    const authorResponse = await fetch(
      `https://openlibrary.org${data.authors[0].author.key}.json`
    );
    if (authorResponse.ok) {
      const authorData = await authorResponse.json();
      if (data.authors.length > 1) {
        setAuthor({ name: `${authorData.name} ...` });
      } else {
        setAuthor({ name: authorData.name });
      }
    }
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      let desc: string = "";
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${key}.json`
        );
        if (!response.ok) throw new Error("Erro ao buscar detalhes do livro.");

        const data = await response.json();

        if (data.description) {
          if (typeof data.description === "string") {
            desc = data.description;
          } else if (data.description.value) {
            desc = data.description.value;
          }
        }
        setBook({
          ...data,
          desc,
        });

        if (data.authors && data.authors.length > 0) {
          findAuthor(data);
        }
      } catch (error) {
        setError("Erro ao buscar os detalhes do livro.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchBookDetails();
  }, [key]);

  if (loading)
    return (
      <div className="text-center text-gray-700 text-4xl mt-10">
        Carregando...
      </div>
    );

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ViewBookDetails book={book} author={author} />
    </div>
  );
};

export default Detail;

import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="m-4 text-center p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-3xl font-semibold text-gray-700">
          Página não encontrada
        </h1>
        <p className="text-gray-500 mt-2">
          Desculpe, mas a página que você procurou não existe.
        </p>
        <Link to="/">
          <p className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none">
            Voltar para a página inicial
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

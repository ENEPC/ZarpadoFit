import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Zarpado Fit
      </Link>
      <nav className="space-x-4">
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
          Perfil
        </Link>
        <Link to="/upload" className="text-gray-700 hover:text-blue-600">
          Subir Foto
        </Link>
        <Link
          to="/virtual-try-on"
          className="text-gray-700 hover:text-blue-600"
        >
          Probar Ropa
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Salir
        </Link>
      </nav>
    </header>
  );
};

export default Header;

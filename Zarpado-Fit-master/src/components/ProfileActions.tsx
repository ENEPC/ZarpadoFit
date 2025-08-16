import { Link } from "react-router-dom";
import { 
  HiOutlineStar, 
  HiOutlinePhotograph, 
  HiOutlineQuestionMarkCircle, 
  HiOutlineLogout 
} from "react-icons/hi";

// Función de ejemplo para cerrar sesión.
const handleLogout = () => {
  console.log("Cerrando sesión...");
  // Aquí iría tu lógica real para limpiar tokens, redirigir, etc.
};

export const ProfileActions = () => {
  const menuLinks = [
    { to: "/favoritos", icon: <HiOutlineStar className="text-xl"/>, label: "Favoritos" },
    { to: "/fotos-subidas", icon: <HiOutlinePhotograph className="text-xl"/>, label: "Fotos subidas" },
    { to: "/faq", icon: <HiOutlineQuestionMarkCircle className="text-xl"/>, label: "Preguntas frecuentes" },
  ];

  return (
    <nav className="flex flex-col gap-2 w-full md:w-72 bg-slate-800/50 p-4 rounded-lg">
      {menuLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="flex items-center gap-4 p-3 rounded-lg text-md font-semibold text-gray-200 hover:bg-slate-700/60 transition-colors duration-300"
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 p-3 rounded-lg text-md font-semibold text-red-400 hover:bg-slate-700/60 transition-colors duration-300 mt-4"
      >
        <HiOutlineLogout className="text-xl" />
        <span>Cerrar sesión</span>
      </button>
    </nav>
  );
};




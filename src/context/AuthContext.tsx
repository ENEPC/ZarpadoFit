// --- ÚNICO CAMBIO AQUÍ: Añadimos la palabra 'type' antes de ReactNode ---
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// (Opcional, pero buena práctica) Define un tipo más específico para tu usuario si lo tienes
type Usuario = { nombre: string; [key: string]: any } | null;

interface AuthContextType {
  usuario: Usuario;
  actualizarUsuario: (u: Usuario) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>(null);

  // Se ejecuta solo una vez al cargar la app para recuperar la sesión
  useEffect(() => {
    const userJSON = localStorage.getItem("usuarioActivo");
    if (userJSON) {
      try {
        setUsuario(JSON.parse(userJSON));
      } catch (error) {
        console.error("Error al leer el usuario de localStorage:", error);
        // Si el dato está corrupto, lo limpiamos
        localStorage.removeItem("usuarioActivo");
      }
    }
  }, []); // El array vacío asegura que se ejecute solo al inicio

  // Esta función se encargará de actualizar el estado Y el localStorage
  const actualizarUsuario = (nuevoUsuario: Usuario) => {
    // 1. Actualiza el estado de React para que la UI reaccione
    setUsuario(nuevoUsuario);

    if (nuevoUsuario) {
      // 2. Si es un inicio de sesión, guarda el usuario en localStorage
      localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
    } else {
      // 3. Si es un cierre de sesión (usuario es null), borra el dato
      localStorage.removeItem("usuarioActivo");
    }
  };

  return (
    // Pasamos la nueva función al contexto para que la usen los demás componentes
    <AuthContext.Provider value={{ usuario, actualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// El hook ahora devuelve la función correcta
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return context;
};

import { useNavigate } from "react-router-dom";

const faqs = [
  {
    pregunta: "¿Cómo funciona el Probador Virtual Inteligente?",
    respuesta:
      "Subís una foto tuya, elegís una prenda del catálogo o subís una imagen, y nuestro sistema te muestra cómo te quedaría puesta.",
  },
  {
    pregunta: "¿Necesito una foto profesional para usar el probador?",
    respuesta:
      "No. Podés usar una foto sacada con tu celular. Sólo asegurate de que sea una imagen clara y de cuerpo completo.",
  },
  {
    pregunta: "¿Mis fotos quedan guardadas?",
    respuesta:
      "No, respetamos tu privacidad. Las fotos se usan solo durante tu sesión y no se almacenan en nuestros servidores.",
  },
  {
    pregunta: "¿Tiene algún costo usar el probador?",
    respuesta:
      "No, el uso del Probador Virtual Inteligente es totalmente gratuito.",
  },
  {
    pregunta: "¿Qué pasa si no estoy conforme con la recomendación?",
    respuesta:
      "Podés seguir explorando el catálogo a tu ritmo o ajustar tus preferencias para recibir sugerencias más personalizadas.",
  },
];

const Faq = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white font-poppins px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Botón volver */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/settings")}
            className="text-purple-300 hover:text-cyan-400 transition-colors text-lg"
          >
            ← Volver a ajustes
          </button>
        </div>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-10">
          Preguntas Frecuentes
        </h1>

        {/* Lista de FAQs */}
        <div className="space-y-6">
          {faqs.map(({ pregunta, respuesta }, index) => (
            <div
              key={index}
              className="bg-gray-800/60 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-gray-700 shadow-lg hover:shadow-purple-500/25 transition-shadow"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-purple-300 mb-2">
                {pregunta}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {respuesta}
              </p>
            </div>
          ))}
        </div>

        {/* Contacto */}
        <div className="mt-12 text-center text-sm text-gray-400 px-2">
          ¿Necesitás más ayuda? Escribinos a{" "}
          <a
            href="mailto:PrendasZarpadasupport@gmail.com"
            className="text-cyan-400 hover:text-cyan-300 no-underline"
          >
            PrendasZarpadasupport@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Faq;

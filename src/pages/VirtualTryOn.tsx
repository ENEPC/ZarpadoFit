import { Sparkles, Image, Download, Share2, X, Check } from "lucide-react";
import { Button } from "../components/Button";
import React, { useState, useEffect, useRef } from "react";
import { useVirtualTryOn } from "../context/VirtualTryOnContext";
import { useHistory } from "../context/HistoryContext";
import { prendasCatalogo } from "../data/prendas";

const FIXED_USER_ID = "68587b9335f4a7ed6ef6a216";
const API_ENDPOINT = "https://web-production-986ac.up.railway.app/api/probador";

export const VirtualTryOn = () => {
  // Estados para las imágenes
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothingImages, setClothingImages] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [selectedClothingIndex, setSelectedClothingIndex] = useState<
    number | null
  >(null);
  const [response, setResponse] = useState<string | null>(null);

  // Estados para UI y control
  const [generateEvent, setGenerateEvent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [dragActiveClothing, setDragActiveClothing] = useState<number | null>(
    null
  );

  // Refs para los inputs de archivo
  const userFileInputRef = useRef<HTMLInputElement>(null);
  const clothingFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Contextos
  const { prendaParaProbar, setPrendaParaProbar } = useVirtualTryOn();
  const { addToHistory } = useHistory();

  // Efecto para manejar prendas del catálogo
  useEffect(() => {
    if (prendaParaProbar) {
      const firstEmptyIndex = clothingImages.findIndex((img) => img === null);
      const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
      const newImages = [...clothingImages];
      newImages[targetIndex] = prendaParaProbar.img;
      setClothingImages(newImages);
      setSelectedClothingIndex(targetIndex);
      setPrendaParaProbar(null);
    }
  }, [prendaParaProbar, clothingImages, setPrendaParaProbar]);

  // Función mejorada para convertir cualquier imagen a Blob
  const convertImageToBlob = async (imageData: string): Promise<Blob> => {
    try {
      // Si es una URL (http o https)
      if (imageData.startsWith("http")) {
        // Primero intentamos sin proxy CORS
        try {
          const response = await fetch(imageData, {
            mode: "cors",
            credentials: "omit",
          });

          if (response.ok) {
            const blob = await response.blob();
            if (blob.type.startsWith("image/")) {
              return blob;
            }
          }
        } catch (error) {
          console.log("Intento directo fallido, usando proxy CORS...");
        }

        // Si falla, intentamos con proxy CORS
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageData)}`;
          const response = await fetch(proxyUrl);

          if (!response.ok) {
            throw new Error(`Error al cargar imagen: ${response.status}`);
          }

          const blob = await response.blob();

          if (!blob.type.startsWith("image/")) {
            throw new Error("El archivo no es una imagen válida");
          }

          return blob;
        } catch (proxyError) {
          console.error("Error con proxy CORS:", proxyError);
          throw new Error(
            "No se pudo cargar la imagen desde el servidor remoto"
          );
        }
      }
      // Si es base64
      else if (imageData.startsWith("data:image")) {
        const matches = imageData.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error("Formato base64 de imagen no válido");
        }

        const mimeType = matches[1];
        const base64Data = matches[2];

        // Convertimos base64 a ArrayBuffer
        const byteString = atob(base64Data);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeType });
      }
      throw new Error("Formato de imagen no reconocido");
    } catch (error) {
      console.error("Error al convertir imagen:", error);
      throw new Error(
        "No se pudo procesar la imagen. Asegúrate de usar imágenes JPG o PNG válidas."
      );
    }
  };

  // Función principal para enviar imágenes al endpoint
  const handleGenerate = async () => {
    if (!userImage) {
      setError("Por favor, selecciona una foto de usuario");
      return;
    }

    if (selectedClothingIndex === null) {
      setError("Por favor, selecciona una prenda para probar");
      return;
    }

    const clothingImageUrl = clothingImages[selectedClothingIndex];
    if (!clothingImageUrl) {
      setError("No se ha seleccionado ninguna prenda");
      return;
    }

    setGenerateEvent(true);
    setResponse(null);
    setIsLoading(true);
    setError(null);

    try {
      // Crear FormData como espera la API
      const formData = new FormData();
      formData.append("user_id", FIXED_USER_ID);

      // Convertir imágenes a Blob con manejo de errores mejorado
      let prendaBlob: Blob;
      let usuarioBlob: Blob;

      try {
        prendaBlob = await convertImageToBlob(clothingImageUrl);
      } catch (error) {
        console.error("Error al procesar imagen de prenda:", error);
        throw new Error(
          "No se pudo procesar la imagen de la prenda. Asegúrate de que sea una imagen JPG o PNG válida y que esté accesible."
        );
      }

      try {
        usuarioBlob = await convertImageToBlob(userImage);
      } catch (error) {
        console.error("Error al procesar imagen de usuario:", error);
        throw new Error(
          "No se pudo procesar tu foto. Asegúrate de que sea una imagen JPG o PNG válida."
        );
      }

      formData.append("file_prenda", prendaBlob, `prenda-${Date.now()}.jpg`);
      formData.append("file_usuario", usuarioBlob, `usuario-${Date.now()}.jpg`);

      // Configuración de la solicitud con timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const result = await response.json();

      // Manejar la respuesta
      if (result.img_generada) {
        setResponse(result.img_generada);
      } else if (result.processedImage) {
        setResponse(`data:image/jpeg;base64,${result.processedImage}`);
      } else {
        throw new Error("El servidor no devolvió una imagen válida");
      }

      // Agregar al historial si es una prenda del catálogo
      const prendaParaHistorial = prendasCatalogo.find(
        (p) => p.img === clothingImageUrl
      );
      if (prendaParaHistorial) {
        addToHistory(prendaParaHistorial);
      }
    } catch (error) {
      console.error("Error al procesar:", error);
      setError((error as Error).message || "Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  // Configuración de eventos de drag and drop
  useEffect(() => {
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const events = ["dragenter", "dragover", "dragleave", "drop"];
    events.forEach((event) => {
      document.addEventListener(event, preventDefaults, false);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, preventDefaults, false);
      });
    };
  }, []);

  // Manejadores para la imagen del usuario
  const handleUserFileSelect = () => userFileInputRef.current?.click();

  const handleUserFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setUserImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setUserImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const removeUserImage = () => {
    setUserImage(null);
    if (userFileInputRef.current) userFileInputRef.current.value = "";
  };

  // Manejadores para las prendas
  const handleClothingFileSelect = (index: number) => {
    clothingFileInputRefs.current[index]?.click();
  };

  const handleClothingFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file?.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        const newImages = [...clothingImages];
        newImages[index] = base64String;
        setClothingImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClothingDrop = (
    index: number,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveClothing(null);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...clothingImages];
        newImages[index] = event.target?.result as string;
        setClothingImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClothingDrag = (
    index: number,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveClothing(
      e.type === "dragenter" || e.type === "dragover" ? index : null
    );
  };

  const removeClothingImage = (index: number) => {
    const newImages = [...clothingImages];
    newImages[index] = null;
    setClothingImages(newImages);
    if (selectedClothingIndex === index) setSelectedClothingIndex(null);
    if (clothingFileInputRefs.current[index]) {
      clothingFileInputRefs.current[index]!.value = "";
    }
  };

  const selectClothing = (index: number) => {
    setSelectedClothingIndex(clothingImages[index] ? index : null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">ZARPADO FIT</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Probador Virtual
          </h2>
          <p className="text-xl text-gray-300">
            Selecciona la prenda que quieres probar
          </p>
        </div>

        {/* Overlay de carga */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <Sparkles className="h-16 w-16 text-purple-500 mx-auto mb-4 animate-pulse" />
              <p className="text-white text-xl">Procesando con IA...</p>
              <p className="text-gray-300 text-sm mt-2">
                Esto puede tomar unos segundos
              </p>
            </div>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-md z-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold">Error</h4>
                <p>{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-white hover:text-gray-200 ml-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sección de la foto del usuario */}
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">Tu Foto</h3>
            <div
              className={`aspect-[3/4] bg-gray-700/50 rounded-xl border-2 ${dragActive ? "border-purple-500" : "border-dashed border-gray-600"} flex items-center justify-center relative`}
              onDragEnter={handleUserDrag}
              onDragLeave={handleUserDrag}
              onDragOver={handleUserDrag}
              onDrop={handleUserDrop}
            >
              {userImage ? (
                <div className="w-full h-full relative">
                  <img
                    src={userImage}
                    alt="Tu foto"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    onClick={removeUserImage}
                    className="absolute top-2 right-2 bg-gray-800/80 hover:bg-gray-700/90 rounded-full p-2 transition-colors duration-200"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              ) : (
                <div className="text-center p-4">
                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Arrastra tu foto aquí o</p>
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={handleUserFileSelect}
                  >
                    Seleccionar Foto
                  </Button>
                  <input
                    type="file"
                    ref={userFileInputRef}
                    onChange={handleUserFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}
              {dragActive && (
                <div className="absolute inset-0 bg-purple-900/20 rounded-xl border-4 border-dashed border-purple-500 flex items-center justify-center">
                  <p className="text-white font-medium text-lg">
                    Suelta tu foto aquí
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sección de selección de prendas */}
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">
              Seleccionar Prenda
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={`clothing-slot-${index}`} className="relative">
                  <div
                    className={`aspect-square bg-gray-700/50 rounded-lg border-2 ${selectedClothingIndex === index ? "border-purple-500" : "border-gray-600"} ${dragActiveClothing === index ? "border-purple-500" : ""} flex items-center justify-center relative cursor-pointer`}
                    onClick={() => selectClothing(index)}
                    onDragEnter={(e) => handleClothingDrag(index, e)}
                    onDragLeave={(e) => handleClothingDrag(index, e)}
                    onDragOver={(e) => handleClothingDrag(index, e)}
                    onDrop={(e) => handleClothingDrop(index, e)}
                  >
                    {clothingImages[index] ? (
                      <>
                        <img
                          src={clothingImages[index]!}
                          alt={`Prenda ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeClothingImage(index);
                          }}
                          className="absolute top-1 right-1 bg-gray-800/80 hover:bg-gray-700/90 rounded-full p-1"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                        {selectedClothingIndex === index && (
                          <div className="absolute top-1 left-1 bg-purple-500 rounded-full p-1">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center p-2">
                        <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <Button
                          variant="secondary"
                          size="md"
                          className="text-sm w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClothingFileSelect(index);
                          }}
                        >
                          Añadir prenda
                        </Button>
                        <input
                          type="file"
                          ref={(el) => {
                            clothingFileInputRefs.current[index] = el;
                          }}
                          onChange={(e) => handleClothingFileChange(index, e)}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    )}
                    {dragActiveClothing === index && (
                      <div className="absolute inset-0 bg-purple-900/20 rounded-lg border-4 border-dashed border-purple-500 flex items-center justify-center">
                        <p className="text-white text-sm font-medium">
                          Suelta la prenda aquí
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={handleGenerate}
              disabled={
                !userImage || selectedClothingIndex === null || isLoading
              }
            >
              {isLoading ? "Procesando..." : "Procesar con IA"}
            </Button>
          </div>

          {/* Sección de resultados */}
          {generateEvent && (
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">
                Resultado
              </h3>
              <div className="aspect-[3/4] bg-gray-700/50 rounded-xl border border-gray-600 flex items-center justify-center">
                {response ? (
                  <img
                    src={response}
                    alt="Resultado IA"
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      console.error("Error al cargar la imagen:", e);
                      setError("La imagen recibida no es válida");
                      setResponse(null);
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-300">
                      {isLoading
                        ? "Generando resultado..."
                        : "No se recibió ninguna imagen"}
                    </p>
                  </div>
                )}
              </div>
              {response && (
                <div className="flex space-x-3 mt-4">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      if (response.startsWith("http")) {
                        window.open(response, "_blank");
                      } else {
                        const link = document.createElement("a");
                        link.href = response;
                        link.download = `zarpado-fit-resultado-${Date.now()}.jpg`;
                        link.click();
                      }
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {response.startsWith("http") ? "Ver imagen" : "Descargar"}
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: "Mi look de Zarpado Fit",
                            text: "Mira cómo me queda esta prenda con el probador virtual de Zarpado Fit",
                            url: response,
                          })
                          .catch(console.error);
                      } else {
                        navigator.clipboard.writeText(response);
                        alert("Enlace de la imagen copiado al portapapeles");
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

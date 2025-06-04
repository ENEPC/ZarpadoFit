import { Sparkles, Image, Download, Share2, X, Check } from "lucide-react";
import { Button } from "../components/Button";
import React, { useState, useEffect, useRef, useCallback } from "react";

export const VirtualTryOn = () => {
  // Estados para las imágenes
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothingImages, setClothingImages] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [selectedClothingIndex, setSelectedClothingIndex] = useState<
    number | null
  >(null);

  // Estados para UI
  const [response, setResponse] = useState<string | null>(null);
  const [generateEvent, setGenerateEvent] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState(false);
  const [dragActiveClothing, setDragActiveClothing] = useState<number | null>(
    null
  );

  // Refs para los inputs de archivo
  const userFileInputRef = useRef<HTMLInputElement>(null);
  const clothingFileInputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(4).fill(null)
  );

  // Prevenir comportamiento por defecto del navegador
  useEffect(() => {
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
      document.addEventListener(event, preventDefaults, false);
    });

    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
        document.removeEventListener(event, preventDefaults, false);
      });
    };
  }, []);

  // Handlers para la imagen de usuario
  const handleUserFileSelect = () => userFileInputRef.current?.click();

  const handleUserFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => setUserImage(event.target?.result as string);
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
      reader.onload = (event) => setUserImage(event.target?.result as string);
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

  // Handlers para las imágenes de prendas
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
        const newImages = [...clothingImages];
        newImages[index] = event.target?.result as string;
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

  // Handler para el botón de procesar
  const handleGenerate = () => {
    if (!userImage) {
      alert("Por favor sube una foto tuya");
      return;
    }
    if (selectedClothingIndex === null) {
      alert("Por favor selecciona una prenda");
      return;
    }

    // Aquí tendrías toda la data necesaria para la API:
    const dataForApi = {
      userImage: userImage,
      clothingImage: clothingImages[selectedClothingIndex],
      // Puedes añadir más datos si necesitas
    };

    console.log("Data lista para enviar a la API:", dataForApi);
    setGenerateEvent(true);

    // En un caso real, aquí harías el fetch a tu API
    // fetch('/tu-api', { method: 'POST', body: JSON.stringify(dataForApi) })
    //   .then(response => response.json())
    //   .then(data => setResponse(data.resultImage))
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sección de foto de usuario */}
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
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative">
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
                          variant="secondary" // Cambiado de "ghost" a "secondary"
                          size="md" // Cambiado de "sm" a "md"
                          className="text-sm w-full" // Añadido w-full y text-sm
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClothingFileSelect(index);
                          }}
                        >
                          Añadir prenda
                        </Button>
                        <input
                          type="file"
                          ref={(el) =>
                            (clothingFileInputRefs.current[index] = el)
                          }
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
              disabled={!userImage || selectedClothingIndex === null}
            >
              Procesar con IA
            </Button>
          </div>

          {/* Sección de resultados (oculta inicialmente) */}
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
                  />
                ) : (
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300">Generando resultado...</p>
                  </div>
                )}
              </div>
              <div className="flex space-x-3 mt-4">
                <Button variant="secondary" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
                <Button variant="secondary" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

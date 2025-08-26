import React, { useRef, useState, useEffect } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { Sparkles, Image as ImageIcon, Download, Share2, X } from "lucide-react";

// ==============================================
// Utilidades binarias / imágenes
// ==============================================
const abToB64 = (ab:ArrayBuffer) => {
  let binary = "";
  const bytes = new Uint8Array(ab);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

const b64ToBlob = (b64: any, mime: string = "image/png") => {
  try {
    if (typeof b64 === "string") {
      return new Blob([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))], { type: mime });
    }
    // If SDK ever returns bytes instead of base64 string
    if (b64 instanceof Uint8Array || Array.isArray(b64)) {
      return new Blob([b64 instanceof Uint8Array ? b64 : Uint8Array.from(b64 as any)] as any, { type: mime });
    }
    // If it's already an ArrayBuffer
    if (b64?.buffer) return new Blob([b64.buffer], { type: mime });
  } catch (e) {
    console.warn("b64ToBlob failed, falling back to data URL path", e);
  }
  // Last resort: return an empty blob to avoid crashes
  return new Blob([], { type: mime });
};

const srcToBlob = async (src: string | Blob) => {
  // URL remota
  if (typeof src === "string" && /^https?:\/\//i.test(src)) {
    const resp = await fetch(src, { mode: "cors", credentials: "omit" });
    if (!resp.ok) throw new Error(`No se pudo descargar la imagen: ${resp.status}`);
    const blob = await resp.blob();
    if (!blob.type?.startsWith("image/")) throw new Error("El recurso no es una imagen válida");
    return blob;
  }
  // Data URL
  if (typeof src === "string" && src.startsWith("data:image")) {
    const m = src.match(/^data:(image\/[^;]+);base64,(.+)$/);
    if (!m) throw new Error("Data URL inválida");
    return b64ToBlob(m[2], m[1]);
  }
  // File/Blob ya listo
  if (src instanceof Blob) return src;
  throw new Error("Formato de imagen no reconocido");
};

const makeInlinePartFromSrc = async (src: string | Blob) => {
  const blob = await srcToBlob(src);
  const ab = await blob.arrayBuffer();
  return {
    inlineData: {
      mimeType: blob.type || "image/jpeg",
      data: abToB64(ab),
    },
  };
};

const buildPrompt = (g:string) => {
  const garment = !g?.trim() ? "garment" : g.trim();
  return `
I. Garment Extraction and Preservation (IMAGE_1)
Precisely isolate the ${garment} in IMAGE_1, excluding all other elements (background, subject’s body, face).
Maintain the exact color, texture, silhouette, dimensions, patterns (logos/prints), seams and construction details of the ${garment}. Include pockets, buttons, zippers, drawcords, etc.
Use only garment pixels/features from IMAGE_1; do not synthesize new artwork or branding.

II. Integration into IMAGE_2
Completely replace the existing garment in IMAGE_2 with the extracted ${garment}. Do not combine or blend any elements of the original garment in IMAGE_2.
Match scale, perspective and orientation of the extracted ${garment} to the subject’s pose in IMAGE_2 so it drapes naturally (gravity, folds, volume).
Adapt lighting, shadows and reflections on the inserted ${garment} to the light of IMAGE_2, including realistic contact shadows.

III. IMAGE_2 Preservation (Non-Negotiable)
The subject's face in IMAGE_2 must remain 100% identical to the original.
Hair, accessories, other clothing and the entire background of IMAGE_2 must remain unchanged.
Edits are strictly limited to the replaced ${garment} region; no spillover or unintended changes.

Negative Constraints
Do not fuse any features of the original IMAGE_2 garment with the ${garment} from IMAGE_1.
Do not alter the subject’s face, hair, expression, accessories, or background.
Do not add shadows/reflections/effects beyond those caused by the inserted ${garment} and its interaction with existing lighting.
Avoid blending or warping that compromises the natural appearance and volume of the inserted ${garment}.

Expected Output
Return IMAGE_2 with the new ${garment} integrated realistically and naturally, keeping face and background unchanged—authentic and professional, as if the ${garment} had always been in the original image.
`.trim();
};

// ==============================================
// Helper: obtiene API key sin tocar `import`/`import.meta`
// ==============================================
const getInitialApiKey = () => {
  // 1) Next/webpack (reemplazo en build)
  try {
    if (typeof process !== "undefined" && process.env) {
      const fromProcess =
        process.env.VITE_GEMINI_API_KEY ||
        process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        "";
      if (fromProcess) return fromProcess;
    }
  } catch {}
  // 2) LocalStorage (persistencia en el navegador)
  try {
    if (typeof window !== "undefined") {
      const fromLS = window.localStorage.getItem("GEMINI_API_KEY") || "";
      if (fromLS) return fromLS;
    }
  } catch {}
  return "";
};

export default function Virtual() {
  const [apiKey, setApiKey] = useState(getInitialApiKey());
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modelText, setModelText] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const userInputRef = useRef<HTMLInputElement>(null);
  const garmentInputRef = useRef<HTMLInputElement>(null);

  // Persistir la API key en localStorage (solo pruebas)
  useEffect(() => {
    try {
      if (apiKey) window.localStorage.setItem("GEMINI_API_KEY", apiKey);
    } catch {}
  }, [apiKey]);

  // Mostrar modal si no hay key al cargar
  useEffect(() => {
    if (!apiKey) setShowKeyModal(true);
  }, []);

  const onPickUser = () => userInputRef.current?.click();
  const onPickGarment = () => garmentInputRef.current?.click();

  const onFileToDataUrl = (file: File | undefined, setter: (url: string | null) => void) => {
  if (!file || !file.type?.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const result = ev.target?.result;
    if (typeof result === "string") {
      setter(result);
    } else {
      setter(null); // O manejar el error como prefieras
    }
  };
  reader.readAsDataURL(file);
};

  const tryOnInBrowser = async () => {
    if (!apiKey?.trim()) {
      setShowKeyModal(true);
      setError(null);
      return;
    }
    if (!userImage) {
      setError("Subí tu foto (IMAGE_2)");
      return;
    }
    if (!garmentImage) {
      setError("Subí la prenda (IMAGE_1)");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPreviewUrl(null);
    setModelText("");

    try {
      const ai = new GoogleGenAI({ apiKey });

      // 1) Describir prenda
      const prendaPart = await makeInlinePartFromSrc(garmentImage);
      const descResp = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            text:
              "ONLY RETURN THE GARMENT TYPE AND KEY FEATURES, IN ENGLISH. Example: 'Anorak: Lightweight nylon, short zipper, hood with drawcord, color-block on shoulders and sleeves. Logo ...'.",
          },
          prendaPart,
        ],
      });
      const garmentDesc = (descResp.text ?? "").trim() || "garment";

      // 2) Prompt
      const prompt = buildPrompt(garmentDesc);

      // 3) Edición con 2 imágenes
      const usuarioPart = await makeInlinePartFromSrc(userImage);
      const editResp = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: [
          { text: "IMAGE_1 (garment reference):" },
          prendaPart,
          { text: "IMAGE_2 (base/final target):" },
          usuarioPart,
          { text: prompt },
        ],
        config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
      });

      // === Robust extractor ===
      const urls = [];
      const parts = editResp?.candidates?.[0]?.content?.parts ?? [];
      console.debug("parts count:", parts.length, parts);
      for (const p of parts) {
        if (p?.inlineData?.data) {
          const mime = p.inlineData.mimeType || "image/png";
          const data = p.inlineData.data;
          // Prefer object URL
          const blob = b64ToBlob(data, mime);
          if (blob.size > 0) {
            urls.push(URL.createObjectURL(blob));
          } else if (typeof data === "string") {
            // Fallback to data URL for environments that dislike blob URLs
            urls.push(`data:${mime};base64,${data}`);
          }
        }
        // Future compatibility: if SDK returns media[] or fileData
        if ((p as any)?.media && Array.isArray((p as any).media)) {
          for (const m of p as any) {
            if (m?.inlineData?.data) {
              const mime = m.inlineData.mimeType || "image/png";
              const blob = b64ToBlob(m.inlineData.data, mime);
              if (blob.size > 0) urls.push(URL.createObjectURL(blob));
            }
          }
        }
      }

      if (urls.length === 0) {
        // Try top-level media if present
        const topMedia = (editResp as any)?.media || [];
        if (Array.isArray(topMedia)) {
          for (const m of topMedia) {
            if (m?.inlineData?.data) {
              const mime = m.inlineData.mimeType || "image/png";
              const blob = b64ToBlob(m.inlineData.data, mime);
              if (blob.size > 0) urls.push(URL.createObjectURL(blob));
            }
          }
        }
      }

      if (urls.length === 0) throw new Error("El modelo no devolvió imágenes.");

      setPreviewUrl(urls[0]);
      const maybeText = (editResp.text ?? "").trim();
      if (maybeText) setModelText(maybeText);
    }catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }else {
      setError(String(e));
      }
    }finally {
      setIsLoading(false);
    }
  };

  // ==============================================
  // "Tests" de utilidades (auto-check en dev)
  // Ejecuta si la URL tiene ?selftest=1
  // ==============================================
  useEffect(() => {
    const runSelfTests = async () => {
      const assert = (cond: any, msg: string) => { if (!cond) throw new Error(msg); };
      // Test 1: round-trip base64
      const txt = "hola";
      const enc = new TextEncoder().encode(txt);
      const b64 = abToB64(enc.buffer);
      const back = new Uint8Array(atob(b64).split("").map((c) => c.charCodeAt(0)));
      assert(new TextDecoder().decode(back) === txt, "abToB64 round-trip falla");
      // Test 2: dataURL -> blob
      const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHgwKk6ZQJ4wAAAABJRU5ErkJggg==";
      const blob = await srcToBlob(dataUrl);
      assert(blob instanceof Blob && blob.size > 0, "srcToBlob(dataURL) falla");
      // Test 3: buildPrompt fallback
      const ptxt = buildPrompt("");
      assert(/IMAGE_1/.test(ptxt) && ptxt.includes("garment"), "buildPrompt fallback falla");
    };
    try {
      const q = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      if (q && q.get("selftest") === "1") runSelfTests().catch((e) => console.warn("Selftests: ", e.message));
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">ZARPADO FIT</h1>
          <p className="text-gray-300 mt-2">Probador virtual (frontend-only, para pruebas)</p>
        </header>

        

        <div className="grid md:grid-cols-3 gap-4">
          {/* Foto usuario */}
          <section className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-4">
            <h3 className="text-white font-semibold mb-3">Tu Foto (IMAGE_2)</h3>
            <div className="aspect-[3/4] bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center relative">
              {userImage ? (
                <div className="w-full h-full relative">
                  <img src={userImage} alt="user" crossOrigin="anonymous" className="w-full h-full object-contain rounded-xl" />
                  <button
                    onClick={() => setUserImage(null)}
                    className="absolute top-2 right-2 bg-gray-800/80 hover:bg-gray-700/90 rounded-full p-2"
                    title="Quitar"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <button onClick={onPickUser} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white">Seleccionar foto</button>
                  <input
                    ref={userInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onFileToDataUrl(e.target.files?.[0], setUserImage)}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Prenda */}
          <section className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-4">
            <h3 className="text-white font-semibold mb-3">Prenda (IMAGE_1)</h3>
            <div className="aspect-[3/4] bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center relative">
              {garmentImage ? (
                <div className="w-full h-full relative">
                  <img src={garmentImage} alt="garment" crossOrigin="anonymous" className="w-full h-full object-contain rounded-xl" />
                  <button
                    onClick={() => setGarmentImage(null)}
                    className="absolute top-2 right-2 bg-gray-800/80 hover:bg-gray-700/90 rounded-full p-2"
                    title="Quitar"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <button onClick={onPickGarment} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white">Añadir prenda</button>
                  <input
                    ref={garmentInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onFileToDataUrl(e.target.files?.[0], setGarmentImage)}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Resultado */}
          <section className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-4">
            <h3 className="text-white font-semibold mb-3">Resultado</h3>
            <div className="aspect-[3/4] bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="resultado" crossOrigin="anonymous" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="text-center p-6 text-gray-300">
                  <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-3 animate-pulse" />
                  Sin imagen generada aún
                </div>
              )}
            </div>
            {previewUrl && (
              <div className="flex gap-2 mt-3">
                <a
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = previewUrl;
                    a.download = `zarpado-fit-${Date.now()}.png`;
                    a.click();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-100 cursor-pointer"
                >
                  <Download className="h-4 w-4" /> Descargar
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Zarpado Fit", url: previewUrl }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(previewUrl);
                      alert("Enlace copiado al portapapeles");
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-100"
                >
                  <Share2 className="h-4 w-4" /> Compartir
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Acciones */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={tryOnInBrowser}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" /> {isLoading ? "Procesando..." : "Procesar con IA"}
          </button>
          {modelText && (
            <span className="text-xs text-gray-400">Modelo: {modelText}</span>
          )}
        </div>

        {/* Errores */}
        {error && (
          <div className="mt-4 bg-red-600/90 text-white p-3 rounded-lg flex items-start gap-2">
            <strong className="mt-0.5">Error:</strong>
            <span>{error}</span>
          </div>
        )}
  {/* Modal API Key (solo si falta) */}
  {showKeyModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold">Configurar API Key</h4>
          <button onClick={() => setShowKeyModal(false)} className="p-1 rounded hover:bg-gray-700">
            <X className="h-4 w-4 text-gray-200" />
          </button>
        </div>
        <p className="text-sm text-gray-300 mb-3">Pegá tu <code>GEMINI_API_KEY</code>. Se guardará en <code>localStorage</code> para próximas veces.</p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="AIzaSyCkca22Cz25WiNhUlymX3K-Lx1RyrRxrD8"
          className="w-full rounded-xl bg-gray-900 text-gray-100 p-3 outline-none border border-gray-700 focus:border-purple-500"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setShowKeyModal(false)} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-100 hover:bg-gray-600">Cancelar</button>
          <button onClick={() => { if (!apiKey?.trim()) { setError('Pegá tu GEMINI_API_KEY'); return; } setShowKeyModal(false); }} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500">Guardar</button>
        </div>
        <p className="text-xs text-gray-400 mt-2">No uses esto en producción. Mover llamadas a backend.</p>
      </div>
    </div>
  )}
</div>
    </div>
  );
}


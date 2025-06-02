import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (file) {
      console.log("Foto cargada:", file);
      navigate("/try-on");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && <div className="mb-4 text-sm text-zinc-600">{file.name}</div>}
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          onClick={handleSubmit}
        >
          Subir Foto
        </button>
      </div>
    </div>
  );
}

"use client";

import { FormEvent } from "react";
import MediaPicker from "./MediaPicker";
import { Camera } from "lucide-react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function NewMemoryForm() {
  const router = useRouter();

  const handleCreateMemorySubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get("coverUrl");
    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();

      uploadFormData.set("file", fileToUpload);
      const jwt = Cookie.get("token");

      const uploadResponse = await api.post("/upload", uploadFormData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      coverUrl = uploadResponse.data.fileUrl;

      await api.post(
        "/memories",
        {
          coverUrl,
          content: formData.get("content"),
          isPublic: formData.get("isPublic"),
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    }
    router.push("/");
  };
  return (
    <form
      onSubmit={handleCreateMemorySubmit}
      className="flex flex-1 flex-col gap-2 "
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          {/*// @ts-ignore */}
          <Camera className="h-4 w-4" />
          Anexar imagem
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200
            hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar Memoria Publica
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt uppercase leading-none text-black underline hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
}

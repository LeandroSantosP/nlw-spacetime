"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function MediaPicker() {
  const [previewFile, setPreviewFile] = useState<null | string>(null);
  const [previewVideo, setPreviewVideo] = useState<null | string>(null);

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }
    const fileName = files[0].name.toLocaleLowerCase();
    const isVideo = /\.(mp4|mov|avi|wmv)$/i.test(fileName);
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileName);

    const previewURL = URL.createObjectURL(files[0]);

    if (isImage) {
      setPreviewFile(previewURL);
      setPreviewVideo(null);
      return;
    }

    if (isVideo) {
      setPreviewFile(null);
      setPreviewVideo(previewURL);
    }
  };

  return (
    <>
      <input
        onChange={onFileSelect}
        type="file"
        className="invisible h-0 w-0"
        id="media"
        name="coverUrl"
        accept="images/*,video"
      />
      {previewFile && (
        // eslint-disable-next-line
        <img
          src={previewFile}
          alt="preview da imagem"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
      {previewVideo && <video src={previewVideo} muted autoPlay />}
    </>
  );
}

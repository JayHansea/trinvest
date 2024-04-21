// ImageComponent.tsx
import React from "react";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ImageComponent: React.FC<ImageProps> = ({ src, alt, width, height }) => {
  return (
    <div className="flex justify-center items-center p-6 my-2 shadow-xl">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
};

export default ImageComponent;

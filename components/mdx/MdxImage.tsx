import Image from "next/image";

interface MdxImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function MdxImage({ src, alt, caption, width = 1200, height = 675 }: MdxImageProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-xl border border-line"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-ink-faint">{caption}</figcaption>
      )}
    </figure>
  );
}

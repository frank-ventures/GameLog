import Image from "next/image";

export default function CoverImage({ source, alt, width, height, className }) {
  return (
    <>
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_720p/${source}.jpg`}
        alt={alt}
        width={width}
        height={height}
        className={className}
      ></Image>
    </>
  );
}

import { useState } from "react";

type SafeImageProps =
  React.ImgHTMLAttributes<HTMLImageElement>;

export default function SafeImage({
  src,
  alt,
  className = "",
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        className={`image-fallback flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="px-6 text-center text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200" />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}
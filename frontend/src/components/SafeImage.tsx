import { useState } from "react";
type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function SafeImage({
  src,
  alt,
  className = "",
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

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
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
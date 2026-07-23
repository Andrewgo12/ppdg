"use client"

interface GalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  columns?: number
}

export function Gallery({ images, columns = 3 }: GalleryProps) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-${columns}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-border bg-muted aspect-square cursor-pointer"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {image.caption && (
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-xs font-medium text-white">{image.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

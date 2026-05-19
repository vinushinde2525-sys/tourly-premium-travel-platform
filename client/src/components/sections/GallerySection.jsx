import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', alt: 'Paris at night', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', alt: 'Kyoto temple', span: '' },
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', alt: 'Bali rice terraces', span: '' },
  { src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80', alt: 'African safari', span: '' },
  { src: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', alt: 'Machu Picchu', span: '' },
  { src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', alt: 'Santorini sunset', span: 'col-span-2' },
];

export default function GallerySection() {
  const [ref, visible] = useScrollReveal();
  const [lightbox, setLightbox] = useState(null);

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            eyebrow="Photo Gallery"
            title="Moments From Travelers"
            subtitle="A curated collection of breathtaking moments captured by our travelers across the globe."
          />
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer h-48 md:h-56 ${img.span}`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

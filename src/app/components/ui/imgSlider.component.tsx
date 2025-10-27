import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImgSliderProps {
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
    images: string[];
    current: number;
    title: string;
    styles: React.CSSProperties;
}

export const ImgSlider: React.FC<ImgSliderProps> = ({setCurrent, images, current, title, styles}) => {

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    return <div className={`relative h-56 overflow-hidden group`} style={styles}>
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-2 w-full flex justify-center gap-1">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === current ? "bg-[#ff7f50]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
}
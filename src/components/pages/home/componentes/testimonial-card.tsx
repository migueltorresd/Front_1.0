import { staticImages } from "@/constants/static_images";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa6";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
  image?: string;
  className?: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  rating = 5,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-orange-100 dark:border-orange-900/30 hover:shadow-xl transition-shadow duration-300",
        className,
      )}
    >
      {/* Quote marks */}
      <div className="mb-4 text-orange-300 dark:text-orange-700 text-4xl font-serif leading-none">
        "
      </div>

      {/* Quote text */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">{quote}</p>

      {/* Rating stars */}
      {rating > 0 && (
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={cn(
                "h-4 w-4 mr-1",
                i < rating
                  ? "text-orange-500 fill-orange-500"
                  : "text-gray-300 dark:text-gray-600",
              )}
            />
          ))}
        </div>
      )}

      {/* Author info */}
      <div className="flex items-center">
        <img
          src={image || staticImages.PLACEHOLDER_USER}
          alt={author}
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{author}</p>
          {role && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          )}
        </div>
      </div>
    </div>
  );
}

import { staticImages } from "@/constants/static_images";
import { categoryNames, Resource } from "@/types/resource.types";
import { FaVideo } from "react-icons/fa";

const Video = ({ resource }: { resource: Resource }) => {
  return (
    <div
      key={resource.id}
      className="h-full flex flex-col border rounded-md p-4"
    >
      <div className="pb-2">
        <div className="flex justify-between items-start">
          <span className="bg-red-50 text-red-700 px-2 py-1 rounded-md flex items-center">
            <FaVideo className="h-3 w-3 mr-1" />
            Video
          </span>
          <span className="bg-gray-50 px-2 py-1 rounded-md">
            {categoryNames[resource.category]}
          </span>
        </div>
      </div>
      <div className="py-2 flex-grow">
        <div className="relative mb-3">
          <img
            src={resource.thumbnail || staticImages.PLACEHOLDER_IMAGE}
            alt={resource.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {resource.duration}
          </div>
        </div>
        <h3 className="font-semibold mb-1">{resource.title}</h3>
        <p className="text-gray-700 text-sm">{resource.description}</p>
        <p className="text-gray-500 text-xs mt-2">
          {resource.author && `Por ${resource.author}`}
        </p>
      </div>
      <div>
        <button className="w-full text-green-600 border border-green-200 hover:bg-green-50 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer">
          <FaVideo className="h-4 w-4 mr-2" />
          Ver video
        </button>
      </div>
    </div>
  );
};

export default Video;

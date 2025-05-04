import { categoryNames, Resource } from "@/types/resource.types";
import { FaBook, FaExternalLinkAlt } from "react-icons/fa";

const Article = ({ resource }: { resource: Resource }) => {
  return (
    <div
      key={resource.id}
      className="h-full flex flex-col border rounded-md p-4"
    >
      <div className="pb-2">
        <div className="flex justify-between items-start">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center">
            <FaBook className="h-3 w-3 mr-1" />
            Artículo
          </span>
          <span className="bg-gray-50 px-2 py-1 rounded-md">
            {categoryNames[resource.category]}
          </span>
        </div>
        <h3 className="text-lg mt-2">{resource.title}</h3>
        <p className="text-sm">
          {resource.author && `Por ${resource.author}`}
          {resource.date && ` • ${resource.date}`}
        </p>
      </div>
      <div className="py-2 flex-grow">
        <p className="text-gray-700 text-sm">{resource.description}</p>
      </div>
      <div>
        <button className="w-full text-green-600 border border-green-200 hover:bg-green-50 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer">
          <FaExternalLinkAlt className="h-4 w-4 mr-2" />
          Leer artículo
        </button>
      </div>
    </div>
  );
};

export default Article;

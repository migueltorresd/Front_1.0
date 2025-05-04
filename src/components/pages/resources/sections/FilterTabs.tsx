import { FaBook, FaVideo, FaFileAlt } from "react-icons/fa";

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilterTabs = ({ activeTab, setActiveTab }: FilterTabsProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
        <button
          className={`py-2 px-6 rounded-full flex items-center transition-all duration-200 cursor-pointer ${
            activeTab === "all"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-50 hover:bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("all")}
        >
          <span className="font-medium">Todos</span>
        </button>
        <button
          className={`py-2 px-6 rounded-full flex items-center transition-all duration-200 cursor-pointer ${
            activeTab === "articles"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-50 hover:bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("articles")}
        >
          <FaBook className="h-4 w-4 mr-2" />
          <span className="font-medium">Artículos</span>
        </button>
        <button
          className={`py-2 px-6 rounded-full flex items-center transition-all duration-200 cursor-pointer ${
            activeTab === "videos"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-50 hover:bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          <FaVideo className="h-4 w-4 mr-2" />
          <span className="font-medium">Videos</span>
        </button>
        <button
          className={`py-2 px-6 rounded-full flex items-center transition-all duration-200 cursor-pointer ${
            activeTab === "documents"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-50 hover:bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("documents")}
        >
          <FaFileAlt className="h-4 w-4 mr-2" />
          <span className="font-medium">Documentos</span>
        </button>
      </div>
    </div>
  );
};

export default FilterTabs;

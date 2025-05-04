import { Resource } from "@/types/resource.types";
import Article from "@/components/pages/resources/components/Article";
import Video from "@/components/pages/resources/components/Video";
import Document from "@/components/pages/resources/components/Document";

interface ResourcesListProps {
  resources: Resource[];
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
}

const ResourcesList = ({
  resources,
  setSearchQuery,
  setActiveTab,
}: ResourcesListProps) => {
  // Renderizar un recurso según su tipo
  const renderResource = (resource: Resource) => {
    switch (resource.type) {
      case "article":
        return <Article resource={resource} key={resource.id} />;
      case "video":
        return <Video resource={resource} key={resource.id} />;
      case "document":
        return <Document resource={resource} key={resource.id} />;
      default:
        return null;
    }
  };

  return (
    <>
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(renderResource)}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            No se encontraron recursos que coincidan con tu búsqueda.
          </p>
          <button
            className="border border-gray-300 px-4 py-2 rounded-md"
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
          >
            Mostrar todos los recursos
          </button>
        </div>
      )}
    </>
  );
};

export default ResourcesList;

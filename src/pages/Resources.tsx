import { useState } from "react";
import { resourcesData } from "@/constants/mock-resources";
import {
  FilterTabs,
  SearchBar,
  ResourcesList,
} from "@/components/pages/resources/sections";

export default function Resources() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar recursos según la pestaña activa y la búsqueda
  const filteredResources = resourcesData.filter((resource) => {
    // Filtrar por tipo (pestaña)
    const typeMatch =
      activeTab === "all" ||
      (activeTab === "articles" && resource.type === "article") ||
      (activeTab === "videos" && resource.type === "video") ||
      (activeTab === "documents" && resource.type === "document");

    // Filtrar por búsqueda
    const searchMatch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.author &&
        resource.author.toLowerCase().includes(searchQuery.toLowerCase()));

    return typeMatch && searchMatch;
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Biblioteca de Recursos
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Accede a artículos, videos y documentos verificados por profesionales
          para aprender más sobre salud oncológica
        </p>
      </div>

      {/* Barra de búsqueda */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultsCount={filteredResources.length}
      />

      {/* Pestañas de filtrado */}
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Lista de recursos filtrados */}
      <ResourcesList
        resources={filteredResources}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

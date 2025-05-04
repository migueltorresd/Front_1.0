import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultsCount: number;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  resultsCount,
}: SearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-xl mx-auto">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Buscar recursos..."
          className="pl-10 border rounded-md w-full py-2"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        {resultsCount}{" "}
        {resultsCount === 1 ? "recurso encontrado" : "recursos encontrados"}
      </div>
    </div>
  );
};

export default SearchBar;

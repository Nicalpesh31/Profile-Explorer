import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, SortAsc, SortDesc } from 'lucide-react';
import { SearchFilters } from '../../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

const defaultFilters: SearchFilters = {
  query: '',
  sortBy: 'name',
  sortOrder: 'asc'
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialFilters = defaultFilters
}) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [debouncedQuery, setDebouncedQuery] = useState(filters.query);

  // Memoize the search callback
  const triggerSearch = useCallback(() => {
    onSearch({
      ...filters,
      query: debouncedQuery
    });
  }, [debouncedQuery, filters.sortBy, filters.sortOrder, onSearch]);

  // Handle query debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(filters.query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.query]);

  // Trigger search when relevant values change
  useEffect(() => {
    triggerSearch();
  }, [triggerSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      query: e.target.value
    }));
  };

  const handleClearSearch = () => {
    setFilters(prev => ({
      ...prev,
      query: ''
    }));
  };

  const toggleSortOrder = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      sortBy: e.target.value as 'name' | 'createdAt'
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        
        <input
          type="text"
          value={filters.query}
          onChange={handleInputChange}
          placeholder="Search by name, description, or address..."
          className="input pl-10 pr-10"
          aria-label="Search profiles"
        />
        
        {filters.query && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X size={18} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <label htmlFor="sortBy" className="text-sm text-gray-600 mr-2 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={handleSortByChange}
            className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Sort by field"
          >
            <option value="name">Name</option>
            <option value="createdAt">Date Added</option>
          </select>
        </div>
        
        <button
          onClick={toggleSortOrder}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
          aria-label={filters.sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
        >
          {filters.sortOrder === 'asc' ? (
            <SortAsc size={18} className="text-gray-600" />
          ) : (
            <SortDesc size={18} className="text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const UserFilter = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search Users..." />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Email Filter */}
        <SearchFilter paramName="email" placeholder="Search Email..." />

        {/* Contact Number Filter */}
        <SearchFilter paramName="contactNumber" placeholder="Search Contact..." />

        <ClearFiltersButton />
      </div>

      <div className="flex items-center gap-3">
        <RefreshButton />
      </div>
    </div>
  );
};

export default UserFilter;

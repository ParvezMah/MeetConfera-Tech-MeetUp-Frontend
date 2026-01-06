/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IHost } from "@/types/host.interface";
import { Star } from "lucide-react";

export const HostColumns: Column<IHost>[] = [
  {
    header: "Host",
    accessor: (host) => (
      <UserInfoCell
        name={host.name}
        email={host.email}
        profilePhoto={host.profilePhoto as string}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Intereset",
    accessor: (host) => {
      // Handle both possible response structures
      const specialties: any = host.interests;

      if (!specialties || specialties.length === 0) {
        return <span className="text-xs"><p className="bg-red-500">Interest is not loading</p></span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {specialties.map((item: any, index: any) => {
            // Handle nested specialty object
            const specialtyTitle = item.specialties?.title || "N/A";
            const specialtyId =
              item.specialties?.id || item.specialitiesId || index;

            return (
              <span
                key={specialtyId}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              >
                {specialtyTitle}
              </span>
            );
          })}
        </div>
      );
    },
  },
  {
    header: "Contact",
    accessor: (host) => (
      <div className="flex flex-col">
        <span className="text-sm">{host.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Location",
    accessor: (host) => (
      <span className="text-sm font-medium">
        {host.location} 
        <p className="bg-red-500">Location is not loading</p>
      </span>
    ),
    sortKey: "experience",
  },
  {
    header: "Joining Fee",
    accessor: (host) => (
      <span className="text-sm font-semibold flex">
        ${host.joiningFee} <p className="bg-red-500">Joinig Fee is not loading</p>
      </span>
    ),
    sortKey: "joiningFee",
  },
  {
    header: "Rating",
    accessor: (host) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {host.averageRating!.toFixed(1)}
        </span>
      </div>
    ),
    sortKey: "averageRating",
  },
  {
    header: "Status",
    accessor: (host) => <StatusBadgeCell isDeleted={host.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (host) => <DateCell date={host.createdAt} />,
    sortKey: "createdAt",
  },
];
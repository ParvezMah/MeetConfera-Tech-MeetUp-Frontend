"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IHost } from "@/types/host.interface";

export const hostsColumns: Column<IHost>[] = [
  {
    header: "Host",
    accessor: (host) => (
      <UserInfoCell
        name={host.name}
        email={host.email}
        profilePhoto={host.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact Number",
    accessor: (host) => (
      <div className="flex flex-col">
        <span className="text-sm">{host.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Location",
    accessor: (host) => (
      <span className="text-sm">{host.user?.location || "N/A"}</span>
    ),
  },
  {
    header: "Role",
    accessor: (host) => (
      <span className="text-sm capitalize">
        {host.user?.role.toLowerCase() || "N/A"}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (host) => <StatusBadgeCell status={host.user?.status} />,
  },
  {
    header: "Joined",
    accessor: (host) => <DateCell date={host.createdAt} />,
    sortKey: "createdAt",
  },
];

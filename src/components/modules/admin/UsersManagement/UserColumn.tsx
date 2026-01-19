"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";

export const usersColumns: Column<UserInfo>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        profilePhoto={user.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact Number",
    accessor: (user) => (
      <div className="flex flex-col">
        <span className="text-sm">{user.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Location",
    accessor: (user) => (
      <span className="text-sm">{user.location || "N/A"}</span>
    ),
  },
  {
    header: "Role",
    accessor: (user) => (
      <span className="text-sm capitalize">
        {user.role?.toLowerCase() || "N/A"}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (user) => <StatusBadgeCell status={user.status} />,
  },
  {
    header: "Joined",
    accessor: (user) => <DateCell date={user.createdAt} />,
    sortKey: "createdAt",
  },
];

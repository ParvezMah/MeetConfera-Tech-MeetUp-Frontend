"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IAdmin } from "@/types/admin.interface";

export const adminsColumns: Column<IAdmin>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <UserInfoCell
        name={admin.name}
        email={admin.email}
        profilePhoto={admin.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact Number",
    accessor: (admin) => (
      <div className="flex flex-col">
        <span className="text-sm">{admin.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Role",
    accessor: (admin) => (
      <div className="flex flex-col">
        <span className="text-sm">{admin.user?.role}</span>
        {/* <span className="text-sm bg-red-500 p-2 font-bold">Role ta Astecena Backend theke</span> */}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (admin) => <StatusBadgeCell isDeleted={admin.isDeleted} />,
  },

  {
    header: "Joined",
    accessor: (admin) => <DateCell date={admin.createdAt} />,
    sortKey: "createdAt",
  },
];

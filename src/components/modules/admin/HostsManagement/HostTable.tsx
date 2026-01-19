"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteUser } from "@/services/user/userService";
import { IHost } from "@/types/host.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { hostsColumns } from "./HostColumns";

interface HostTableProps {
  hosts: IHost[];
}

const HostTable = ({ hosts }: HostTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingHost, setDeletingHost] = useState<IHost | null>(null);
  const [viewingHost, setViewingHost] = useState<IHost | null>(null);
  const [editingHost, setEditingHost] = useState<IHost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: IHost) => {
    setViewingHost(user);
  };

  const handleEdit = (user: IHost) => {
    setEditingHost(user);
  };

  const handleDelete = (user: IHost) => {
    setDeletingHost(user);
  };

  const confirmDelete = async () => {
    if (!deletingHost) return;

    setIsDeleting(true);
    const result = await softDeleteUser(deletingHost.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Patient deleted successfully");
      setDeletingHost(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete patient");
    }
  };

  return (
    <>
      <ManagementTable
        data={hosts}
        columns={hostsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(patient) => patient.id!}
        emptyMessage="No patients found"
      />

      {/* Edit User Form Dialog */}
      {/* <UserFormDialog
        open={!!editingUser}
        onClose={() => setEditingHost(null)}
        user={editingUser!}
        onSuccess={() => {
          setEditingHost(null);
          handleRefresh();
        }}
      /> */}

      {/* View Patient Detail Dialog */}
      {/* <UserViewDetailDialog
        open={!!viewingHost}
        onClose={() => setViewingHost(null)}
        user={viewingHost}
      /> */}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingHost}
        onOpenChange={(open) => !open && setDeletingHost(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingHost?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default HostTable;

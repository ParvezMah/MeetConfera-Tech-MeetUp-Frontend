"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteUser } from "@/services/user/userService";
import { UserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { usersColumns } from "./UserColumn";
import UserFormDialog from "./UserFormDialog";
import UserViewDetailDialog from "./UserViewDetailDialog";

interface UserTableProps {
  users: UserInfo[];
}

const UserTable = ({ users }: UserTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingPatient, setDeletingPatient] = useState<UserInfo | null>(null);
  const [viewingPatient, setViewingPatient] = useState<UserInfo | null>(null);
  const [editingPatient, setEditingPatient] = useState<UserInfo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: UserInfo) => {
    setViewingPatient(user);
  };

  const handleEdit = (user: UserInfo) => {
    setEditingPatient(user);
  };

  const handleDelete = (user: UserInfo) => {
    setDeletingPatient(user);
  };

  const confirmDelete = async () => {
    if (!deletingPatient) return;

    setIsDeleting(true);
    const result = await softDeleteUser(deletingPatient.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Patient deleted successfully");
      setDeletingPatient(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete patient");
    }
  };

  return (
    <>
      <ManagementTable
        data={users}
        columns={usersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(patient) => patient.id!}
        emptyMessage="No patients found"
      />

      {/* Edit User Form Dialog */}
      <UserFormDialog
        open={!!editingPatient}
        onClose={() => setEditingPatient(null)}
        user={editingPatient!}
        onSuccess={() => {
          setEditingPatient(null);
          handleRefresh();
        }}
      />

      {/* View Patient Detail Dialog */}
      <UserViewDetailDialog
        open={!!viewingPatient}
        onClose={() => setViewingPatient(null)}
        user={viewingPatient}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingPatient}
        onOpenChange={(open) => !open && setDeletingPatient(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingPatient?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserTable;

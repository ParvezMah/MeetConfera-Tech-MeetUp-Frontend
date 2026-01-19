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
  const [deletingUser, setDeletingUser] = useState<UserInfo | null>(null);
  const [viewingUser, setViewingUser] = useState<UserInfo | null>(null);
  const [editingUser, setEditingUser] = useState<UserInfo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: UserInfo) => {
    setViewingUser(user);
  };

  const handleEdit = (user: UserInfo) => {
    setEditingUser(user);
  };

  const handleDelete = (user: UserInfo) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;

    setIsDeleting(true);
    const result = await softDeleteUser(deletingUser.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Patient deleted successfully");
      setDeletingUser(null);
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
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        user={editingUser!}
        onSuccess={() => {
          setEditingUser(null);
          handleRefresh();
        }}
      />

      {/* View Patient Detail Dialog */}
      <UserViewDetailDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserTable;

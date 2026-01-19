"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import AdminFormDialog from "./UserFormDialog";

const UserManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };


  // Wrap handleSuccess in useCallback to prevent infinite re-render loop when creating an admin
  // const handleSuccess = useCallback(()=> {
  //   startTransition(() => {
  //     router.refresh();
  //   });
  // }, [router]);

  //force remount to reset state of form
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <>
      <AdminFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Users Management"
        description="Manage Users accounts and permissions"
        action={{
          label: "Add User",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default UserManagementHeader;


// 72-5 Analysing How Refresh Token Will Work In NextJS
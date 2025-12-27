"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { ISpecialty } from "@/types/specialities.interface";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import DoctorFormDialog from "./HostFormDialog";

interface HostManagementHeaderProps {
  specialities?: ISpecialty[];
}

const HostManagementHeader = ({
  specialities,
}: HostManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleSuccess = () => {
  //   startTransition(() => {
  //     router.refresh();
  //   });
  // };

  // Wrap in useCallback to prevent infinite loop
  const handleSuccess = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router, startTransition]);

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  // };

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <>
      <DoctorFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        specialities={specialities}
      />

      <ManagementPageHeader
        title="Doctors Management"
        description="Manage Doctors information and details"
        action={{
          label: "Add Doctor",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default HostManagementHeader;

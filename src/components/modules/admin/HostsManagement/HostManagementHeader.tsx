"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { IEvent } from "@/types/event.interface";
import { IHost } from "@/types/host.interface";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import HostFormDialog from "./HostFormDialog";

interface HostManagementHeaderProps {
  event?: IEvent;
  host?: IHost;
}

const HostManagementHeader = ({
  event,
  host
}: HostManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);


  return (
    <>
      <HostFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        event={event}
        host={host}
      />

      <ManagementPageHeader
        title="Hosts Management"
        description="Manage Hosts information and details"
        // action={{
        //   label: "Add Host",
        //   icon: Plus,
        //   onClick: handleOpenDialog,
        // }}
      />
    </>
  );
};

export default HostManagementHeader;

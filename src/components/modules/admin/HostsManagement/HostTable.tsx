"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IEvent } from "@/types/event.interface";
import { IHost } from "@/types/host.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { HostColumns } from "./HostColumns";
import HostFormDialog from "./HostFormDialog";
import HostViewDetailDialog from "./HostViewDetailDialog";
import { softDeleteHost } from "@/services/admin/hostsManagement";

interface HostTableProps {
  doctors: IHost[];
  specialities: IEvent[];
}

const HostTable = ({ doctors, specialities }: HostTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingHost, setDeletingHost] = useState<IHost | null>(null);
  const [viewingHost, setViewingHost] = useState<IHost | null>(null); //
  const [editingDoctor, setEditingDoctor] = useState<IHost | null>(null); // now created
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // now created
  const handleView = (doctor: IHost) => {
    setViewingHost(doctor);
  };

  // now created
  const handleEdit = (doctor: IHost) => {
    setEditingDoctor(doctor);
  };

  const handleDelete = (doctor: IHost) => {
    setDeletingHost(doctor);
  };

  const confirmDelete = async () => {
    if (!deletingHost) return;

    setIsDeleting(true);
    const result = await softDeleteHost(deletingHost.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Doctor deleted successfully");
      setDeletingHost(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };

  return (
    <>
      <ManagementTable
        data={doctors}
        columns={HostColumns}
        onView={handleView} // now created
        onEdit={handleEdit} // now created
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No doctors found"
      />
      {/* now created this */}
      {/* Edit Doctor Form Dialog */}
      <HostFormDialog
        open={!!editingDoctor}
        onClose={() => setEditingDoctor(null)}
        onSuccess={() => {
          setEditingDoctor(null);
          handleRefresh();
        }}
      />

      {/* View Doctor Detail Dialog */}
      <HostViewDetailDialog
        open={!!viewingHost}
        onClose={() => setViewingHost(null)}
        host={viewingHost}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingHost}
        onOpenChange={(open) => !open && setDeletingHost(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingHost?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default HostTable;
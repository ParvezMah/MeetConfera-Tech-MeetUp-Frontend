"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { getHosts, softDeleteHost } from "@/services/admin/hostsManagement";
import { IHost } from "@/types/host.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { HostColumns } from "./HostColumns";
import HostFormDialog from "./HostFormDialog";
import HostViewDetailDialog from "./HostViewDetailDialog";

interface HostTableProps {
  hosts: IHost[];
}

const HostTable = ({ hosts }: HostTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingHost, setDeletingHost] = useState<IHost | null>(null);
  const [viewingHost, setViewingHost] = useState<IHost | null>(null); //
  const [editingHost, setEditingHost] = useState<IHost | null>(null); // now created
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // now created
  const handleView = (hosts: IHost) => {
    setViewingHost(hosts);
  };

  // now created
  const handleEdit = (hosts: IHost) => {
    setEditingHost(hosts);
  };

  const handleDelete = (hosts: IHost) => {
    setDeletingHost(hosts);
  };

  const confirmDelete = async () => {
    if (!deletingHost) return;

    setIsDeleting(true);
    const result = await softDeleteHost(deletingHost.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Host deleted successfully");
      setDeletingHost(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete Host");
    }
  };

  return (
    <>
      <ManagementTable
        data={hosts}
        columns={HostColumns}
        onView={handleView} // now created
        onEdit={handleEdit} // now created
        onDelete={handleDelete}
        getRowKey={(hosts) => hosts.id!}
        emptyMessage="No Hosts found"
      />
      {/* now created this */}
      {/* Edit Host Form Dialog */}
      <HostFormDialog
        open={!!editingHost}
        onClose={() => setEditingHost(null)}
        host={editingHost!}
        onSuccess={() => {
          setEditingHost(null);
          handleRefresh();
        }}
      />

      {/* View Host Detail Dialog */}
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
        title="Delete Host"
        description={`Are you sure you want to delete ${deletingHost?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default HostTable;
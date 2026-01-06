
import HostManagementHeader from "@/components/modules/admin/HostsManagement/HostManagementHeader";
import HostTable from "@/components/modules/admin/HostsManagement/HostTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getHosts } from "@/services/admin/hostsManagement";
import { Suspense } from "react";

const AdminHostManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
  const hostsResult = await getHosts(queryString);
  const totalPages = Math.ceil(
    (hostsResult?.meta?.total || 1) / (hostsResult?.meta?.limit || 1)
  );
  return (
    <div className="space-y-6">
      <HostManagementHeader />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <HostTable
          hosts={hostsResult.data}
        />
        <TablePagination
          currentPage={hostsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminHostManagementPage;

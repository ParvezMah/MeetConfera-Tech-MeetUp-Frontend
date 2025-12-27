
import HostFilters from "@/components/modules/admin/HostsManagement/HostFilters";
import HostManagementHeader from "@/components/modules/admin/HostsManagement/HostManagementHeader";
import HostTable from "@/components/modules/admin/HostsManagement/HostTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getHosts } from "@/services/admin/hostsManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";

const AdminHostManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
  const specialitiesResult = await getSpecialities();
  const hostsResult = await getHosts(queryString);
  console.log({ hostsResult });
  const totalPages = Math.ceil(
    (hostsResult?.meta?.total || 1) / (hostsResult?.meta?.limit || 1)
  );
  return (
    <div className="space-y-6">
      <HostManagementHeader specialities={specialitiesResult?.data || []} />
      <HostFilters specialties={specialitiesResult?.data || []} />
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <HostTable
          doctors={hostsResult.data}
          specialities={specialitiesResult?.data || []}
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

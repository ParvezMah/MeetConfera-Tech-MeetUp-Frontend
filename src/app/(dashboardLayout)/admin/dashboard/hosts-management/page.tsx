import HostManagementHeader from "@/components/modules/admin/HostsManagement/HostManagementHeader";
import { getAllHosts } from "@/services/admin/admin-hostManagement";
import { Suspense } from "react";


const HostsManagementPage = async (
    { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) => {
//   const searchParamsObj = await searchParams;
//   const queryString = queryStringFormatter(searchParamsObj);
  const allHosts = await getAllHosts();

    return (
        <div className="space-y-6">
            <HostManagementHeader/>
            <h1>Host Filters</h1>
            <Suspense fallback={<div>Loading Hosts...</div>}>
                <h1>Hosts Table</h1>
                <h1>Table Pagination</h1>
            </Suspense>
        </div>
    );
};

export default HostsManagementPage;
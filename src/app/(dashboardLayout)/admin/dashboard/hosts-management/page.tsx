import HostFilter from "@/components/modules/admin/HostsManagement/HostFilters";
import HostManagementHeader from "@/components/modules/admin/HostsManagement/HostManagementHeader";
import HostTable from "@/components/modules/admin/HostsManagement/HostTable";
import { getAllHosts } from "@/services/admin/admin-hostManagement";
import { Suspense } from "react";


const HostsManagementPage = async (
    { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) => {
//   const searchParamsObj = await searchParams;
//   const queryString = queryStringFormatter(searchParamsObj);
  const allHosts = await getAllHosts();
  const hosts = allHosts?.data;
  console.log("allHosts : ", allHosts)
  console.log("hosts : ", hosts)

    return (
        <div className="space-y-6">
            <HostManagementHeader/>
            <HostFilter/>
            <Suspense fallback={<div>Loading Hosts...</div>}>
                <HostTable hosts={hosts}/>
                <h1>Table Pagination</h1>
            </Suspense>
        </div>
    );
};

export default HostsManagementPage;
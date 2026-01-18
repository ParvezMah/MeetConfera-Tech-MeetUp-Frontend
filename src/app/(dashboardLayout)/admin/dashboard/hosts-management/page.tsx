import { getAllHosts, getSingleHost } from "@/services/admin/admin-hostManagement";


const HostsManagementPage = async () => {
    const AllHosts = await getAllHosts()
    const hostId = "88458e7b-449b-4399-911a-ec11bc31d466";
    const SingleHost = await getSingleHost(hostId)

    console.log("All Hosts : ", AllHosts)
    console.log("Single Host : ", SingleHost)
    return (
        <div className="space-y-6">
            <h1>Hosts Management</h1>
            {/* <h1>All Hosts : {AllHosts}</h1> */}
        </div>
    );
};

export default HostsManagementPage;
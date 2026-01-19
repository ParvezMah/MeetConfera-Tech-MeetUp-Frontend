import UserFilter from "@/components/modules/admin/UsersManagement/UserFilter";
import UserManagementHeader from "@/components/modules/admin/UsersManagement/UserManagementHeader";
import UserTable from "@/components/modules/admin/UsersManagement/UserTable";
import TablePagination from "@/components/shared/TablePagination";
import { getAllUsers, getMyProfile, updateMyProfile } from "@/services/admin/admin-userManagement";
import { Suspense } from "react";

const AdminUsersManagementsPage = async () => {
    // 1. get all users
    const allUsers = await getAllUsers();
    const users = allUsers?.data ?? [];


    // 2. get my profile
    const myProfile = await getMyProfile();

    const totalPages = Math.ceil(
        (allUsers?.meta?.total || 1) / (allUsers?.meta?.limit || 1)
    );

      return (
        <div className="space-y-6">
        <div className="space-y-6">
            <UserManagementHeader/>
            <UserFilter/>
            <Suspense fallback={<div>Loading Users...</div>}>
                <UserTable users={users}/>
                <TablePagination
                    currentPage={allUsers?.data?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
        </div>
    );
};

export default AdminUsersManagementsPage;

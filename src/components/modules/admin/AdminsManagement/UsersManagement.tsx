
import { getAllUsers } from "@/services/user/userService";


import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UpdateStatusButton from "@/services/admin/UpdateStatusButton";
import Image from "next/image";


type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null; 
  contactNumber?: string | null; 
  location?: string | null; 
  profilePhoto?: string | null;
  status?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

// Server component (Next.js app router) — keeps the async data fetching at the top level
const UsersManagement = async () => {
  const res = await getAllUsers({ role: "USER" }, { page: 1, limit: 50 });
  const users: User[] = Array.isArray(res?.data) ? res.data : [];

  if (!res || res.success === false) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Failed to load Users: {res?.message ?? "Unknown error"}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Users Management</h2>
        <div className="flex items-center gap-3">
          <Input placeholder="Search by email or name" className="max-w-sm" />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="w-full overflow-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm text-muted-foreground">
                  <th className="text-left p-4">Photo</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Contact Number</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t last:border-b">
                    
                    {/* Profile Photo */}
                    <td className="p-4">
                        <Avatar className="h-9 w-9 font-bold">
                          {u.email ? (
                            <AvatarFallback>{u.email.charAt(0).toUpperCase()}</AvatarFallback>
                          ) : (
                            <AvatarFallback>H</AvatarFallback>
                          )}
                        </Avatar>

                        {/* <Image src={u.profilePhoto} width={10} height={10} alt="profilePhoto"/> */}
                    </td>

                    {/* Name */}
                    <td className="p-4">
                        <div className="font-semibold truncate">{u.name ?? "-"}</div>
                    </td>
                    
                    {/* Email */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">

                        <div className="min-w-0">
                          <div className="font-semibold truncate">{u.email ?? "-"}</div>
                          <div className="text-xs text-muted-foreground truncate">Joined: {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="p-4">
                      <div className="font-semibold">{u.role ?? "-"}</div>
                    </td>

                    {/* Contact Number */}
                    <td className="p-4">
                      <div className="font-semibold">{u.contactNumber ?? "-"}</div>
                    </td>

                    {/* Location */}
                    <td className="p-4">
                      <div className="font-semibold">{u.location ?? "-"}</div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <Badge className="p-2 font-bold" variant={u.status === 'ACTIVE' ? 'success' : 'warning'}>
                        {u.status ?? "-"}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <UpdateStatusButton resource="users" id={u.id} currentStatus={u.status ?? "ACTIVE"} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;



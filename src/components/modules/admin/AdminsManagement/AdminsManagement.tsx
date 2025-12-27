
import { getAllAdmins } from "@/services/user/userService";


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


type Admin = {
  id: string;
  name?: string | null;
  email?: string | null;
  user: {
    role?: string | null;
    status?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
};

// Server component (Next.js app router) — keeps the async data fetching at the top level
const AdminsManagement = async () => {
  const res = await getAllAdmins({ role: "ADMIN" }, { page: 1, limit: 50 });
  const admins: Admin[] = Array.isArray(res?.data) ? res.data : [];

  if (!res || res.success === false) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Admins Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Failed to load Admins: {res?.message ?? "Unknown error"}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Admins Management</h2>
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
                  <th className="text-left pl-6 py-3">Admin</th>
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Role</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-right pr-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((u) => (
                  <tr key={u.id} className="border-t last:border-b">
                    <td className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {u?.email ? (
                            <AvatarFallback>{u?.email.charAt(0).toUpperCase()}</AvatarFallback>
                          ) : (
                            <AvatarFallback>H</AvatarFallback>
                          )}
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{u?.email ?? "-"}</div>
                          <div className="text-xs text-muted-foreground truncate">Joined: {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="text-sm">{u?.name ?? "-"}</div>
                    </td>

                    <td className="py-4">
                      <div className="text-sm">{u?.user?.role ?? "-"}</div>
                    </td>

                    <td className="py-4">
                      <Badge variant={u?.user?.status === 'ACTIVE' ? 'secondary' : 'outline'}>
                        {u?.user?.status ?? "-"}
                      </Badge>
                    </td>

                    <td className="pr-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <UpdateStatusButton resource="admins" id={u.id} currentStatus={u?.user?.status ?? "ACTIVE"} />

                       
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

export default AdminsManagement;



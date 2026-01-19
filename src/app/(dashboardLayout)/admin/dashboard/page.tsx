/* eslint-disable @typescript-eslint/no-explicit-any */

interface AdminDashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AdminDashboardPage = async ({ searchParams }: AdminDashboardPageProps) => {

  return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your Admins and track your performance
        </p>
      </div>
  );
};

export default AdminDashboardPage;

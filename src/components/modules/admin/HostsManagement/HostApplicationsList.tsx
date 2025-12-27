
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HostApplicationsList = async () => {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Pending Host Applications</h2>
      </div>
    </div>
  );
};

export default HostApplicationsList;


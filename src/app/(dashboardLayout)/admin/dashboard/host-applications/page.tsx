import HostApplicationsList from '@/components/modules/admin/HostsManagement/HostApplicationsList';
import React from 'react';

const HostApplicationsPage = async () => {
    return (
        <div className="space-y-6">
            <HostApplicationsList />
        </div>
    );
};

export default HostApplicationsPage;
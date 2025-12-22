"use client"
import { useState } from 'react';
import { Ban, Calendar, DollarSign, Edit, Eye, Search, Trash2, UserCheck, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalUsers: 1247,
    totalHosts: 89,
    activeEvents: 156,
    revenue: 24580
  };

  const recentUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active', joinedDate: '2024-12-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Host', status: 'Active', joinedDate: '2024-12-14' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'User', status: 'Suspended', joinedDate: '2024-12-13' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Host', status: 'Active', joinedDate: '2024-12-12' },
    { id: 5, name: 'Emma Davis', email: 'emma@example.com', role: 'User', status: 'Active', joinedDate: '2024-12-11' }
  ];

  const recentEvents = [
    { id: 1, title: 'City Marathon 2024', host: 'Bob Smith', participants: 25, maxParticipants: 30, status: 'Open', date: '2024-12-28', fee: 50 },
    { id: 2, title: 'Jazz Night Downtown', host: 'Sarah Lee', participants: 15, maxParticipants: 20, status: 'Open', date: '2024-12-25', fee: 25 },
    { id: 3, title: 'Board Game Meetup', host: 'Mike Wilson', participants: 8, maxParticipants: 8, status: 'Full', date: '2024-12-24', fee: 0 },
    { id: 4, title: 'Hiking Adventure', host: 'Lisa Chen', participants: 12, maxParticipants: 15, status: 'Open', date: '2024-12-30', fee: 35 },
    { id: 5, title: 'Cooking Workshop', host: 'Tom Garcia', participants: 0, maxParticipants: 12, status: 'Cancelled', date: '2024-12-26', fee: 40 }
  ];

  const recentHosts = [
    { id: 1, name: 'Bob Smith', email: 'bob@example.com', eventsHosted: 12, rating: 4.8, status: 'Active', revenue: 1200 },
    { id: 2, name: 'Sarah Lee', email: 'sarah@example.com', eventsHosted: 8, rating: 4.9, status: 'Active', revenue: 850 },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', eventsHosted: 15, rating: 4.6, status: 'Active', revenue: 1500 },
    { id: 4, name: 'Lisa Chen', email: 'lisa@example.com', eventsHosted: 6, rating: 4.7, status: 'Suspended', revenue: 620 }
  ];

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const ActionButton = ({ icon: Icon, onClick, color = "text-gray-600 hover:text-gray-900" }) => (
    <button onClick={onClick} className={`p-1 rounded ${color} transition-colors`}>
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your MeetConfera platform</p>
            </div>
            {/* <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@meetconfera.com</p>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div> */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change={12}
            color="bg-blue-600"
          />
          <StatCard
            icon={UserCheck}
            title="Active Hosts"
            value={stats.totalHosts}
            change={8}
            color="bg-green-600"
          />
          <StatCard
            icon={Calendar}
            title="Active Events"
            value={stats.activeEvents}
            change={-3}
            color="bg-purple-600"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            change={15}
            color="bg-orange-600"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              {['overview', 'users', 'hosts', 'events'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          {activeTab !== 'overview' && (
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">New user registered: <strong>Emma Davis</strong></span>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Event created: <strong>City Marathon 2024</strong></span>
                      </div>
                      <span className="text-xs text-gray-500">5 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Payment received: <strong>$50 from Jazz Night</strong></span>
                      </div>
                      <span className="text-xs text-gray-500">8 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'Host' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{user.joinedDate}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <ActionButton icon={Eye} onClick={() => console.log('View', user.id)} />
                            <ActionButton icon={Edit} onClick={() => console.log('Edit', user.id)} />
                            <ActionButton icon={Ban} onClick={() => console.log('Suspend', user.id)} color="text-red-600 hover:text-red-800" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'hosts' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Host</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Events</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentHosts.map((host) => (
                      <tr key={host.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium text-sm">
                              {host.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{host.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{host.email}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">{host.eventsHosted}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-gray-900">{host.rating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">${host.revenue}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            host.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {host.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <ActionButton icon={Eye} onClick={() => console.log('View', host.id)} />
                            <ActionButton icon={Edit} onClick={() => console.log('Edit', host.id)} />
                            <ActionButton icon={Ban} onClick={() => console.log('Suspend', host.id)} color="text-red-600 hover:text-red-800" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Event</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Host</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Participants</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fee</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((event) => (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900">{event.title}</span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{event.host}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {event.participants}/{event.maxParticipants}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{event.date}</td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">
                          {event.fee === 0 ? 'Free' : `$${event.fee}`}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === 'Open' ? 'bg-green-100 text-green-700' :
                            event.status === 'Full' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <ActionButton icon={Eye} onClick={() => console.log('View', event.id)} />
                            <ActionButton icon={Edit} onClick={() => console.log('Edit', event.id)} />
                            <ActionButton icon={Trash2} onClick={() => console.log('Delete', event.id)} color="text-red-600 hover:text-red-800" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;







// const AdminDashboardPage = () => {
//   return <div>AdminDashboardPage</div>;
// };

// export default AdminDashboardPage;

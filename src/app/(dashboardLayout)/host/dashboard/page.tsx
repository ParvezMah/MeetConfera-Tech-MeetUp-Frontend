"use client"
import { useState } from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Plus, Search, Eye, Edit, Trash2, Copy, Share2, Star, Clock, MapPin, ChevronRight, Filter } from 'lucide-react';

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const hostInfo = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    rating: 4.8,
    totalReviews: 47,
    memberSince: 'Jan 2024'
  };

  const stats = {
    totalEvents: 24,
    activeEvents: 8,
    totalParticipants: 342,
    totalRevenue: 8450,
    upcomingEvents: 5,
    completedEvents: 16
  };

  const myEvents = [
    { 
      id: 1, 
      title: 'Jazz Night Downtown', 
      date: '2024-12-25', 
      time: '19:00',
      location: 'Blue Note Jazz Club',
      participants: 15, 
      maxParticipants: 20, 
      status: 'Open', 
      fee: 25,
      revenue: 375,
      image: '🎵'
    },
    { 
      id: 2, 
      title: 'Yoga & Meditation Morning', 
      date: '2024-12-26', 
      time: '07:00',
      location: 'Central Park',
      participants: 12, 
      maxParticipants: 15, 
      status: 'Open', 
      fee: 15,
      revenue: 180,
      image: '🧘'
    },
    { 
      id: 3, 
      title: 'Photography Walk', 
      date: '2024-12-24', 
      time: '10:00',
      location: 'Historic District',
      participants: 8, 
      maxParticipants: 8, 
      status: 'Full', 
      fee: 20,
      revenue: 160,
      image: '📷'
    },
    { 
      id: 4, 
      title: 'Cooking Workshop: Italian Cuisine', 
      date: '2024-12-30', 
      time: '18:00',
      location: 'Culinary Studio',
      participants: 6, 
      maxParticipants: 12, 
      status: 'Open', 
      fee: 45,
      revenue: 270,
      image: '🍝'
    },
    { 
      id: 5, 
      title: 'Beach Volleyball Tournament', 
      date: '2024-12-28', 
      time: '14:00',
      location: 'Sunset Beach',
      participants: 20, 
      maxParticipants: 24, 
      status: 'Open', 
      fee: 10,
      revenue: 200,
      image: '🏐'
    },
    { 
      id: 6, 
      title: 'Wine Tasting Experience', 
      date: '2024-12-22', 
      time: '19:00',
      location: 'Vintage Cellar',
      participants: 0, 
      maxParticipants: 15, 
      status: 'Cancelled', 
      fee: 35,
      revenue: 0,
      image: '🍷'
    }
  ];

  const recentParticipants = [
    { id: 1, name: 'Alex Thompson', event: 'Jazz Night Downtown', joinedDate: '2024-12-20', paid: 25 },
    { id: 2, name: 'Maria Garcia', event: 'Yoga & Meditation Morning', joinedDate: '2024-12-20', paid: 15 },
    { id: 3, name: 'James Wilson', event: 'Photography Walk', joinedDate: '2024-12-19', paid: 20 },
    { id: 4, name: 'Emma Davis', event: 'Beach Volleyball Tournament', joinedDate: '2024-12-19', paid: 10 },
    { id: 5, name: 'Oliver Brown', event: 'Cooking Workshop', joinedDate: '2024-12-18', paid: 45 }
  ];

  const reviews = [
    { id: 1, userName: 'Alex Thompson', event: 'Jazz Night Downtown', rating: 5, comment: 'Amazing event! Sarah was a great host and the venue was perfect.', date: '2024-12-15' },
    { id: 2, userName: 'Maria Garcia', event: 'Sunset Hike', rating: 5, comment: 'Well organized and fun experience. Highly recommend!', date: '2024-12-10' },
    { id: 3, userName: 'James Wilson', event: 'Art Gallery Tour', rating: 4, comment: 'Great event, very informative. Would attend again.', date: '2024-12-08' }
  ];

  const filteredEvents = myEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{event.image}</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.status === 'Open' ? 'bg-green-100 text-green-700' :
            event.status === 'Full' ? 'bg-blue-100 text-blue-700' :
            'bg-red-100 text-red-700'
          }`}>
            {event.status}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Participants</p>
            <p className="text-lg font-semibold text-gray-900">{event.participants}/{event.maxParticipants}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Fee</p>
            <p className="text-lg font-semibold text-gray-900">{event.fee === 0 ? 'Free' : `$${event.fee}`}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Revenue</p>
            <p className="text-lg font-semibold text-green-600">${event.revenue}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your events and track performance</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                <Plus className="w-5 h-5" />
                Create Event
              </button>
              {/* <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{hostInfo.name}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-600">{hostInfo.rating} ({hostInfo.totalReviews} reviews)</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {hostInfo.name.charAt(0)}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Calendar}
            title="Total Events"
            value={stats.totalEvents}
            subtitle={`${stats.activeEvents} currently active`}
            color="bg-purple-600"
            trend={12}
          />
          <StatCard
            icon={Users}
            title="Total Participants"
            value={stats.totalParticipants}
            subtitle="All time"
            color="bg-blue-600"
            trend={8}
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            subtitle="Lifetime earnings"
            color="bg-green-600"
            trend={15}
          />
          <StatCard
            icon={TrendingUp}
            title="Completed Events"
            value={stats.completedEvents}
            subtitle={`${stats.upcomingEvents} upcoming`}
            color="bg-orange-600"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              {['overview', 'my-events', 'participants', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Upcoming Events</span>
                        <span className="text-xl font-bold text-purple-600">{stats.upcomingEvents}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Active Participants</span>
                        <span className="text-xl font-bold text-blue-600">
                          {myEvents.reduce((sum, e) => e.status === 'Open' ? sum + e.participants : sum, 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">This Month Revenue</span>
                        <span className="text-xl font-bold text-green-600">$1,240</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {recentParticipants.slice(0, 5).map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                              {participant.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                              <p className="text-xs text-gray-500">Joined {participant.event}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-green-600">${participant.paid}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Performing Events */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top Performing Events</h3>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {myEvents.filter(e => e.status !== 'Cancelled').slice(0, 3).map((event) => (
                      <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">{event.image}</div>
                        <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{event.participants} participants</span>
                          <span className="font-medium text-green-600">${event.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'my-events' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="full">Full</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'participants' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Participant</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Event</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount Paid</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentParticipants.map((participant) => (
                      <tr key={participant.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                              {participant.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{participant.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{participant.event}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{participant.joinedDate}</td>
                        <td className="py-4 px-4 text-sm font-medium text-green-600">${participant.paid}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1 rounded text-gray-600 hover:text-gray-900 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Your Rating</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-6 h-6 ${star <= Math.floor(hostInfo.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xl font-semibold text-gray-900">{hostInfo.rating}</span>
                      <span className="text-gray-600">({hostInfo.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{review.userName}</p>
                            <p className="text-sm text-gray-600">{review.event}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
"use client"
import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Star, Filter, Search, ChevronDown, Download, Share2, X, Check, AlertCircle } from 'lucide-react';

const MyEventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock events data
  // const upcomingEvents = [
  //   {
  //     id: 1,
  //     name: "Jazz Night at Blue Moon",
  //     type: "Music",
  //     date: "2025-01-15",
  //     time: "19:00",
  //     location: "Downtown Jazz Club",
  //     address: "123 Music Street, City Center",
  //     host: {
  //       name: "Sarah Miller",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  //       rating: 4.9
  //     },
  //     participants: 8,
  //     maxParticipants: 12,
  //     image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
  //     fee: 25,
  //     status: "confirmed",
  //     joinedDate: "2024-12-20",
  //     description: "Join us for an evening of smooth jazz and great company. Perfect for jazz enthusiasts!"
  //   },
  //   {
  //     id: 2,
  //     name: "Morning Hiking Trail",
  //     type: "Sports",
  //     date: "2025-01-20",
  //     time: "07:00",
  //     location: "Mountain Ridge Trail",
  //     address: "Mountain Park Entrance, North Side",
  //     host: {
  //       name: "Mike Chen",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  //       rating: 4.7
  //     },
  //     participants: 6,
  //     maxParticipants: 10,
  //     image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
  //     fee: 0,
  //     status: "confirmed",
  //     joinedDate: "2024-12-18",
  //     description: "Early morning hike through scenic mountain trails. Bring water and comfortable shoes!"
  //   },
  //   {
  //     id: 3,
  //     name: "Tech Meetup: AI & Future",
  //     type: "Tech",
  //     date: "2025-01-25",
  //     time: "18:30",
  //     location: "Innovation Hub",
  //     address: "456 Tech Boulevard, Downtown",
  //     host: {
  //       name: "Emily Rodriguez",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  //       rating: 4.8
  //     },
  //     participants: 15,
  //     maxParticipants: 20,
  //     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  //     fee: 15,
  //     status: "confirmed",
  //     joinedDate: "2024-12-22",
  //     description: "Discuss the latest AI trends and network with tech professionals."
  //   },
  //   {
  //     id: 4,
  //     name: "Sunset Photography Walk",
  //     type: "Art",
  //     date: "2025-02-01",
  //     time: "17:30",
  //     location: "Riverside Park",
  //     address: "Riverside Park Main Entrance",
  //     host: {
  //       name: "Alex Turner",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  //       rating: 4.6
  //     },
  //     participants: 5,
  //     maxParticipants: 8,
  //     image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
  //     fee: 20,
  //     status: "pending",
  //     joinedDate: "2025-01-05",
  //     description: "Capture beautiful sunset moments with fellow photography enthusiasts."
  //   }
  // ];

  const pastEvents = [
    {
      id: 5,
      name: "Art Gallery Opening",
      type: "Art",
      date: "2024-12-10",
      location: "Modern Art Gallery",
      host: {
        name: "David Kim",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        rating: 4.9
      },
      myRating: 5,
      image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop",
      attended: true
    },
    {
      id: 6,
      name: "Board Game Night",
      type: "Gaming",
      date: "2024-12-05",
      location: "Game Cafe Central",
      host: {
        name: "Lisa Wang",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        rating: 4.7
      },
      myRating: 4,
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
      attended: true
    },
    {
      id: 7,
      name: "Cooking Workshop",
      type: "Food",
      date: "2024-11-28",
      location: "Culinary Studio",
      host: {
        name: "Maria Garcia",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        rating: 4.8
      },
      myRating: 0,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
      attended: false
    }
  ];

  const eventTypes = ['all', 'Music', 'Sports', 'Tech', 'Art', 'Gaming', 'Food'];

  const getFilteredEvents = (events) => {
    let filtered = events;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(event => event.type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // If you have upcoming events data available, replace the empty array below
  // or uncomment the mock `upcomingEvents` block above.
  const upcomingEvents = [];
  const filteredUpcoming = getFilteredEvents(upcomingEvents);
  const filteredPast = getFilteredEvents(pastEvents);

  const renderStarRating = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handleCancelEvent = (event) => {
    setSelectedEvent(event);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    // Guard in case selectedEvent is null (defensive)
    if (!selectedEvent) {
      setShowCancelModal(false);
      return;
    }

    // Handle cancel logic here
    console.log('Cancelling event:', selectedEvent?.id);
    setShowCancelModal(false);
    setSelectedEvent(null);
  };

  interface HostInfo {
    name: string;
    image: string;
    rating: number;
  }

  interface UpcomingEvent {
    id: number;
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    address: string;
    host: HostInfo;
    participants: number;
    maxParticipants: number;
    image: string;
    fee: number;
    status: 'confirmed' | 'pending';
    joinedDate: string;
    description: string;
  }

  const renderUpcomingEventCard = (event: UpcomingEvent) => (
    <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {event.type}
          </span>
        </div>
        {event.status === 'confirmed' && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Check size={16} />
              Confirmed
            </span>
          </div>
        )}
        {event.status === 'pending' && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Clock size={16} />
              Pending
            </span>
          </div>
        )}
        {event.fee > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              ${event.fee}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-3">{event.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <Clock size={16} className="ml-4 mr-2 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <img 
              src={event.host.image} 
              alt={event.host.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium truncate">
                {event.host.name}
              </p>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{event.host.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center text-gray-600 text-sm">
              <Users size={16} className="mr-2" />
              <span>{event.participants}/{event.maxParticipants}</span>
            </div>
            <span className="text-xs text-gray-500">
              Joined {new Date(event.joinedDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            View Details
          </button>
          <button 
            onClick={() => handleCancelEvent(event)}
            className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPastEventCard = (event) => (
    <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover grayscale-[30%]"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {event.type}
          </span>
        </div>
        {!event.attended && (
          <div className="absolute top-3 left-3">
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Missed
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-3">{event.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={16} className="mr-2" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <img 
              src={event.host.image} 
              alt={event.host.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-900 font-medium">
                {event.host.name}
              </p>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{event.host.rating}</span>
              </div>
            </div>
          </div>

          {event.attended && (
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Your Rating:</span>
                {event.myRating > 0 ? (
                  renderStarRating(event.myRating)
                ) : (
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Rate Event
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm">
            View Details
          </button>
          {event.attended && event.myRating === 0 && (
            <button className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm">
              Rate & Review
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">My Events</h1>
          <p className="text-blue-100">Manage your event participations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Upcoming</p>
                <p className="text-3xl font-bold text-blue-600">{upcomingEvents.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
          </div> */}
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">{pastEvents.filter(e => e.attended).length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Missed</p>
                <p className="text-3xl font-bold text-gray-600">{pastEvents.filter(e => !e.attended).length}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <X className="text-gray-600" size={24} />
              </div>
            </div>
          </div>
          
          {/* <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Events</p>
                <p className="text-3xl font-bold text-purple-600">{upcomingEvents.length + pastEvents.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="text-purple-600" size={24} />
              </div>
            </div>
          </div> */}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={20} />
                <span>{filterType === 'all' ? 'All Types' : filterType}</span>
                <ChevronDown size={16} />
              </button>
              
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        filterType === type ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {type === 'all' ? 'All Types' : type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={20} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming ({filteredUpcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'past'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events ({filteredPast.length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="pb-12">
          {activeTab === 'upcoming' && (
            <>
              {filteredUpcoming.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUpcoming.map(event => renderUpcomingEventCard(event))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No upcoming events found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery || filterType !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Start exploring events to join!'
                    }
                  </p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Explore Events
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'past' && (
            <>
              {filteredPast.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPast.map(event => renderPastEventCard(event))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No past events found</h3>
                  <p className="text-gray-500">
                    {searchQuery || filterType !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Your event history will appear here'
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Event?</h3>
                <p className="text-gray-600 text-sm">
                  Are you sure you want to cancel your participation in "{selectedEvent.name}"?
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Cancellation policy applies. Check the event details for refund information.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Event
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
"use client"
import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Star, Heart, TrendingUp, Award, DollarSign, Search } from 'lucide-react';
import Image from 'next/image';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data
  const user = {
    name: "Alex Johnson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    joinedEvents: 12,
    rating: 4.8,
    interests: ["Music", "Sports", "Tech", "Art"]
  };

  // My events
  const myEvents = [
    {
      id: 1,
      name: "Jazz Night at Blue Moon",
      type: "Music",
      date: "2025-01-15",
      time: "19:00",
      location: "Downtown Jazz Club",
      host: "Sarah Miller",
      participants: 8,
      maxParticipants: 12,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
      fee: 25,
      status: "confirmed"
    },
    {
      id: 2,
      name: "Morning Hiking Trail",
      type: "Sports",
      date: "2025-01-20",
      time: "07:00",
      location: "Mountain Ridge Trail",
      host: "Mike Chen",
      participants: 6,
      maxParticipants: 10,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
      fee: 0,
      status: "confirmed"
    },
    {
      id: 3,
      name: "Tech Meetup: AI & Future",
      type: "Tech",
      date: "2025-01-25",
      time: "18:30",
      location: "Innovation Hub",
      host: "Emily Rodriguez",
      participants: 15,
      maxParticipants: 20,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      fee: 15,
      status: "confirmed"
    }
  ];

  // // past events
  // const pastEvents = [
  //   {
  //     id: 4,
  //     name: "Art Gallery Opening",
  //     type: "Art",
  //     date: "2024-12-10",
  //     location: "Modern Art Gallery",
  //     host: "David Kim",
  //     rating: 5,
  //     image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop"
  //   },
  //   {
  //     id: 5,
  //     name: "Board Game Night",
  //     type: "Gaming",
  //     date: "2024-12-05",
  //     location: "Game Cafe Central",
  //     host: "Lisa Wang",
  //     rating: 4,
  //     image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop"
  //   }
  // ];

  // //  saved events
  // const savedEvents = [
  //   {
  //     id: 6,
  //     name: "Sunset Kayaking Adventure",
  //     type: "Sports",
  //     date: "2025-02-05",
  //     time: "17:00",
  //     location: "Riverside Marina",
  //     host: "Tom Harris",
  //     participants: 4,
  //     maxParticipants: 8,
  //     image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  //     fee: 40
  //   }
  // ];

  const stats = [
    { label: "Events Joined", value: user.joinedEvents, icon: Calendar, color: "bg-blue-500" },
    { label: "Avg Rating", value: user.rating, icon: Star, color: "bg-yellow-500" },
    // { label: "Saved Events", value: savedEvents.length, icon: Heart, color: "bg-red-500" },
    { label: "Total Spent", value: "$180", icon: DollarSign, color: "bg-green-500" }
  ];

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

  const renderEventCard = (event, isPast = false) => (
    <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {event.type}
          </span>
        </div>
        {!isPast && event.status === 'confirmed' && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
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
            {event.time && <Clock size={16} className="ml-4 mr-2" />}
            {event.time && <span>{event.time}</span>}
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Users size={16} className="mr-2" />
            <span>Hosted by {event.host}</span>
          </div>

          {!isPast && (
            <div className="flex items-center text-gray-600 text-sm">
              <TrendingUp size={16} className="mr-2" />
              <span>{event.participants}/{event.maxParticipants} participants</span>
            </div>
          )}

          {isPast && event.rating && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Your Rating:</span>
              {renderStarRating(event.rating)}
            </div>
          )}
        </div>

        {!isPast ? (
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              View Details
            </button>
            <button className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
              Leave
            </button>
          </div>
        ) : (
          <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium">
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-6">
            <Image 
              src={user.image} 
              width={500}
              height={500}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100 mb-3">Ready for your next adventure?</p>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, idx) => (
                  <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md">
              <Search size={20} />
              Explore Events
            </button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-medium shadow-md">
              <Award size={20} />
              View Profile
            </button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-md">
              <Users size={20} />
              Become a Host
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
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
              Upcoming Events ({myEvents.length})
            </button>
            {/* <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'past'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Saved Events ({savedEvents.length})
            </button> */}
          </div>
        </div>

        {/* Events Grid */}
        <div className="pb-12">
          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map(event => renderEventCard(event))}
            </div>
          )}
{/* 
          {activeTab === 'past' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map(event => renderEventCard(event, true))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map(event => renderEventCard(event))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
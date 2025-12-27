"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventListItem } from '@/components/modules/Host/EventListItem';
import { EventStatCard } from '@/components/modules/Host/EventStatCard';
import { CreateEventModal } from '@/components/modules/Host/CreateEventModal';



export default function HostEventsPage() {
  // It will come from backend
  const [events, setEvents] = useState([
    {
      id: 1,
      eventName: 'React - Accelerator',
      description: 'Explore blockchain technology, cryptocurrency trends, and smart contracts with Sumit Saha. Networking session included.',
      date: '2025-12-28',
      time: '14:00',
      location: 'Dhaka - Startup Arena, Bangladesh',
      maxParticipants: 40,
      minParticipants: 10,
      status: 'OPEN',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D',
      joiningFee: 300,
      category: "BLOCKCHAIN",
      // hostId: "fc0e7dd5-ec81-4d6f-9016-8470d0813172", // Eta dynamically ber kore nite hobe
    }
  ]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredEvents = events.filter(event => 
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || event.status === filterStatus)
  );

  const handleDelete = (id: number) => {
    if (confirm('Delete this event?')) setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-8 px-4 sm:px-8">
        <div className="mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Events</h1>
            <p className="opacity-90">Manage your hosted events</p>
          </div>
          <CreateEventModal />
        </div>
      </div>

      <div className="mx-auto p-4">
        {/* Event Statistics Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <EventStatCard label="Total Events" value={events.length} />
          <EventStatCard label="Published" value={events.filter(e => e.status === 'published').length} color="text-green-600" />
          <EventStatCard label="Registrations" value={events.reduce((sum, e) => sum + e.minParticipants, 0)} color="text-blue-600" />           
          <EventStatCard label="Revenue" value={`$${events.reduce((sum, e) => sum + (e.joiningFee * e.minParticipants), 0).toLocaleString()}`} color="text-purple-600" />
        </div>

        {/* Search Box & Filter Box */}
        <div className="flex gap-4 mb-6">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input className="pl-10" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          {/* Filter Box */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
             <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
             <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
             </SelectContent>
          </Select>
        </div>

        {/* Events Card */}
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <EventListItem key={event.id} event={event} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
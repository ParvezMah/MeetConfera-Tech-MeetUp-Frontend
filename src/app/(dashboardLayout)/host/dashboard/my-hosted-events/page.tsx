"use client"
import { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Plus, Edit2, Trash2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HostEventsPage() {
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
      image: 'https://example.com/images/blockchain-meetup.jpg',
      joiningFee: 300,
      category: "BLOCKCHAIN",
      // hostId: "fc0e7dd5-ec81-4d6f-9016-8470d0813172", // Eta dynamically ber kore nite hobe
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Events</h1>
              <p className="mt-1 opacity-90">Manage and track your hosted events</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold gap-2"
            >
              <Plus size={20} />
              Create Event
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard eventName="Total Events" value={events.length} />
          <StatCard eventName="Published" value={events.filter(e => e.status === 'published').length} color="text-green-600" />
          <StatCard eventName="Registrations" value={events.reduce((sum, e) => sum + e.registered, 0)} color="text-blue-600" />
          <StatCard eventName="Revenue" value={`$${events.reduce((sum, e) => sum + (e.price * e.registered), 0).toLocaleString()}`} color="text-purple-600" />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <img src={event.image} alt={event.eventName} className="w-full md:w-64 h-48 object-cover" />
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.eventName}</h3>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.description}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5"><Calendar size={16} /> {event.date}</div>
                        <div className="flex items-center gap-1.5"><MapPin size={16} /> {event.location}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      event.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Capacity</div>
                      <div className="flex items-center gap-1.5 font-bold text-gray-900">
                        <Users size={16} /> {event.registered}/{event.capacity}
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Price</div>
                      <div className="font-bold text-gray-900">{event.price === 0 ? 'Free' : `$${event.price}`}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Revenue</div>
                      <div className="font-bold text-gray-900">${(event.price * event.registered).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2"><Eye size={16} /> View</Button>
                    <Button variant="outline" size="sm" className="gap-2"><Edit2 size={16} /> Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2" onClick={() => handleDelete(event.id)}>
                      <Trash2 size={16} /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* shadcn Dialog for Create Event */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Event</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input id="eventName" placeholder="e.g. Annual Tech Conference" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Physical address or URL" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="0.00" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your event..." className="min-h-[100px]" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ eventName, value, color = "text-gray-900" }: { eventName: string, value: string | number, color?: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{eventName}</div>
      <div className={`text-3xl font-bold mt-2 ${color}`}>{value}</div>
    </div>
  );
}
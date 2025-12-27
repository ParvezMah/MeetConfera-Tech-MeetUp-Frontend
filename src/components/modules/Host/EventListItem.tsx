import Image from 'next/image';
import { Calendar, MapPin, Users, Eye, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  eventName: string;
  description: string;
  date: string;
  location: string;
  image: string;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  status: string;
}

export function EventListItem({ event, onDelete }: { event: Event, onDelete: (id: number) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 h-48">
           <Image src={event.image} fill alt={event.eventName} className="object-cover" />
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.eventName}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {event.status}
            </span>
          </div>

          <div className="flex gap-4 text-sm text-gray-500 mb-4">
             <div className="flex items-center gap-1"><Calendar size={14}/> {event.date}</div>
             <div className="flex items-center gap-1"><MapPin size={14}/> {event.location}</div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Eye size={16} /> View</Button>
            <Button variant="outline" size="sm" className="gap-2"><Edit2 size={16} /> Edit</Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => onDelete(event.id)}>
              <Trash2 size={16} /> Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
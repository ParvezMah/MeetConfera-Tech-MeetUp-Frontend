"use client";

import TablePagination from '@/components/shared/TablePagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDateTime } from '@/lib/formatters';
import { formatCurrency } from '@/lib/utils';
import {
    Calendar,
    Check,
    DollarSign,
    Edit,
    Eye,
    MapPin,
    MoreVertical,
    Plus,
    Trash2,
    Users,
    XCircle
} from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { IEvent } from '@/types/event.interface';

import EditEventModal from './EditEventModal';
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import CreateEventModal from './CreateEventModal';
import { getHostIdFromToken, isTokenValid } from '@/lib/tokenUtils';



interface Meta {
    page: number;
    limit: number;
    total: number;
    pages: number;
}


interface MyEventsHostProps {
    initialEvents: IEvent[];
    initialMeta: Meta;
}

const MyEventsHost = ({ initialEvents, initialMeta }: MyEventsHostProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);


      // ✅ Safe derived values
    const events = Array.isArray(initialEvents) ? initialEvents : [];
    const meta = initialMeta;
    const hasEvents = events.length > 0;

    // const [currentHostId, setCurrentHostId] = useState<string>('');
    // console.log('Current Host ID:', currentHostId);

    // useEffect(() => {
    //     // Check if token is still valid
    //     if (!isTokenValid()) {
    //         console.warn('⏱️ Token expired, clearing hostId');
    //         setCurrentHostId('');
    //         return;
    //     }

    //     // Get hostId from token using utility function
    //     const hostIdFromToken = getHostIdFromToken();
        
    //     if (hostIdFromToken) {
    //         setCurrentHostId(hostIdFromToken);
    //         console.log('✅ Host ID set from token:', hostIdFromToken);
    //     } else {
    //         // Fallback: Try to get from events
    //         if (events.length > 0 && events[0].host?.id) {
    //             setCurrentHostId(events[0].host.id);
    //             console.log('✅ Host ID set from events:', events[0].host.id);
    //         } else {
    //             console.error('❌ Could not find host ID from token or events');
    //         }
    //     }
    // }, [events]);

    // Debug logging
    useEffect(() => {
        // console.log("MyEventsHost - Events received:", events.length);
        // console.log("MyEventsHost - Events data:", events);
        // console.log("MyEventsHost - Meta:", meta);
    }, [events, meta]);

    // Category options (adjust based on your backend enum)
    const categoryOptions = [
    { label: "All Categories", value: "All" },
    { label: "AI", value: "AI" },
    { label: "Machine Learning", value: "MACHINE_LEARNING" },
    { label: "Data Science", value: "DATA_SCIENCE" },
    { label: "Web Development", value: "WEB_DEVELOPMENT" },
    { label: "Mobile Development", value: "MOBILE_DEVELOPMENT" },
    { label: "Cloud Computing", value: "CLOUD_COMPUTING" },
    { label: "Cyber Security", value: "CYBER_SECURITY" },
    { label: "Blockchain", value: "BLOCKCHAIN" },
    { label: "DevOps", value: "DEVOPS" },
    { label: "Gaming", value: "GAMING" },
    { label: "Robotics", value: "ROBOTICS" },
    { label: "Startups", value: "STARTUPS" },
    { label: "IoT", value: "IOT" },
    { label: "Software Engineering", value: "SOFTWARE_ENGINEERING" },
    { label: "Other", value: "OTHER" },
    ];


        // Status options - must match backend EventStatus enum
    const statusOptions = [
    { label: "All Statuses", value: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Fulfilled", value: "FULLED" },
    { label: "Canceled", value: "CANCELED" },
    { label: "Completed", value: "COMPLETED" },
    ];

    const handleView = (event: IEvent) => {
        router.push(`/explore-events/${event.id}`);
    };

    const handleEdit = (event: IEvent) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (event: IEvent) => {
        if (!confirm(`Are you sure you want to delete "${event}"?`)) {
            return;
        }

        startTransition(async () => {
            try {
                const { deleteEvent } = await import('@/services/host/hostService');
                const result = await deleteEvent(event.id);

                if (result.success) {
                    toast.success('Event deleted successfully');
                    router.refresh();
                } else {
                    toast.error(result.message || 'Failed to delete event');
                }
            } catch (error) {
                toast.error('An error occurred while deleting the event');
            }
        });
    };

    const handleStatusUpdate = async (event: IEvent, newStatus: string) => {
        // Frontend validation based on backend business rules
        const participantCount = event.maxParticipants || 0;



        const isEventPast = new Date(event.date) < new Date();

        // Validation messages
        if (newStatus === 'OPEN') {
            toast.error('Only admin can approve and open events');
            return;
        }

        if (event.status === 'PENDING' && newStatus !== 'CANCELLED') {
            toast.error('Pending events can only be cancelled by host');
            return;
        }

        if (event.status === 'OPEN' && newStatus === 'CANCELLED' && participantCount > 0) {
            toast.error('Cannot cancel event with confirmed bookings. Contact admin.');
            return;
        }

        if (newStatus === 'COMPLETED' && !isEventPast) {
            toast.error('Cannot mark event as completed. Event date has not passed yet.');
            return;
        }

        // Confirmation dialogs
        let confirmMessage = '';
        if (newStatus === 'CANCELLED') {
            confirmMessage = `Are you sure you want to cancel "${event.eventName}"?`;
        } else if (newStatus === 'COMPLETED') {
            confirmMessage = `Mark "${event.eventName}" as completed?`;
        }

        if (confirmMessage && !confirm(confirmMessage)) {
            return;
        }

        startTransition(async () => {
            try {
                const { updateEventStatus } = await import('@/services/host/hostService');
                const result = await updateEventStatus(event.id, newStatus);

                if (result.success) {
                    toast.success(`Event status updated to ${newStatus}`);
                    router.refresh();
                } else {
                    toast.error(result.message || 'Failed to update event status');
                }
            } catch (error) {
                toast.error('An error occurred while updating the event status');
            }
        });
    };

    const canCancelEvent = (event: IEvent) => {
        const participantCount = event.participants?.user?.email || 0;
        return (
            (event.status === 'PENDING') ||
            (event.status === 'OPEN' && participantCount === 0)
        );
    };

    const canCompleteEvent = (event: IEvent) => {
        const isEventPast = new Date(event.date) < new Date();
        return (event.status === 'OPEN' || event.status === 'FULL') && isEventPast;
    };

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            OPEN: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            FULL: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
            REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
            COMPLETED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };



    return (
        <div className="space-y-4">
            {/* Header Actions */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <SearchFilter 
                        placeholder="Search events..." 
                        paramName="search"
                    />
                    <SelectFilter
                        paramName="category"
                        placeholder="Category"
                        options={categoryOptions.slice(1)}
                        // defaultValue="All"
                    />
                    <SelectFilter
                        paramName="status"
                        placeholder="Status"
                        options={statusOptions.slice(1)}
                        // defaultValue="All"
                    />
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                </Button>
            </div>

            {/* Create Event Modal */}
            <CreateEventModal 
                open={isCreateModalOpen} 
                onOpenChange={setIsCreateModalOpen} 
                // hostId={currentHostId}
            />

            {/* Edit Event Modal */}
            <EditEventModal
                open={isEditModalOpen}
                onOpenChange={(open) => {
                    setIsEditModalOpen(open);
                    if (!open) setSelectedEvent(null);
                }}
                event={selectedEvent}
            />

            {/* Events Grid */}
            <div className="relative">
                {isPending && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            <p className="text-sm text-muted-foreground">Refreshing...</p>
                        </div>
                    </div>
                )}
                
                {events.length === 0 ? (
                    <Card className="py-12">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                            <div className="rounded-full bg-muted p-4 mb-4">
                                <Calendar className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No events found</h3>
                            <p className="text-muted-foreground mb-4">
                                Create your first event to get started!
                            </p>
                            <Button variant="default" onClick={() => setIsCreateModalOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Event
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <Card 
                            key={event.id} 
                            className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            {/* Event Image */}
                            <div className="relative h-48 w-full overflow-hidden bg-muted">
                                {event.image && event.image.trim() !== '' ? (
                                    <Image
                                        src={event.image}
                                        alt={event.eventName}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                                        <Calendar className="h-16 w-16 text-primary/30" />
                                    </div>
                                )}
                                {/* Status Badge Overlay */}
                                <div className="absolute top-3 right-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-md ${getStatusColor(event.status)}`}
                                    >
                                        {event.status}
                                    </span>
                                </div>
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                                        {event.category}
                                    </span>
                                </div>
                            </div>

                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                                        {event.eventName}
                                    </CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 shrink-0"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleView(event)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEdit(event)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Event
                                            </DropdownMenuItem>
                                            {canCompleteEvent(event) && (
                                                <DropdownMenuItem 
                                                    onClick={() => handleStatusUpdate(event, 'COMPLETED')}
                                                    className="text-blue-600"
                                                >
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Mark as Completed
                                                </DropdownMenuItem>
                                            )}
                                            {canCancelEvent(event) && (
                                                <DropdownMenuItem 
                                                    onClick={() => handleStatusUpdate(event, 'CANCELLED')}
                                                    className="text-orange-600"
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Cancel Event
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem 
                                                onClick={() => handleDelete(event)}
                                                className="text-destructive"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Description */}
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {event.description}
                                </p>

                                {/* Event Details */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span className="text-muted-foreground">
                                            {formatDateTime(event.date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span className="text-muted-foreground line-clamp-1">
                                            {event.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span className="font-semibold text-foreground">
                                            {formatCurrency(event.joiningFee)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span className="text-muted-foreground">
                                            <span className="font-semibold text-foreground">
                                                {event.maxParticipants || 0}
                                            </span>
                                            {' / '}
                                            <span className="font-semibold text-foreground">
                                                {event.maxParticipants}
                                            </span>
                                            {' participants'}
                                        </span>
                                    </div>
                                    {/* Host Info */}
                                    {event.host && (
                                        <div className="flex items-center gap-2 text-sm pt-2 border-t">
                                            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted shrink-0">
                                                {event.host.profilePhoto && event.host.profilePhoto.trim() !== '' ? (
                                                    <Image
                                                        src={event.host.profilePhoto}
                                                        alt={event.host.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-xs font-semibold">
                                                        {event.host.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {event.host.name}
                                                </p>
                                                {event.host.rating && (
                                                    <p className="text-xs text-muted-foreground">
                                                        ⭐ {event.host.rating.toFixed(1)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="flex gap-2 pt-0">
                                <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => handleView(event)}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => handleEdit(event)}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {meta.pages > 1 && (
                <TablePagination
                    currentPage={meta.page}
                    totalPages={meta.pages}
                />
            )}
        </div>
    );
};

export default MyEventsHost;


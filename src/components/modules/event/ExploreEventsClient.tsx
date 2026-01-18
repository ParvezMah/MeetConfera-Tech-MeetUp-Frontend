"use client";

import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import TablePagination from '@/components/shared/TablePagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime } from '@/lib/formatters';
import { formatCurrency } from '@/lib/utils';
import { IEvent } from '@/types/event.interface';
import {
    Calendar,
    DollarSign,
    Eye,
    MapPin,
    Users
} from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

// interface Event {
//     id: string;
//     title: string;
//     category: string;
//     description: string;
//     date: string | Date;
//     location: string;
//     joiningFee: number;
//     image?: string | null;
//     capacity: number;
//     status: string;
//     hostId: string;
//     participantCount?: number;
//     host?: {
//         id: string;
//         name: string;
//         email: string;
//         profilePhoto?: string | null;
//         rating?: number;
//     };
//     createdAt?: string | Date;
//     updatedAt?: string | Date;
// }

interface Meta {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

interface ExploreEventsClientProps {
    initialEvents: IEvent[];
    initialMeta: Meta;
}

const ExploreEventsClient = ({ initialEvents, initialMeta }: ExploreEventsClientProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    
    // Use props directly - they update when server component re-fetches
    const events = initialEvents;
    console.log("ExploreEventsClient - Events:", events);
    console.log("ExploreEventsClient - Events Length:", events.length);
    const meta = initialMeta;

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
    { label: "All", value: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Fulfilled", value: "FULLED" },
    { label: "Canceled", value: "CANCELED" },
    { label: "Completed", value: "COMPLETED" },
    ];

    const handleView = (event: IEvent) => {
        router.push(`/explore-events/${event.id}`);
    };

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            All: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            OPEN: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            FULLED: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
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
            </div>

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
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter criteria.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                                    {event.eventName}
                                </CardTitle>
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
                                                {event.participants?.id || 0}
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
                                    variant="default" 
                                    className="flex-1"
                                    onClick={() => handleView(event)}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
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

export default ExploreEventsClient;


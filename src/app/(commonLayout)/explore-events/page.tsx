interface ExploreEventsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ExploreEventsPage = async ({ searchParams }: ExploreEventsPageProps) => {

    return (
        <div className="container space-y-6 mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight">Explore Events</h1>
            <p className="text-muted-foreground">
                Discover and explore all available events
            </p>
        </div>
    );
};

export default ExploreEventsPage;

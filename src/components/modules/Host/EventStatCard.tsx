interface EventStatCardProps {
  label: string;
  value: string | number;
  color?: string;
}

export function EventStatCard({ label, value, color = "text-gray-900" }: EventStatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{label}</div>
      <div className={`text-3xl font-bold mt-2 ${color}`}>{value}</div>
    </div>
  );
}

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <StatCard eventName="Total Events" value={events.length} />
//           <StatCard eventName="Published" value={events.filter(e => e.status === 'published').length} color="text-green-600" />
//           <StatCard eventName="Registrations" value={events.reduce((sum, e) => sum + e.minParticipants, 0)} color="text-blue-600" />
//           <StatCard eventName="Revenue" value={`$${events.reduce((sum, e) => sum + (e.joiningFee * e.minParticipants), 0).toLocaleString()}`} color="text-purple-600" />
//         </div>
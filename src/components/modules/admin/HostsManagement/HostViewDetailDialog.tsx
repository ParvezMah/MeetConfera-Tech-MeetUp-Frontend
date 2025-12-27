import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { IHost } from "@/types/host.interface";

import {
  Briefcase,
  Calendar,
  DollarSign,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  User,
} from "lucide-react";

interface IHostViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  host: IHost | null;
}

const HostViewDetailDialog = ({
  open,
  onClose,
  host,
}: IHostViewDetailDialogProps) => {
  if (!host) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Host Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Doctor Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={host?.profilePhoto} alt={host?.name} />
              <AvatarFallback className="text-2xl">
                {getInitials(host?.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{host?.name}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {host?.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={host?.isDeleted ? "destructive" : "default"}
                  className="text-sm"
                >
                  {host?.isDeleted ? "Inactive" : "Active"}
                </Badge>
                {/* {doctor?.averageRating !== undefined && (
                  <Badge variant="secondary" className="text-sm">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {doctor.averageRating.toFixed(1)} Rating
                  </Badge>
                )} */}
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-6">
            {/* Professional Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">
                  Professional Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                {/* <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Designation"
                    value={doctor?.designation || "Not specified"}
                  />
                </div> */}
                {/* <div className="flex items-start gap-3">
                  <GraduationCap className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Qualification"
                    value={doctor?.qualification || "Not specified"}
                  />
                </div> */}
                {/* <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Experience"
                    value={
                      doctor?.experience
                        ? `${doctor.experience} years`
                        : "Not specified"
                    }
                  />
                </div> */}
                <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Location"
                    value={host?.location || "Not specified"}
                  />
                </div>
                {/* <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Appointment Fee"
                    value={
                      host?.events?.joiningFee
                        ? `$${host?.events?.joiningFee}`
                        : "Not specified"
                    }
                  />
                </div> */}
              </div>
            </div>

            <Separator />

            {/* Specialties */}
            {/* {doctor?.doctorSpecialties &&
              doctor.doctorSpecialties.length > 0 && (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold text-lg">Specialties</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.doctorSpecialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-4 py-2 text-sm"
                        >
                          {specialty.specialties?.title || "Unknown"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )} */}

            {/* Contact Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Contact Number"
                    value={host?.contactNumber || "Not provided"}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Email"
                    value={host?.email || "Not provided"}
                  />
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Address"
                    value={host?.address || "Not provided"}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Joined On"
                    value={formatDateTime(host?.createdAt || "")}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Last Updated"
                    value={formatDateTime(host?.updatedAt || "")}
                  />
                </div>
                {host?.averageRating !== undefined && (
                  <div className="flex items-start gap-3">
                    <Star className="h-4 w-4 mt-1 text-muted-foreground" />
                    <InfoRow
                      label="Average Rating"
                      value={`${host.averageRating.toFixed(1)} / 5.0`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HostViewDetailDialog;
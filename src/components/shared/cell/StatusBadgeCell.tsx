"use client";

import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/types/user.interface";

interface StatusBadgeCellProps {
  isDeleted?: boolean;
  status?: UserStatus;
  activeText?: string;
  deletedText?: string;
}

export function StatusBadgeCell({
  isDeleted,
  activeText = "Active",
  deletedText = "Deleted",
}: StatusBadgeCellProps) {
  return (
    <Badge variant={isDeleted ? "destructive" : "default"}>
      {isDeleted ? deletedText : activeText}
    </Badge>
  );
}
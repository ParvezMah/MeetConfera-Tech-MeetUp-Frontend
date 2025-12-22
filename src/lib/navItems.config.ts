""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "HOST", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "HOST", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER"],
                },
            ],
        },
    ]
}

export const userNavItems: NavSection[] = [
  {
    title: "My Events",
    items: [
      {
        title: "My Events",
        href: "/dashboard/my-events",
        icon: "History",
        roles: ["USER"],
      },
    ],
  },
];

export const hostNavItems: NavSection[] = [
  {
    title: "Event Management",
    items: [
      {
        title: "Create Event",
        href: "/host/dashboard/create-event",
        icon: "PlusCircle",
        roles: ["HOST"],
      },
      {
        title: "My Hosted Events",
        href: "/host/dashboard/my-hosted-events",
        icon: "CalendarDays",
        roles: ["HOST"],
      },
      {
        title: "Participants",
        href: "/host/dashboard/participants",
        icon: "Users",
        roles: ["HOST"],
      },
    ],
  },
  {
    title: "Earnings",
    items: [
      {
        title: "Payments",
        href: "/host/dashboard/payments",
        icon: "CreditCard",
        roles: ["HOST"],
      },
    ],
  },
];


export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "ShieldCheck", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Hosts",
                href: "/admin/dashboard/hosts-management",
                icon: "UserCog", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Host Applications",
                href: "/admin/dashboard/host-applications",
                icon: "FileCheck",
                badge: "5",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Event Management",
        items: [
            {
                title: "Events",
                href: "/admin/dashboard/events-management",
                icon: "CalendarRange",
                roles: ["ADMIN"],
            },
            {
                title: "Payments",
                href: "/admin/dashboard/payments",
                icon: "Tags",
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "HOST":
            return [...commonNavItems, ...hostNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}
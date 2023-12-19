export const SUB_NAV_LINKS = [
  {
    name: "Client",
    path: "/communication/client",
  },
  {
    name: "Internal",
    path: "/communication/internal",
  },
  {
    name: "Collaboration",
    path: "/communication/collaboration",
  },
];

export const NAV_LINKS = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Communication Hub",
    path: "/communication",
    subItems: SUB_NAV_LINKS,
  },
  {
    name: "Sales Funnel Management",
    path: "/sales-funnel-management",
  },
  {
    name: "Task and Activity Management",
    path: "/task-and-activity-management",
  },
  {
    name: "Analytics and Reporting",
    path: "/analytics-and-reporting",
  },
  {
    name: "Invoice",
    path: "/invoice",
  },
];

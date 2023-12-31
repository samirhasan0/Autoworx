export const TASK_COLOR = {
  task: "#6571FF",
  event: "#006D77",
  appointment: "#25AADD",
};

export interface NavItem {
  name: string;
  path?: string;
  subItems?: NavItem[];
}

export const SUB_NAV_LINKS: NavItem[] = [
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

export const NAV_LINKS: NavItem[] = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Communication Hub",
    subItems: SUB_NAV_LINKS,
  },
  {
    name: "Sales Funnel Management",
    path: "/sales",
  },
  {
    name: "Task and Activity Management",
    path: "/task",
  },
  {
    name: "Analytics and Reporting",
    path: "/analytics",
  },
  {
    name: "Invoice",
    path: "/invoice",
  },
];

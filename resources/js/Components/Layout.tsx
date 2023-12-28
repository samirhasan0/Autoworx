import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideNavbar />
      <div className="ml-[20%]">
        <TopNavbar />

        <main className="bg-[#F8F9FA] h-[93vh] p-7 relative">{children}</main>
      </div>
    </div>
  );
}

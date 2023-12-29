import PopupState from "./PopupState";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideNavbar />
      <div className="ml-[20%]">
        <TopNavbar />
        <PopupState />

        <main className="bg-[#F8F9FA] h-[93vh] p-7 relative">{children}</main>
      </div>
    </div>
  );
}

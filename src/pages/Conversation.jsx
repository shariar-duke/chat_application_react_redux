import Navigation from "../components/inbox/Navigation";
import Sidebar from "../components/inbox/SideBar";
import Blank from "../components/inbox/chatBody/Blank";
export default function Conversation() {
  return (
    <div>
      {/* Navbar at the top */}
      <Navigation />

      {/* Layout below the navbar */}
      <div className="flex">
        {/* Sidebar (left side) */}
        <div className="w-1/4">
          <Sidebar />
        </div>

        {/* Right side content */}
        <div className="w-3/4 p-6">
         <Blank/>
        </div>
      </div>
    </div>
  );
}

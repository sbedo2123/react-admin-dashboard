import { Bell, LogOut, Settings, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <Menu size={24} />
        Admin Dashboard
      </h1>
      <div className="navbar-icons">
        <Bell size={20} />
        <Settings size={20} />
        <LogOut size={20} />
      </div>
    </nav>
  );
}

export default Navbar;

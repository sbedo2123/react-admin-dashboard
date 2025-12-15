import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={isActive("/products") ? "active" : ""}
          >
            <Package size={20} />
            Products
          </Link>
        </li>
        <li>
          <Link to="/users" className={isActive("/users") ? "active" : ""}>
            <Users size={20} />
            Users
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

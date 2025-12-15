import { BarChart3, TrendingUp, Users, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsers, getProducts } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    revenue: 0,
    growth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          getUsers(),
          getProducts(),
        ]);
        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          revenue: 45250,
          growth: 12.5,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Welcome back to your admin dashboard
      </p>

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card success">
            <div className="stat-label">Total Users</div>
            <div className="stat-value">{stats.users}</div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#666",
                marginTop: "0.5rem",
              }}
            >
              Active users
            </div>
            <div className="stat-icon">
              <Users size={48} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{stats.products}</div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#666",
                marginTop: "0.5rem",
              }}
            >
              In inventory
            </div>
            <div className="stat-icon">
              <Package size={48} />
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">${stats.revenue.toLocaleString()}</div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#666",
                marginTop: "0.5rem",
              }}
            >
              This month
            </div>
            <div className="stat-icon">
              <BarChart3 size={48} />
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-label">Growth Rate</div>
            <div className="stat-value">{stats.growth}%</div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#666",
                marginTop: "0.5rem",
              }}
            >
              Month over month
            </div>
            <div className="stat-icon">
              <TrendingUp size={48} />
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: "2rem" }}>
        <h3>Welcome to Your Dashboard</h3>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          This is a professional admin dashboard built with React and modern
          best practices. Navigate through the sidebar to manage your users and
          products.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

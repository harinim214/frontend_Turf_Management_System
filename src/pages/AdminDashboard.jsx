import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/adminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchAnalytics();
  }, []);

  const fetchBookings = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data);
  };

  const fetchAnalytics = async () => {
    const res = await API.get("/bookings/analytics");
    setAnalytics(res.data);
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.turf?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* ===== STATS CARDS ===== */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{bookings.length}</p>
        </div>

        <div className="stat-card revenue">
          <h3>Total Revenue</h3>
          <p>₹{analytics?.totalRevenue || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Today Bookings</h3>
          <p>{analytics?.todayBookings || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Most Popular Slot</h3>
          <p>{analytics?.popularSlot || "N/A"}</p>
        </div>
      </div>

      {/* ===== MONTHLY REVENUE CHART ===== */}
      <div className="table-wrapper" style={{ padding: "20px", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "20px" }}>Monthly Revenue</h3>

        {analytics && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.monthlyRevenue}>
              <XAxis dataKey="_id.month" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="total" fill="#00e676" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by user or turf..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== BOOKINGS TABLE ===== */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Turf</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b._id}>
                <td>{b.user?.name}</td>
                <td>{b.turf?.name}</td>
                <td>{b.date}</td>
                <td>{b.slot}</td>
                <td>₹{b.totalAmount}</td>
                <td>
                  <span className={`status ${b.status}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
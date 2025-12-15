import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { AlertCircle, Plus } from "lucide-react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: "", email: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Please fill all fields");
      return;
    }

    if (editingUser) {
      // Edit user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
      };
      setUsers((prev) => [...prev, newUser]);
    }

    handleCloseModal();
    setError(null);
  };

  const handleDelete = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h2>Users</h2>
          <p style={{ color: "#666", margin: "0.5rem 0 0 0" }}>
            Manage and view all users in the system
          </p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          <Plus size={20} />
          Add User
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#fee",
            color: "#c33",
            padding: "1rem",
            borderRadius: "6px",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="table-container">
        <div className="table-header">
          <h3>User List ({users.length})</h3>
        </div>
        <Table
          columns={["id", "name", "email"]}
          data={users}
          isLoading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingUser ? "Edit User" : "Add New User"}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter user name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter user email"
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCloseModal}
              style={{
                background: "#ccc",
                color: "#333",
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              style={{ margin: 0 }}
            >
              {editingUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Users;

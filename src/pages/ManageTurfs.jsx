import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/manageTurf.css";

function ManageTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    location: "",
    pricePerHour: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchTurfs = async () => {
    const res = await API.get("/turfs");
    setTurfs(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleAdd = async () => {
    await API.post("/turfs", form);
    resetForm();
    fetchTurfs();
  };

  const handleEdit = (turf) => {
    setEditingId(turf._id);
    setForm(turf);
  };

  const handleUpdate = async () => {
    await API.put(`/turfs/${editingId}`, form);
    resetForm();
    fetchTurfs();
  };

  const confirmDelete = async () => {
    await API.delete(`/turfs/${deleteId}`);
    setDeleteId(null);
    fetchTurfs();
  };

  const resetForm = () => {
    setForm({
      name: "",
      location: "",
      pricePerHour: "",
      image: ""
    });
    setEditingId(null);
  };

  // FILTER LOGIC
  const filteredTurfs = turfs.filter((turf) => {
    const matchSearch =
      turf.name.toLowerCase().includes(search.toLowerCase()) ||
      turf.location.toLowerCase().includes(search.toLowerCase());

    const matchPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "low"
        ? turf.pricePerHour < 1000
        : turf.pricePerHour >= 1000;

    return matchSearch && matchPrice;
  });

  return (
    <div className="manage-container">

      <h2 className="page-title">Manage Turfs</h2>

      {/* SEARCH + FILTER */}
      <div className="filter-bar">
        <input
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="low">Below ₹1000</option>
          <option value="high">₹1000 & Above</option>
        </select>
      </div>

      {/* FORM */}
      <div className="form-card">

        <input
          placeholder="Turf Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price Per Hour"
          value={form.pricePerHour}
          onChange={(e) =>
            setForm({ ...form, pricePerHour: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* LIVE IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="image-preview"
          />
        )}

        {editingId ? (
          <button className="btn-primary" onClick={handleUpdate}>
            Update Turf
          </button>
        ) : (
          <button className="btn-primary" onClick={handleAdd}>
            Add Turf
          </button>
        )}
      </div>

      {/* TURF CARDS */}
      <div className="turf-grid">
        {filteredTurfs.map((turf) => (
          <div className="turf-card" key={turf._id}>
            <img src={turf.image} alt={turf.name} />

            <div className="turf-info">
              <h3>{turf.name}</h3>
              <p>{turf.location}</p>
              <span>₹{turf.pricePerHour}/Hr</span>

              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(turf)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => setDeleteId(turf._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Turf?</h3>
            <p>
              Are you sure you want to delete this turf?  
              This action cannot be undone.
            </p>

            <div className="modal-buttons">
              <button
                className="btn-secondary"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageTurfs;

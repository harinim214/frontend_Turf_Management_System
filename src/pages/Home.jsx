import React, { useEffect, useState } from "react";
import API from "../api/axios";
import TurfCard from "../components/TurfCard";
import "../styles/home.css";

function Home() {
  const [turfs, setTurfs] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await API.get("/turfs");
        setTurfs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTurfs();
  }, []);

  // 🔍 Filter Logic
  const filteredTurfs = turfs.filter((turf) => {
    const matchesSearch =
      turf.name.toLowerCase().includes(search.toLowerCase()) ||
      turf.location.toLowerCase().includes(search.toLowerCase());

    const matchesPrice = maxPrice
      ? turf.pricePerHour <= Number(maxPrice)
      : true;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="home-container">

      {/* 🔍 Search Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Turf Grid */}
      <div className="grid">
        {filteredTurfs.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>No Turfs Found</h2>
        ) : (
          filteredTurfs.map((turf) => (
            <TurfCard key={turf._id} turf={turf} />
          ))
        )}
      </div>

    </div>
  );
}

export default Home;
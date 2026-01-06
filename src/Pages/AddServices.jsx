import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AddServices = () => {
  useEffect(() => {
    document.title = "Add Service";
  }, []);

  const { user } = use(AuthContext);

  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert("You must be logged in to add a service");
      return;
    }

    const newService = {
      serviceTitle,
      description,
      category,
      minPrice,
      maxPrice,
      image,
      providerEmail: user.email,
      providerName: user.displayName || "Unknown",
    };

    setLoading(true);

    fetch("https://dailyfix-server.vercel.app/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Service added successfully!");
        setServiceTitle("");
        setDescription("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        setImage("");
      })
      .catch(() => {
        alert("Failed to add service");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          Add a New Service
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Provide clear and accurate service details
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Service Title</label>
            <input
              type="text"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              placeholder="e.g. Professional Cloth Wash"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your service briefly"
              className="textarea textarea-bordered w-full min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Cleaning"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-medium">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://image-link.com"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Minimum Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="৳ Minimum"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-medium">Maximum Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="৳ Maximum"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg mt-4"
          >
            {loading ? "Adding Service..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServices;

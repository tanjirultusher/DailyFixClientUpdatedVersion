import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyServices = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    document.title = "My Services";
    if (!loading && user?.email) {
      setLoadingServices(true);

      fetch("https://dailyfix-server.vercel.app/services")
        .then((res) => res.json())
        .then((data) => {
          const myServices = data.filter(
            (service) => service.providerEmail === user.email
          );
          setServices(myServices);
          setLoadingServices(false);
        })
        .catch((err) => {
          console.error("Error fetching services:", err);
          setLoadingServices(false);
        });
    }
  }, [loading, user]);

  if (loading || loadingServices) {
    return (
      <div className="text-center p-6 text-lg font-medium">
        Loading your services...
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="text-center p-6 text-lg font-medium">
        You have not added any services yet.
      </div>
    );
  }

  const handleDeleteServices = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://dailyfix-server.vercel.app/services/${_id}?email=${user.email}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your service has been deleted.",
                icon: "success",
              });

              const remaining = services.filter(
                (service) => service._id !== _id
              );
              setServices(remaining);
            }
          });
      }
    });
  };

  const handleOpenUpdateModal = (service) => {
    setSelectedService(service);
    setServiceTitle(service.serviceTitle);
    setDescription(service.description);
    setCategory(service.category);
    setMinPrice(service.minPrice);
    setMaxPrice(service.maxPrice);
    setImage(service.image);
    setShowModal(true);
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    setUpdating(true);

    fetch(`https://dailyfix-server.vercel.app/services/${selectedService._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceTitle,
        description,
        category,
        minPrice,
        maxPrice,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Your service has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            setShowModal(false); 
            navigate("/myservices"); 
          });
        } else {
          Swal.fire({
            title: "No Change!",
            text: "No updates were made to the service.",
            icon: "info",
          });
          setShowModal(false);
        }
        setUpdating(false);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to update service. Try again.",
          icon: "error",
        });
        setUpdating(false);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        My <span className="text-primary">Services</span>
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 w-96 shadow-lg hover:shadow-lg transition-all p-4 rounded-md"
          >
            <figure className="px-4 pt-4">
              <img
                src={service.image || "https://i.ibb.co/4pDNDk1/default.jpg"}
                alt={service.serviceTitle}
                className="rounded-xl h-50 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{service.serviceTitle}</h2>
              <p className="text-gray-500 text-sm mb-1">
                {service.description}
              </p>
              <p className="text-sm font-medium text-primary mb-1">
                Price: {service.minPrice} - {service.maxPrice} BDT
              </p>
              <div className="flex justify-between items-center mt-3 bg-base-200 px-4 py-3 rounded-md">
                <button
                  onClick={() => handleOpenUpdateModal(service)}
                  className="btn btn-primary btn-sm">
                    Update Service
                </button>
                <button
                  onClick={() => handleDeleteServices(service._id)}
                  className="btn btn-error btn-sm">
                    Delete Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="card w-full max-w-md shadow-md bg-base-100 p-6 relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Update Service
            </h2>

            <form
              onSubmit={handleUpdateService}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Service Title"
                value={serviceTitle}
                onChange={(e) => setServiceTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="input input-bordered w-1/2"
                  required
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="input input-bordered w-1/2"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input input-bordered w-full"
                required
              />

              <button
                type="submit"
                className={`btn btn-primary w-full mt-2 ${
                  updating ? "loading" : ""
                }`}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;

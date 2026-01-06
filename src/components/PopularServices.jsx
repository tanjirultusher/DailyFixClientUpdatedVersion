import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dailyfix-server.vercel.app/bookings")
      .then((res) => res.json())
      .then((data) => {
        const rating5 = data.filter((s) => s.rating === 5);
        const remainingCount = 6 - rating5.length;

        let finalServices = [...rating5];

        if (remainingCount > 0) {
          const rating4 = data
            .filter((s) => s.rating === 4)
            .slice(0, remainingCount);
          finalServices = [...finalServices, ...rating4];
        }

        setServices(finalServices.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading popular services...</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mt-6 mb-2">
        Top <span className="text-primary">Rated Services</span>
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center p-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 w-96 shadow-sm hover:shadow-lg transition-all"
          >
            <figure className="px-10 pt-10">
              <img
                src={service.image || "https://i.ibb.co/4pDNDk1/default.jpg"}
                alt={service.serviceTitle}
                className="rounded-xl h-56 w-full object-cover"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title">{service.serviceTitle}</h2>

              <div className="flex gap-1 text-yellow-500 my-2">
                {[...Array(service.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <Link to={`/service/${service.serviceId}`}>
                <div className="card-actions mt-2">
                  <button className="btn btn-primary btn-sm">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;

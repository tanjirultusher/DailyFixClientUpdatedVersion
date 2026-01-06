import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";


const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    document.title = "Booking";
    if (user?.email) {
      fetch(`https://dailyfix-server.vercel.app/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user]);

const handleDeleteBooking = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://dailyfix-server.vercel.app/bookings/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json" 
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) { 
              Swal.fire({
                title: "Deleted!",
                text: "Your booking has been deleted.",
                icon: "success"
              });

              const remainingBookings = bookings.filter(
                (booking) => booking._id !== _id
              );
              setBookings(remainingBookings);
            } 
          })
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        My <span className="text-primary">Bookings</span>
      </h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Service ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Service Name</th>               
                <th className="px-4 py-2 text-left text-gray-600">Booking Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Price</th>
                <th className="px-4 py-2 text-left text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-500 transition-colors"
                >
                  <td className="px-4 py-2">{booking.serviceId}</td>
                  <td className="px-4 py-2">{booking.serviceTitle}</td>                 
                  <td className="px-4 py-2">{booking.bookingDate}</td>
                  <td className="px-4 py-2">{booking.price} BDT</td>
                  <td className="px-4 py-2 text-left">
                    <button
                      className="bg-purple-700 hover:bg-teal-700 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
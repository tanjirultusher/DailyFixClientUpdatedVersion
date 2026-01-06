import React, { useEffect, useState } from "react";
import { FaUserFriends, FaTools, FaClock, FaSmile } from "react-icons/fa";

const DailyFixNumbers = () => {
  const stats = [
    { icon: <FaUserFriends />, label: "Happy Users", count: 1250 },
    { icon: <FaTools />, label: "Services Delivered", count: 890 },
    { icon: <FaClock />, label: "Hours Saved", count: 4600 },
    { icon: <FaSmile />, label: "Satisfied Customers", count: 1200 },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, idx) => {
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[idx] < stat.count) {
            newCounts[idx] += Math.ceil(stat.count / 100);
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, [stats]);

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-12">
        daily<span className="text-primary">FIX</span> in Numbers
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-3xl shadow hover:shadow-xl transition transform hover:-translate-y-2"
          >
            <div className="text-5xl text-blue-500 mx-auto mb-4">{stat.icon}</div>
            <h3 className="text-3xl text-gray-600 font-bold mb-2">{counts[idx]}</h3>
            <p className="text-gray-500 text-lg font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyFixNumbers;

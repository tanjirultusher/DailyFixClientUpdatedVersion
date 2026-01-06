import React from "react";
import { FaUserTie, FaHandHoldingUsd, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-6">Why Choose daily<span className="text-primary">FIX</span></h2>
      <div className="grid md:grid-cols-3 gap-6 px-6">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <FaUserTie className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-600 font-semibold mb-2">Verified Professionals</h3>
          <p className="text-gray-500">
            All our service providers are verified and skilled. DailyFix ensures you get reliable, 
            expert help for every home need — anytime you need it.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <FaHandHoldingUsd className="text-5xl text-green-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-600 font-semibold mb-2">Transparent & Affordable</h3>
          <p className="text-gray-500">
            With DailyFix, you always know what you’re paying for. We offer high-quality services 
            at clear, affordable prices — no hidden costs.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <FaHeadset className="text-5xl text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-600 font-semibold mb-2">Dedicated Support</h3>
          <p className="text-gray-500">
            Our DailyFix support team is always ready to assist you — 
            from booking to completion, we ensure a smooth service experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

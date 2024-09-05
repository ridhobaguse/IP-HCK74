import React from "react";
import agentsImage from "../assets/jett2.webp";
import iceboxImage from "../assets/icebox.jpg";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Your Agents Section */}
      <section
        className="bg-cover bg-center py-20 px-8 flex flex-col items-center text-center relative"
        style={{ backgroundImage: `url(${agentsImage})` }}
      >
        <h2 className="text-5xl font-extrabold mb-6">YOUR AGENTS</h2>
        <p className="max-w-2xl text-lg mb-8">
          Creativity is your greatest weapon. More than guns and bullets, you’ll
          choose an Agent armed with adaptive, swift, and lethal abilities that
          create opportunities to let your gameplay shine. No two Agents play
          alike, just as no two highlight reels will look the same.
        </p>
        <button className="bg-black text-white py-3 px-6 rounded-full shadow-lg hover:bg-gray-800 transition duration-300">
          VIEW ALL AGENTS
        </button>
      </section>
      {/* Your Maps Section */}
      <section
        className="bg-cover bg-center py-20 px-8 flex flex-col items-center text-center text-gray-900"
        style={{ backgroundImage: `url(${iceboxImage})` }}
      >
        <h2 className="text-5xl text-red-500 font-extrabold mb-6">YOUR MAPS</h2>
        <p className="max-w-2xl font-bold text-red-500 text-lg mb-8">
          Fight around the world. Each map is a playground to showcase your
          creative thinking. Purpose-built for team strategies, spectacular
          plays, and clutch moments. Make the play others will imitate for years
          to come.
        </p>
        <button className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300">
          VIEW ALL MAPS
        </button>
      </section>
    </div>
  );
};

export default Home;

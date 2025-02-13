import React from "react";
import educator from "../assets/educator.png";
// Define the icons dynamically
const iconsData = [
  {
    icon: "https://tajmahalvoyages.com/wp-content/uploads/2025/01/Group-8.png",
    title: "Supportive Learning Atmosphere",
  },
  {
    icon: "https://tajmahalvoyages.com/wp-content/uploads/2025/01/icon-3.png", 
    title: "Comprehensive Resources",
  },
  {
    icon: "https://tajmahalvoyages.com/wp-content/uploads/2025/01/icon-4.png", 
    title: "Interactive Mock Exams",
  },
  {
    icon: "https://tajmahalvoyages.com/wp-content/uploads/2025/01/icon-2.png", 
    title: "Expert Educators",
  },
  {
    icon: "https://tajmahalvoyages.com/wp-content/uploads/2025/01/Vector.png", 
    title: "Advanced Technology Integration",
  },
  {
    icon: "https://tajmahalvoyages.com/wp-content/uploads/2025/01/educator.png", 
    title: "Tailored Study Plans",
  },
];

function IconGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6 p-4">
      {iconsData.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 dark:bg-gray-800"
        >
          <img src={item.icon} alt={item.title} className="w-12 h-12" />
          <h4 className="aboutush">{item.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default IconGrid;

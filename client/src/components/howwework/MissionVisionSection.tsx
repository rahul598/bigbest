import React from "react";
import missionVisionData from "././missionVisionData "; 
import "../styles/MissionVisionSection.css";

interface MissionVisionItem {
  title: string;
  description: string;
  icon: string;
  image: string;
}

const MissionVisionSection: React.FC = () => {
  console.log("missionVisionData:", missionVisionData); 

  // Ensure missionVisionData is an array before mapping
  if (!Array.isArray(missionVisionData)) {
    console.error("Error: missionVisionData is not an array!", missionVisionData);
    return <p>Error loading data.</p>;
  }

  return (
    <div className="mt-2">
      {missionVisionData.map((item: MissionVisionItem, index: number) => (
        <div key={index} className={`vision-${index} ${index % 2 === 0 ? "right" : "left"}`}>
          {/* Ternary operator to switch between right and left layout */}
          {index % 2 === 0 ? (
            <>
              {/* Right Layout: Image First, Content After */}
              <div className="text-content col-8">
                <div className="flex items-center">
                  <h2 className="section-title">{item.title}</h2>
                  <img src={item.icon} alt="Section Icon" className="section-icon" />
                </div>
                <p className="section-text">{item.description}</p>
              </div>
              <div className="image-content col-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="section-image"
                />
              </div>              
            </>
          ) : (
            <>
              {/* Left Layout: Content First, Image After */}
              <div className="image-content col-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="section-image"
                />
              </div>              
              <div className="text-content col-8">
                <div className="flex items-center">
                  <h2 className="section-title">{item.title}</h2>
                  <img src={item.icon} alt="Section Icon" className="section-icon" />
                </div>
                <p className="section-text">{item.description}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MissionVisionSection;
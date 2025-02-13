import React from 'react';

const GoogleMapEmbed = () => {
  const iframeSrc = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d111406.57053861847!2d77.8024164!3d29.239571499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1737944245463!5m2!1sen!2sin";
  
  return (
    <div>
      <iframe
        src={iframeSrc}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;

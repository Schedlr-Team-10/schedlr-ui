// ImageModal.js
import React from 'react';
import './ImageModal.css';

const ImageModal = ({ imageSrc, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Profile" className="modal-image" />
        <button className="close-modal" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImageModal;

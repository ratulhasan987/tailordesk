
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import TshirtImage from '../assets/images/white ai t-shit.png';

const TShirtDesign = () => {
  const [logo, setLogo] = useState(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState(100);
  const tShirtRef = useRef(null);

  // Handle logo upload
  const handleLogoUpload = event => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  // Handle mouse down to start dragging
  const handleMouseDown = event => {
    setIsDragging(true);
    event.preventDefault(); // Prevent default to avoid text selection
  };

  // Handle mouse move to drag the logo
  const handleMouseMove = event => {
    if (isDragging) {
      const rect = tShirtRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setPosition({ x, y });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle resizing (using the size state)
  const handleLogoResize = event => {
    setSize(event.target.value);
  };

  const saveFinalImage = () => {
    alert(
      `Final image saved with logo at position: X:${position.x}, Y:${position.y}`
    );
  };

    const handleSaveImage = async () => {
      if (tShirtRef.current) {
        const canvas = await html2canvas(tShirtRef.current);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'tshirt-design.png';
        link.click();
      }
    };

  return (
    <div className="p-4 bg-gray-900 text-white h-auto">
      <h2 className="text-2xl font-semibold mb-16">T-Shirt Design</h2>
      <div className=" flex justify-center items-center">
        {/* Left Section: T-Shirt Preview */}
        <div>
          <div
            className="relative w-80 h-100 bg-gray-700 border border-gray-600 rounded-lg overflow-hidden"
            ref={tShirtRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={TshirtImage}
              alt="T-Shirt"
              className="w-full h-full object-cover"
            />

            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="absolute cursor-move"
                style={{
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                  width: `${size}px`, // Use the size state here
                  height: `${size}px`, // Use the size state here
                }}
                onMouseDown={handleMouseDown}
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <label className="text-sm">Resize Logo:</label>
            <input
              type="range"
              min="20"
              max="200"
              value={size}
              onChange={handleLogoResize} // Use handleLogoResize here
              className="ml-2"
            />
          </div>
        </div>

        {/* Right Section: Upload & Submit */}
        <div className="ml-8">
          <div className="mb-4">
            <input
              type="file"
              onChange={handleLogoUpload}
              className="border border-gray-600 p-2 rounded-lg bg-gray-800 text-white w-full"
            />
          </div>
          <button
            onClick={handleSaveImage}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Final Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default TShirtDesign;


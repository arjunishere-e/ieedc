import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DotGrid from "./DotGrid";

// Dynamically import all JPG images from assets/ai
const images = Object.values(
  import.meta.glob("../assets/ai/*.{jpg,jpeg,JPG,JPEG}", { eager: true })
).map((mod: any) => mod.default);

const Ai: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const navigate = useNavigate();

  // Close modal and go back to event page
  const handleClose = () => {
    setSelectedImg(null);
    navigate("/events/hexis"); // redirect to event page
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", color: "#fff" }}>
      {/* DotGrid background */}
      <DotGrid
        dotSize={6}
        gap={25} // slightly fewer dots for better performance
        baseColor="#2a2a2a"
        activeColor="#5227FF" // accent color for AI
        proximity={100} // reduce computations
        shockRadius={200}
        shockStrength={3}
        resistance={600}
        returnDuration={1.8}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      <h1
        style={{
          textAlign: "center",
          padding: "2rem 0",
          color: "#fff",
          fontFamily: "'Cinzel', serif",
        }}
      >
        AI Event Photos
      </h1>

      {/* Grid of photos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              background: "#111",
            }}
            onClick={() => setSelectedImg(src)}
          >
            <img
              src={src}
              alt={`AI ${i + 1}`}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Popup modal */}
      {selectedImg && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            cursor: "pointer",
          }}
        >
          <img
            src={selectedImg}
            alt="Popup"
            style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Ai;

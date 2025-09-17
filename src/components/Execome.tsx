import React, { useEffect, useRef, useState } from "react";

const execomMembers = [
   { id: 1, name: "MS LEENA", designation: "Nodal Officer", image: "/assets/execom/leena.jpg" },
  { id: 2, name: "MILAN SAJI", designation: "Student Lead1", image: "/assets/execom/milan.jpg" },
  { id: 3, name: "DEVENDHU D", designation: "Student Lead2", image: "/assets/execom/devendhu.jpg" },
  { id: 4, name: "AAROH ABRAHAM", designation: "Community Lead", image: "/assets/execom/aaroh.jpg" },
  { id: 5, name: "ARATHY MOHAN", designation: "Design Lead", image: "/assets/execom/arathy.jpg" },
  { id: 6, name: "NIKHIL THOMAS", designation: "Finance Lead", image: "/assets/execom/nikhil.jpg" },
  { id: 7, name: "MOHAMMED SHADIRVAN", designation: "Technology Lead", image: "/assets/execom/shadirvan.jpg" },
  { id: 8, name: "GOWRI NANDHANA", designation: "Innovation Lead", image: "/assets/execom/gowri.jpg" },
  { id: 9, name: "VISHNU GOPAL", designation: "Branding & Marketing Lead", image: "/assets/execom/vishnu.jpg" },
  { id: 10, name: "ANCY BIJU", designation: "Women Innovation Lead", image: "/assets/execom/ancy.jpg" },
  { id: 11, name: "ABHI KRISHNA", designation: "Quality & Operation Lead", image: "/assets/execom/abhi.jpg" },
  { id: 12, name: "ANAKHA M R", designation: "Content Creator", image: "/assets/execom/anakha.jpg" },

];

const Execome: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll only for desktop
  useEffect(() => {
    if (isMobile) return;
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollStep = 0.3; // 🔹 slower speed (was 0.8)
    const interval = setInterval(() => {
      if (!container) return;
      scrollAmount += scrollStep;
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0; // reset to start
      }
      container.scrollLeft = scrollAmount;
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section
      id="execome"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6rem 5%",
        minHeight: "100vh",
        backgroundColor: "transparent",
        color: "#fff",
        position: "relative",
        zIndex: 1,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center",fontFamily: "'Cinzel', serif" }}>
        Meet Our Executive Committee
      </h2>

      {/* Container */}
      <div
        ref={scrollRef}
        style={{
          display: isMobile ? "grid" : "flex",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : undefined,
          gap: "1.2rem",
          overflowX: isMobile ? "visible" : "auto",
          padding: "1rem",
          width: "100%",
          maxWidth: "1200px",

          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {execomMembers.map((member) => (
          <div
            key={member.id}
            style={{
              minWidth: isMobile ? "auto" : "200px",
              flexShrink: 0,
              background: "rgba(30,30,30,0.75)",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100%",
                height: isMobile ? "150px" : "220px",
                borderRadius: "10px",
                objectFit: "cover",
                marginBottom: "0.8rem",
              }}
            />
            <h3 style={{ fontSize: isMobile ? "0.9rem" : "1.1rem", margin: "0.2rem 0" }}>
              {member.name}
            </h3>
            <p style={{ fontSize: isMobile ? "0.75rem" : "0.9rem", color: "#bbb" }}>
              {member.designation}
            </p>
          </div>
        ))}
      </div>

      {/* Hide scrollbars */}
      <style>{`
        #execome div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Execome;

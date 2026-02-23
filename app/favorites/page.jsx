"use client";
import { useState } from "react";
import favoritesData from '@/lib/content/favorites.json';

export const metadata = {
  title: 'Favorites',
  description: "My favorite books, music, and movies.",
};

export default function FavoritesPage() {
  const [openSections, setOpenSections] = useState({
    movie: true,
    show: true,
    book: true,
    album: true,
  });

  const toggleSection = (type) => {
    setOpenSections(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // group items by type dynamically
  const grouped = favoritesData.top.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <main className="container">
      <div className="about">
        <h1>My Favorites</h1>
        <p>{favoritesData.intro}</p>
      </div>

      <div className="starline">✦</div>

      {Object.entries(grouped).map(([type, items]) => (
        <section key={type} className="section">
          <h2
            className="section-title"
            style={{ cursor: "pointer" }}
            onClick={() => toggleSection(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} ({items.length}){" "}
            {openSections[type] ? "▼" : "►"}
          </h2>
          {openSections[type] && (
            <div className="grid-cards">
              {items.map((item, index) => (
                <div key={index} className="card-mini">
                  <img src={item.image} alt={item.title} width="150" />
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                  <span>{item.type}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
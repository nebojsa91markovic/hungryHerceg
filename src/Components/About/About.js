import React, { useState } from "react";
import AboutTeam from "./AboutTeam";
import AboutCategories from "./AboutCategories";
import items from "./aboutData";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function About() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Tesla Eats App</h2>
          <div className="underline"></div>
          <p>Version 1.0.0</p>
          <p>Application for easy food ordering</p>
        </div>
        <div className="title">
          <h2>Tesla Team</h2>
          <div className="underline"></div>
        </div>

        <AboutCategories filterItems={filterItems} categories={categories} />
        <AboutTeam items={menuItems} />
      </section>
    </main>
  );
}

export default About;

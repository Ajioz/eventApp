import React from "react";
import {getFeaturedEvents} from '../dummy-data'

const HomePage = () => {
    const featuredEvent = getFeaturedEvents();
  return (
    <div>
      <h1>The Home Page</h1>
    </div>
  );
};

export default HomePage;

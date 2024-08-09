import React from "react";

const EventList = (props) => {
  const { items } = props;
  return (
    <div>
      <ul>
        {items.maps((item) => (
          <li></li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

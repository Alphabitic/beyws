import React from "react";
import { Link } from "react-router-dom";
import { chatRooms } from "./chatRooms";
import Content from "./Content";

export const Side = () => {
  return (
    <div>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            {chatRooms.map((room) => (
              <li className="nav-item" key={room.id}>
                <Link className="nav-link" to={`/room/${room.id}`}>
                  {room.icon} {room.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

function Landing() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <Content />
        </div>
      </div>
    </>
  );
}

export { Landing };
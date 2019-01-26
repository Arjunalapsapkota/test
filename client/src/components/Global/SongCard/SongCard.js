import React from "react";
import "../../../css/main.css";

const SongCard = () => (
  <div className="col-3">
    <div className="card card2">
      <img
        className="card-img-top"
        src="https://i.scdn.co/image/997575a5644176a1f975020c8ed5733becca06a4"
        alt="Card cap"
      />
      <div className="card-body card-body2">
        <div className="avator">
          <img
            src="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png"
            alt="avator man"
          />
        </div>
        <p className="song-title"> Still My Moment </p>
        <div className="star-and-share">
          <i className="far fa-heart" />
          <i className="fas fa-share-square" />
        </div>
      </div>
    </div>
  </div>
);

export default SongCard;

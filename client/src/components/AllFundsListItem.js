import React, { useEffect, useRef } from "react";
import { TweenMax, Power2 } from "gsap";
import ProgressBar from './progressbar/ProgressBar'
import "./AllFundsListItem.scss";
import { getPercentageProducts } from '../helpers/helpers';

export default function AllFundsListItem(props) {
  let itemAnimate = useRef(null);

  useEffect(() => {
    TweenMax.fromTo(
      itemAnimate,
      1.2,
      { opacity: 0 },
      { opacity: 1, ease: Power2.easeInOut }
    );
  }, []);

  return (
    <li
      className="fund"
      key={props.id}
      ref={(el) => {
        itemAnimate = el;
      }}
    >
      <img className="fund--img" src={props.image} alt={props.title} />
      <div className="fund--container">
        <p>{props.location}</p>
        <h5>
          <strong>{props.title}</strong>
        </h5>
        <p>{props.description}</p>
        <ProgressBar percentage={getPercentageProducts(props)}/>
        <span className="fund--goal">
          <strong>${props.amount_raised.toLocaleString()} raised</strong> of ${props.total_goal.toLocaleString()}
        </span>
      </div>
    </li>
  );
}

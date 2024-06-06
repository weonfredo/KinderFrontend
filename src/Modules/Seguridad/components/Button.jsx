import React, { useEffect } from "react";
import PropTypes from "prop-types"; // Importa PropTypes para definir las propiedades
import "../style/Button.css";

function Button({ value, onClick }) {
  useEffect(() => {
    const animateButton = (e) => {
      e.preventDefault();
      e.target.classList.remove("animate");
      e.target.classList.add("animate");
      setTimeout(() => {
        e.target.classList.remove("animate");
      }, 700);
    };

    const bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener("click", animateButton, false);
    }
    return () => {
      for (let i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].removeEventListener("click", animateButton, false);
      }
    };
  }, []);

  return (
    <Button className="bubbly-button" onClick={onClick}>
      {value}
    </Button>
  );
}
Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;

const SimpleModal = props => {
  return (
    <>
      <div className="simpleModal__children" style={{ filter: "blur(1.1rem)" }}>
        {props.children}
      </div>
      <div className="simpleModal__overlay">
        <div className="simpleModal">
          <h1 className="simpleModal__header">Add your Primary Class.</h1>
          <button className="simpleModal__close">
            <i class="bx bx-window-close"></i>
          </button>
          <div className="simpleModal__content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
              commodi? Praesentium sapiente at veniam nihil tempore a eos, odio
              dolorum nisi sequi, ratione nesciunt quaerat asperiores commodi
              eius, quo sint.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleModal;

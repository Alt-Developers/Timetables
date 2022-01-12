import { Link } from "react-router-dom";

const NotFound = props => {
  return (
    <section className="login">
      <div className="login__rectangle" />

      <div className="login__modal">
        <div className="login__text">
          <h3>Hmmmm...</h3>
          <p>Doesn't seem like this page exists.</p>
        </div>
        <Link to="/">Back home</Link>
      </div>
    </section>
  );
};

export default NotFound;

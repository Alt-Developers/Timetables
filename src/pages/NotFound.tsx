import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notFound">
      <div className="notFound__content">
        <i className="bx bxs-error-alt"></i>
        <div className="notFound__text">
          <h1>404 Page Doesn't Exist</h1>
          <p>
            We can't seem to find the page you we're looking for.{" "}
            <Link to="/">Back Home</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

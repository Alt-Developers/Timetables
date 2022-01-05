const NotFound = props => {
  return (
    <section className="notFound">
      <div className="notFound__modal">
        <div className="notFound__text">
          <h1>Are you sure this is the right URL?</h1>
        </div>
        <button className="btn">Back Home</button>
      </div>
    </section>
  );
};

export default NotFound;

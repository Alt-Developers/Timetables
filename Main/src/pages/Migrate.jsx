const Migrate = props => {
  return (
    <section className="notFound">
      <div className="notFound__modal">
        <div className="notFound__text">
          <h1>This SS Account is not registered to timetables</h1>
        </div>
        <button
          onClick={() => {
            console.log("GOING TO SIGNUP PAGE");
            localStorage.removeItem("token");
          }}
          className="btn">
          Register now
        </button>
      </div>
    </section>
  );
};

export default Migrate;

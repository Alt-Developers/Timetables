const Migrate = props => {
  return (
    <section className="login">
      <div className="login__rectangle" />

      <div className="login__modal">
        <div className="login__text">
          <h3>Account not registered</h3>
          <p>To use Timetables please register SS Account to timetables. </p>
        </div>
        <a href="https://authentication.ssdevelopers.xyz/signup/timetables">
          Register
        </a>
      </div>
    </section>
  );
};

export default Migrate;

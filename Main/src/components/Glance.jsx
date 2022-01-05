const Glance = props => {
  return (
    <>
      <h3 className="bar__header">At a glance</h3>
      <section className="bar">
        <div className="bar__item" style={{ backgroundColor: "#69ACEA" }}>
          <h3>
            Current Period: <br />
            PERIOD HERE
          </h3>
          <button className="btn bar__item--btn">View in timetable</button>
        </div>
        <div className="bar__item" style={{ backgroundColor: "#70F094" }}>
          <h3>
            Next Period: <br />
            PERIOD HERE
          </h3>
          <button className="btn bar__item--btn">View in timetable</button>
        </div>
      </section>
    </>
  );
};

export default Glance;

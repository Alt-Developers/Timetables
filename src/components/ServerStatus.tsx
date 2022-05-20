interface contents {
  header: string;
  text: string;
}

const ServerStatus = (props) => {
  let contents: contents = {
    header: "",
    text: "",
  };

  switch (props.status) {
    case "maintenance":
      contents = {
        header: "Server Maintenance",
        text: "Right now the server is on maintenance please come back later",
      };
      break;
    case "offline":
      contents = {
        header: "Offline",
        text: "The server is currently offline please come back later",
      };
  }

  return (
    <section className="login">
      <div className="login__rectangle" />

      <div className="login__modal">
        <div className="login__text">
          <h3>{contents.header}</h3>
          <p>{contents.text}</p>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;

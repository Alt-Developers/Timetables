import { RootState } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { serverStatusAction } from "../context/serverStatusSlice";

interface contents {
  header: string;
  text: string;
}

const ServerStatus = (props) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.account.userInfo);
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
        {props.status === "maintenance" && userInfo.type === "developer" ? (
          <button
            onClick={() =>
              dispatch(serverStatusAction.setStatus({ status: "override" }))
            }
            className="btn login__btn"
          >
            Developer Override
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default ServerStatus;

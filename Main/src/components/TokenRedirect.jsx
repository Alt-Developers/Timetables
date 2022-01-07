import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SpinnerRoundFilled } from "spinners-react";
import { useDispatch } from "react-redux";
import { accountActions } from "../context/accountSlice";

const TokenRedirect = props => {
  const { token: params } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("token", params.replace(":", ""));

    fetch("https://apis.ssdevelopers.xyz/timetables/getUser", {
      headers: {
        Authorization: "Bearer " + params.replace(":", ""),
      },
    })
      .then(data => {
        console.log(data);
        if (data.status === 200) return data.json();
        if (data.status === 500) console.log("Errored");
      })
      .then(data => {
        dispatch(accountActions.login(data));
        navigate("/");
      });
  }, [dispatch, navigate, params]);

  return <SpinnerRoundFilled />;
};

export default TokenRedirect;

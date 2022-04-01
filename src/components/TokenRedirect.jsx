import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { accountActions } from "../context/accountSlice";
import Loading from "./Loading";

const TokenRedirect = props => {
  const { token: params } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("token", params.replace(":", ""));

    fetch("https://apis.ssdevelopers.xyz/auth/getUser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(data => {
        if (data.status === 200) return data.json();
        if (data.status === 500) return;
      })
      .then(data => {
        dispatch(accountActions.login(data));
        dispatch(accountActions.setLanguage(data.config.language));
        dispatch(
          accountActions.setConfig({
            dateTime: data.config.dateTime,
            showCovid: data.config.showCovid,
          })
        );
        navigate("/");
      });
  }, [dispatch, navigate, params]);

  return <Loading />;
};

export default TokenRedirect;

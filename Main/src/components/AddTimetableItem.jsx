import { motion } from "framer-motion";
import SelectSearch from "react-select-search";
import { fuzzySearch } from "react-select-search";
import { useState } from "react";
import ColoredButton from "./ColoredButton";
import { useDispatch } from "react-redux";
import { refetchActions } from "../context/refetchSlice";
import { useNavigate } from "react-router";

const AddTimetableItem = props => {
  const [selectedOption, setSelectedOption] = useState(props.defaultOption);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();

    fetch("https://apis.ssdevelopers.xyz/timetables/registerUserClass", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        classNo: selectedOption.split("+")[0],
        program: selectedOption.split("+")[1],
        isPrimary: props.isPrimary,
      }),
    }).then(data => {
      dispatch(refetchActions.refetch());
      if (props.isNewUser) navigate("/");
    });
  };

  return (
    <form
      className="addTimetables"
      onSubmit={submitHandler}
      style={props.style}>
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <h3>{props.header}</h3>
        <SelectSearch
          options={[]}
          getOptions={query => {
            return new Promise((resolve, reject) => {
              fetch(
                `https://apis.ssdevelopers.xyz/timetables/getNotUserClass`,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
                .then(response => response.json())
                .then(data => {
                  resolve(
                    data.data.map(({ classNo, program, className }) => ({
                      value: `${classNo}+${program}`,
                      name: className,
                    }))
                  );
                })
                .catch(reject);
            });
          }}
          value={selectedOption}
          filterOptions={fuzzySearch}
          placeholder={props.placeholder}
          onChange={setSelectedOption}
          emptyMessage={() => (
            <div style={{ textAlign: "center", fontSize: "0.8em" }}>
              Timetable not found
            </div>
          )}
          search
        />
        <ColoredButton
          onSubmit={submitHandler}
          type={"submit"}
          text={props.button}
        />
      </motion.div>
    </form>
  );
};

export default AddTimetableItem;

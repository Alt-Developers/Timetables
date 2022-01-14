import { motion } from "framer-motion";
import SelectSearch from "react-select-search";
import { fuzzySearch } from "react-select-search";
import { useState } from "react";
import { useSelector } from "react-redux";
import ColoredButton from "./ColoredButton";

const AddTimetableItem = props => {
  const [selectedOption, setSelectedOption] = useState(props.defaultOption);
  const submitHandler = event => {
    event.preventDefault();
    console.log(selectedOption);
  };

  return (
    <form className="addTimetables">
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
                    data.data.map(({ classNo, program }) => ({
                      value: classNo,
                      name: classNo,
                      program: program,
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
              Not found renderer
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

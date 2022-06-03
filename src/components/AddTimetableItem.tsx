import SelectSearch from "react-select-search";

import { motion } from "framer-motion";
import { fuzzySearch } from "react-select-search";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refetchActions } from "../context/refetchSlice";
import { useNavigate } from "react-router";
import { modalActions } from "../context/modalSlice";
import { RootState } from "../context";

const AddTimetableItem = (props) => {
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const [selectedOption, setSelectedOption] = useState(props.defaultOption);
  const [selectedSchool, setSelectedSchool] = useState("ASSUMPTION");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch("https://apis.ssdevelopers.xyz/timetables/registerUserClass", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        classId: selectedOption,
        isPrimary: props.isPrimary,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch(refetchActions.refetch(""));
        if (props.isNewUser) {
          props.liftDone(true);
          // navigate("/");
        }
        if (data.modal) {
          dispatch(
            modalActions.openModal({ header: data.header, text: data.message })
          );
        }
      });
  };

  return (
    <form
      className={props.className ? props.className : "addTimetables"}
      onSubmit={submitHandler}
      style={props.style}
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="addTimetables__inputWrapper"
      >
        {props.header2 && (
          <div>
            <h3>{props.header2}</h3>
            <SelectSearch
              options={[
                { name: "Assumption College", value: "ASSUMPTION" },
                { name: "The Newton", value: "NEWTON" },
                { name: "The Essence", value: "ESSENCE" },
                { name: "The Essence Primary Section", value: "ESSENCEP" },
                {
                  name: "Patumwan Demonstration School",
                  value: "SATHIT_PATHUMWAN",
                },
              ]}
              value={selectedSchool}
              filterOptions={fuzzySearch}
              placeholder={props.placeholder2}
              // @ts-ignore
              onChange={setSelectedSchool}
              emptyMessage={() => "School Not Found"}
            />
          </div>
        )}

        <div>
          <h3>{props.header}</h3>
          <SelectSearch
            options={[]}
            getOptions={(query) => {
              return new Promise((resolve, reject) => {
                fetch(
                  `https://apis.ssdevelopers.xyz/timetables/getClassFromSchool?school=${selectedSchool}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    resolve(
                      data.response.map(({ name, value }) => ({
                        value,
                        name,
                      }))
                    );
                  })
                  .catch(reject);
              });
            }}
            // autoComplete={"on"}
            value={selectedOption}
            filterOptions={fuzzySearch}
            placeholder={props.placeholder}
            // @ts-ignore
            onChange={setSelectedOption}
            emptyMessage={() => "Timetable not found"}
            search
          />
        </div>

        <button
          className={`${
            props.className ? props.className : "addTimetables"
          }__submit `}
          type={"submit"}
          onSubmit={submitHandler}
          style={{ backgroundColor: userInfo.color, ...props.style }}
        >
          {props.button}
        </button>
      </motion.div>
    </form>
  );
};

export default AddTimetableItem;

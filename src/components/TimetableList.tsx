// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimetableItem from "./TimetableItem";
import { motion } from "framer-motion";
import { accountActions } from "../context/accountSlice";
import { Link } from "react-router-dom";
import { RootState } from "../context";
import SelectSearch from "react-select-search";
import { useEffect, useState } from "react";
import { modalActions } from "../context/modalSlice";
// import { refetchActions } from "../context/refetchSlice";

const TimetableList = () => {
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.account.language);
  const [sortOptions, setSortOptions] = useState<
    { value: string; name: string }[]
  >([{ value: "EVERY", name: "Every School" }]);
  const [selectedSortOption, setSelectedSortOption] = useState("EVERY");
  const classInfo = useSelector(
    (state: RootState) => state.timetable.classInfo
  );

  const toSchoolName = (schoolId) => {
    let schoolName;

    switch (schoolId) {
      case "ASSUMPTION":
        language === "EN"
          ? (schoolName = "Assumption")
          : (schoolName = "อัสสัมชัญ");
        break;
      case "NEWTON":
        language === "EN" ? (schoolName = "Newton") : (schoolName = "นิวตัน");
        break;
      case "ESSENCE":
        language === "EN"
          ? (schoolName = "Essence")
          : (schoolName = "เอสเซนส์");
        break;
      default:
        language === "EN" ? (schoolName = "") : (schoolName = "");
        break;
    }

    return schoolName;
  };

  useEffect(() => {
    const schoolSet: (string | undefined)[] = [];
    if (!schoolSet.includes(classInfo.primaryClass?.school))
      schoolSet.push(classInfo.primaryClass?.school);
    classInfo?.starredClass?.forEach((element) => {
      if (!schoolSet.includes(element.school)) schoolSet.push(element.school);
    });
    [...new Set(schoolSet)].map((school) => {
      // @ts-ignore
      setSortOptions((sortOptions) => [
        ...sortOptions,
        { value: school, name: toSchoolName(school) },
      ]);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 className="bar__header">
          {language === "EN" ? "My Timetables" : "ตารางสอนของฉัน"}
        </h3>
        <SelectSearch
          className="timetableSort"
          options={sortOptions}
          // @ts-ignore
          onChange={setSelectedSortOption}
        />
      </div>
      {classInfo.primaryClass ? (
        <div className="box">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="bar timetable"
          >
            {classInfo.primaryClass.school === selectedSortOption && (
              <TimetableItem
                color={userInfo.color}
                text={language === "EN" ? "My Class" : "ห้องของฉัน"}
                subText={classInfo.primaryClass.className}
                id={classInfo.primaryClass._id}
              />
            )}

            {selectedSortOption === "EVERY" && (
              <TimetableItem
                color={userInfo.color}
                text={language === "EN" ? "My Class" : "ห้องของฉัน"}
                subText={classInfo.primaryClass.className}
                id={classInfo.primaryClass._id}
              />
            )}
            {selectedSortOption === "EVERY" &&
              classInfo.starredClass?.map((element, index) => {
                return (
                  <TimetableItem
                    key={index}
                    color={element.color}
                    text={element.className}
                    subText={toSchoolName(element.school)}
                    id={element._id}
                    delay={index / 10}
                  />
                );
              })}
            {classInfo.starredClass &&
              classInfo.starredClass
                .filter((element) => element.school === selectedSortOption)
                .map((element, index) => {
                  let schoolName;
                  switch (element.school) {
                    case "ASSUMPTION":
                      language === "EN"
                        ? (schoolName = "Assumption")
                        : (schoolName = "อัสสัมชัญ");
                      break;
                    case "NEWTON":
                      language === "EN"
                        ? (schoolName = "Newton")
                        : (schoolName = "นิวตัน");
                      break;
                    case "ESSENCE":
                      language === "EN"
                        ? (schoolName = "Essence")
                        : (schoolName = "เอสเซนส์");
                      break;
                    default:
                      language === "EN" ? (schoolName = "") : (schoolName = "");
                      break;
                  }
                  return (
                    <TimetableItem
                      key={index}
                      color={element.color}
                      text={element.className}
                      subText={schoolName}
                      id={element._id}
                      delay={index / 10}
                    />
                  );
                })}
            <div
              className="timetable__item timetable__add"
              style={{
                backgroundColor: "#FFFFFF",
              }}
              onClick={() =>
                dispatch(
                  modalActions.openModal({
                    header: "",
                    text: "",
                    centeredModal: true,
                    type: { code: "ADDCLASS" },
                  })
                )
              }
            >
              <h3 style={{ color: "#969696" }}>+</h3>
            </div>
          </motion.section>
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="bar timetable"
        >
          <Link
            to="/preferences#addRemovetimetables"
            className="timetable__item"
            style={{
              backgroundColor: "#FFFFFF",
            }}
          >
            <h3 style={{ color: "#969696" }}>+</h3>
          </Link>
        </motion.section>
      )}
    </>
  );
};

export default TimetableList;

import { useParams } from "react-router-dom";

const Timetable = () => {
  const { timetableId } = useParams();

  return <>Timetable of id {timetableId}</>;
};

export default Timetable;

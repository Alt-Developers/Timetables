export interface activity {
  classes: timetable[];
}

export interface timetable {
  id: string;
  className: string;
  school: string;
  activity: string;
}

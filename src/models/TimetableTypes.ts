export interface activity {
  timetables: timetable[];
  highlightedPost: {};
}

export interface timetable {
  id: string;
  className: string;
  school: string;
  activity: string;
}

export interface contentPane {
  param: String;
  full: JSX.Element;
  element: JSX.Element;
}

export interface timetableContent {
  className: string;
  school: string;
  timeLayout: string[];
  timetableContent: {
    monday: period[];
    tuesday: period[];
    wednesday: period[];
    thursday: period[];
    friday: period[];
    saturday: never[];
    sunday: never[];
  };
  identifier: {
    isConditional: boolean;
    curClass: number;
    nextClass: number;
    prevClass: number;
  };
}

export interface period {
  name: string;
  tag: string;
  horizontalSpan: number;
  verticalSpan: number;
  _id: string;
}

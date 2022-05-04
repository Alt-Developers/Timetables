export interface accountState {
  isAuthenticated: boolean;
  userInfo: {
    type?: "developer" | "user";
    color?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    config?: {
      dateTime: string;
      showCovid: string;
      language: string;
    };
  };
  covid: {
    newCases?: number;
    newDeaths?: number;
    country?: string;
    lastUpdated?: string;
    isFetched: boolean;
  };
  covidWorldwide: {
    newCases?: number;
    lastUpdated?: string;
    isFetched: Object;
  };
  language: string;
}

export interface modalState {
  isOpen: boolean;
  header: string;
  text: string;
  type: {
    code: string;
  };
}

export interface refetchState {
  refetchCount: number;
  refetchTimetableCount: number;
}

export interface timetableState {
  format: {
    [key: string]: {
      [key: string]: {
        name: string;
        icon: string;
      };
    };
  };
  classInfo: {
    primaryClass?: {
      _id: string;
      school: string;
      className: string;
      color: string;
    };
    starredClass?: any[];
  };
}

export interface glanceInfo {
  curClass?: string;
  nextClass?: string;
  name?: {
    TH?: string;
    EN?: string;
  };
  format?: {
    classCode: {
      EN: {
        [key: string]: {
          name: string;
          icon: string;
        };
      };
      TH: {
        [key: string]: {
          name: string;
          icon: string;
        };
      };
    };
  };
  desc?: {
    TH: string;
    EN: string;
  };
  refresher?: string[];
  time?: {
    thisClassTime: string;
    nextClassTime: string;
  };
}

export interface unformattedPeriod {
  currentPeriod?: string;
  nextPeriod?: string;
}

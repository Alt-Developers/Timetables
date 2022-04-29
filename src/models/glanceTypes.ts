export interface glanceInfo {
  curClass?: string;
  nextClass?: string;
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

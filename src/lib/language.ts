const lang = (language, eng, thai) => {
  if (language === "EN") return thai;
  if (language === "TH") return eng;
};

export default lang;

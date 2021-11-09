const fs = require("fs");
const path = require("path");

exports.getConfig = (classNo, cb, errcb) => {
  console.log(classNo);
  console.log(path.join(__dirname, "..", "config", classNo));
  fs.readFile(
    path.join(__dirname, "..", "config", classNo + ".json"),
    (err, data) => {
      if (data == "" || err) {
        console.log("KK");
        return errcb();
      }
      const parsedData = JSON.parse(data);
      //   console.log(parsedData.english);

      cb(parsedData);
      return;
    }
  );
};

const express = require("express");
const path = require("path");

const controller = require(path.join(
  __dirname,
  "..",
  "controllers",
  "periodRender"
));

const router = express.Router();

router.get("/m:classNumber", (req, res, next) => {
  const classNo = req.params.classNumber;
  controller.getConfig(
    classNo,
    (config) => {
      console.log(config);
      res.render("template", {
        classNumber: config.classNumber,
        english: config.english,
        thai: config.thai,
      });
    },
    () => {
      res.render("errors/noconfig");
    }
  );
});

module.exports = router;

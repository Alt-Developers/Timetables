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
  console.log("Req had arrived");
  const classNo = req.params.classNumber;
  controller.getConfig(
    classNo,
    (config) => {
      console.log(config.program);
      res.render("template", {
        classNumber: config.classNumber,
        english: config.english,
        thai: config.thai,
        program: config.program,
      });
    },
    () => {
      res.render("errors/noconfig");
    }
  );
});

module.exports = router;

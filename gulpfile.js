const gulp = require("gulp")
const concat = require("gulp-concat")

gulp.task("default", (done) => {
    console.log("concating and moving all css files in css folder")
    gulp.src("public/css/**.css")
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("public/dist"))
    done()
})
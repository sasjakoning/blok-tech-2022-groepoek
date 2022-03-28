const gulp = require("gulp")
const concat = require("gulp-concat")
const nodemon = require("gulp-nodemon")

gulp.task("default", (done) => {
    var stream = nodemon({
        script: "app.js",
        ext: "html js css",
        ignore: "style.min.css",
        tasks: ["concat"]
    })
    done()

    // stream.on("restart", () => {
    //     console.log("restarted!")
    // })
    // .on("crash", () => {
    //     console.error("Application has crashed!\n")
    //     stream.emit("restart", 10)
    // })
})

gulp.task("concat", (done) => {
    console.log("concating and moving all css files in css folder")
    gulp.src("public/css/**.css")
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("public/dist"))
    done()
})

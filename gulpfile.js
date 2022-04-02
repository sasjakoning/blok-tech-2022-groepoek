const gulp = require("gulp")
const concat = require("gulp-concat")
const nodemon = require("gulp-nodemon")

gulp.task("default", (done) => {
    const stream = nodemon({
        script: "app.js",
        ext: "html js css",
        ignore: "style.min.css",
        tasks: ["concat"]
    })

    stream.on("restart", () => {
        console.log("restarted!")
    })
    .on("crash", () => {
        console.error("Application has crashed!\n")
        stream.emit("restart", 10)
    })

    done()
})

gulp.task("concat", (done) => {
    console.log("concating and moving all css files in css folder")
    gulp.src(["./public/css/cssreset.css", "./public/css/**.css"])
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("public/dist"))
    done()
})

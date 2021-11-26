const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

gulp.task('server',function(){
    browserSync.init({
        server : {
            baseDir : 'src'
        }
    })
});

gulp.task('cleanImg',function() {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced : true,
        })))
})

gulp.task('styles',function(){
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({
            outputStyle : 'compressed'
        }).once('error',sass.logError))
        .pipe(rename({
            prefix : "",
            suffix : ".min"
        }))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
});

gulp.task('watch',function(){
    gulp.watch("src/sass/**/*.+(sass|scss)",gulp.parallel('styles'))
    gulp.watch("src/**/*").on('change',browserSync.reload);
});

gulp.task('def',gulp.parallel('watch','styles'))
import darkSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // зжаття css 
import webpcss from 'gulp-webpcss'; // показ webp зображень 
import autoPrefixer from 'gulp-autoprefixer'; // додавання вендорних префіксів
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групування медіа запросів

const sass = gulpSass(darkSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss(
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                ))
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoPrefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        // Якщо потрібен не зжатий дубль файли стилів 
        .pipe(app.gulp.dest(app.path.build.css))
        
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}
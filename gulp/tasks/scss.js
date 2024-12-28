import * as darkSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cssnano from 'gulp-cssnano'; // стиснення css 
import webpcss from 'gulp-webpcss'; // підтримка webp зображень 
import autoPrefixer from 'gulp-autoprefixer'; // додавання вендорних префіксів
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групування медіа запитів

// Ініціалізація Gulp Sass з використанням darkSass
const sass = gulpSass(darkSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({ outputStyle: 'expanded' })) // перший етап - компіляція SCSS у CSS
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries() // групування медіа запитів
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                }) // підтримка webp
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoPrefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"], // підтримка останніх 3 версій браузерів
                    cascade: true
                })
            )
        )
        // Якщо потрібно зберігати не зжаті стилі
        .pipe(app.gulp.dest(app.path.build.css)) 
        
        .pipe(cssnano())  
        .pipe(rename({ extname: ".min.css" })) // зміна розширення на .min.css після стиснення
        .pipe(app.gulp.dest(app.path.build.css)) // збереження в кінцеву директорію
        .pipe(app.plugins.browsersync.stream()); // оновлення браузера в реальному часі
};

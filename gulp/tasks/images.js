
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images, { encoding: false })
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%= error.message %>"
        })
    ))
    
    .pipe(app.plugins.newer(app.path.build.images))  // Перевіряємо наявність нових файлів
    .pipe(imagemin({  // Мінімізуємо оригінальні зображення
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 5  // Оптимізація зображень (від 0 до 7)
    }))
    .pipe(app.gulp.dest(app.path.build.images))  // Зберігаємо мінімізовані оригінали

    // Обробляємо SVG файли
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))

    // Оновлення браузера після зміни
    .pipe(app.plugins.browsersync.stream());
}

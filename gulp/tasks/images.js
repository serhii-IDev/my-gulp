import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

// Завдання для обробки зображень
export const images = () => {
    return app.gulp.src(app.path.src.images, { encoding: false })  // Беремо всі зображення
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%= error.message %>"
        })
    ))
    
    .pipe(app.plugins.newer(app.path.build.images))  // Перевірка нових файлів (щоб не обробляти вже оброблені)
    
    // Мінімізуємо оригінальні зображення
    .pipe(imagemin({  
        progressive: true,  // Для JPEG
        svgoPlugins: [{ removeViewBox: false }],  // Для SVG
        interlaced: true,  // Для GIF
        optimizationLevel: 5  // Оптимізація зображень (від 0 до 7)
    }))
    .pipe(app.gulp.dest(app.path.build.images))  // Зберігаємо мінімізовані оригінали

    // Перетворення зображень у формат WebP
    .pipe(app.gulp.src(app.path.src.images, { encoding: false }))  // Знову беремо зображення
    .pipe(webp())  // Перетворення в WebP
    .pipe(app.gulp.dest(app.path.build.images))  // Зберігаємо WebP зображення в build/images
    
    // Обробка SVG файлів окремо (якщо вони є)
    .pipe(app.gulp.src(app.path.src.svg))  // Шлях до SVG файлів
    .pipe(app.gulp.dest(app.path.build.images))  // Зберігаємо їх без змін
    
    // Оновлення браузера після змін
    .pipe(app.plugins.browsersync.stream());
}

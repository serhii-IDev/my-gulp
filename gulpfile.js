// основний модуль 
import gulp from "gulp";
// імпорт шляхів
import { path } from "./gulp/config/path.js";
// імпорт плагінів 
import { plugins } from "./gulp/config/plugins.js";

// передаємо значення в глобальну зміну
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

// імпорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
 
// спостереження за змінами
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive };

// покрокова обробка шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// головні задачі 
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// будування сценаріїв 
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// виконання сценарію за замовчуванням 
gulp.task('default', dev);


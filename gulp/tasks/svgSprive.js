import svgSprite from "gulp-svg-sprite";
// Завдання для обробки тільки SVG іконок і створення SVG спрайту
export const svgSprive = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {})  // Беремо тільки SVG іконки з папки svgicons
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVG',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(svgSprite({
      mode: {
        stack:{
          sprite: `../icons/icons.svg`,
          example: true
        }
      }
    }))
   
    .pipe(app.gulp.dest(`${app.path.build.images}`));  // Зберігаємо спрайт в папці dist/svgicons
};

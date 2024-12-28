import gulp from 'gulp';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename'; // Для зміни імені файлів

export const js = () => {
    return gulp.src('src/js/**/*.js')  // Шлях до JavaScript файлів
    .pipe(concat('main.js'))  // Об'єднання всіх JS файлів в один
    .pipe(gulp.dest('dist/js'))  // Виведення результату в dist/js (незмінений файл)
    .pipe(uglify())  // Мінімізація JavaScript
    .pipe(rename({ suffix: '.min' }))  // Додаємо суфікс .min до імені файлу
    .pipe(gulp.dest('dist/js'));  // Виведення мінімізованого файлу в dist/js
};


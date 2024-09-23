/*---------інфо-про-плагіни-------------------------------------*/
import replace from "gulp-replace"; // пошук і заміна 
import plumber from "gulp-plumber"; // обробка помилок 
import notify from "gulp-notify"; // сповіщення (підказки)
import browsersync from "browser-sync"; // локальний сервер 
import newer from "gulp-newer"; // перевірка оновлення 
import gulpIf from "gulp-if"; // умовне розгалуження 

// експортуємо об'єкт
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: gulpIf,
}
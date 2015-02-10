/*
 * 小车走起
 */
var startCar = function () {
    setTimeout(function () {
        $('.car').addClass('car-start');
    }, 500);
};

$(function () {
    startCar();
});

function getUnique() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i - 0] = arguments[_i];
    }
    return arr.filter(function (value, index, array) {
        return array.indexOf(value) == index;
    });
}
console.log(getUnique(1, 2, 2, 3, 4, 4, 5, 2, 2));

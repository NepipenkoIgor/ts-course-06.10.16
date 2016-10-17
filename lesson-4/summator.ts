function summator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var total = 0;
    args.forEach(function (value, index, array) {
        total += typeof value === 'string' ? parseInt(value) : value;
    });
    return total;
}
console.log(summator(1, 2, 3));
console.log(summator('4', '5', '6'));

function isInArray(container) {
    var varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varArgs[_i - 1] = arguments[_i];
    }
    return container.every(function (value, index, array) {
        return varArgs.indexOf(value) >= 0;
    });
}
console.log("Mismatch (cyan, magenta, yellow) = " + isInArray(['red', 'green', 'blue'], 'cyan', 'magenta', 'yellow'));
console.log("Match (red, green, blue) = " + isInArray(['red', 'green', 'blue'], 'red', 'green', 'blue'));

function isInArray<T>(container: Array<T>, ...varArgs: Array<T>): boolean {
    return container.every((value, index, array) => {
        return varArgs.indexOf(value) >= 0;
    });
}

console.log(`Mismatch (cyan, magenta, yellow) = ${isInArray<string>(['red', 'green', 'blue'], 'cyan', 'magenta', 'yellow')}`);

console.log(`Match (red, green, blue) = ${isInArray<string>(['red', 'green', 'blue'], 'red', 'green', 'blue')}`);

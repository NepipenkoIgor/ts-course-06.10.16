function getUnique<T>(...arr: Array<T>): Array<T> {
    return arr.filter((value, index, array) => {
        return array.indexOf(value) == index;
    });
}

console.log(getUnique(1, 2, 2, 3, 4, 4, 5, 2, 2));

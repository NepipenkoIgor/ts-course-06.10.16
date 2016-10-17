function isInArray(array: any[], ...values: any[]): boolean {
    return values.every(value => array.includes(value));
}


function summator(...numbers: number[]): number;
function summator(...numbers: string[]): number;
function summator(...numbers: any[]): number {
    if (typeof numbers[0] === 'string') {
        numbers = numbers.map(val => parseInt(val, 10));
    }

    return numbers.reduce((acc, val) => acc + val);
}


function getUnique(array: any[]): any[] {
    return array.filter((val, index) => array.indexOf(val) === index);
}


function isLetter(char: string): boolean {
    return char.toLowerCase() != char.toUpperCase();
}

function swap(array: any[], indexA: number, indexB: number): void {
    const temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
}

function reverseWord(word: string): string {
    const array: string[] = word.split('');
    let start: number = 0;
    let end: number = word.length - 1;

    while (end > 0 && start <= end) {
        // skip non-letters
        while(!isLetter(word[end])) {
            end--;
        }
        while(!isLetter(word[start])) {
            start++;
        }

        swap(array, start, end);

        end--;
        start++;
    }

    return array.join('');
}

function reverseSentence(str: string): string {
    return str.split(/\s/).map(reverseWord).join(' ');
}


console.log(isInArray([1,2,3,4,5], 4));
console.log(isInArray([1,2,3,4,5], 7));

console.log(summator(1,2,3,4,5));
console.log(summator('1','2','3','4','5'));

console.log(getUnique([1,2,1,3,4,4,2,5]));

console.log(reverseSentence('s1tar3t'));
console.log(reverseSentence('s1tar3t 2 hellow'));
console.log(reverseSentence('s1ta$%r3t 2 hel^low'));
console.log(reverseSentence('s1tar3t 2   low5'));

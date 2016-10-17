function revertSentence(sentence:string):string {
    let wordsArr = sentence.replace(/\d*/g, '').split(' ');
    let revertLettersArr = wordsArr.map((word:string):string => {
        return word ? word.replace(/\W*/g, '').split('').reverse().join('') : word;
    }).join('').split('');
    let j = 0;
    return Array.prototype.map.call(sentence, (w:string):string => {
        if (!isNaN(parseInt(w, 10)) || /\W/.test(w)) {
            return w;
        }
        j++;
        return revertLettersArr[j - 1];
    }).join('');
}

let s1 = 's1tar3t 2 hellow';
let s2 = 's1ta$%r3t 2 hel^low';
let s3 = 's1tar3t 2   low5';
console.log(s1, ' -> ', revertSentence(s1));
console.log(s2, ' -> ', revertSentence(s2));
console.log(s3, ' -> ', revertSentence(s3));

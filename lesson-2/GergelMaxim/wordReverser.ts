function wordReverser (sentence : string) : string
{
    let words = sentence.split(' ');

    for (let i = 0; i < words.length; i++)
    {
        let newLeftWord : string = '';
        let newRightWord : string = '';

        for (let j = 0; j < words[i].length / 2; j++)
        {
            const leftChar : string = words[i].charAt(j);
            const rightChar : string = words[i].charAt(words[i].length - j - 1);
            if (j == words[i].length - j - 1)
            {
                newLeftWord += leftChar;
            }
            else
                if (isAlphaChar(leftChar) && isAlphaChar(rightChar))
                {
                    newLeftWord += rightChar;
                    newRightWord = leftChar + newRightWord;
                }
                else
                {
                    newLeftWord += leftChar;
                    newRightWord = rightChar + newRightWord;
                }
        }
        words[i] = newLeftWord + newRightWord;
    }

    return words.reduce((previousValue: string, currentValue: string, currentIndex: number, array: string[]) => { return `${previousValue} ${currentValue}`; });
}

function isAlphaChar (char : string) : boolean
{
    return /[a-zа-яё]/i.test(char);
}

console.log(wordReverser('s1tar3t 2 hellow'));
console.log(wordReverser('s1ta$%r3t 2 hel^low'));
console.log(wordReverser('s1tar3t 2   low5'));

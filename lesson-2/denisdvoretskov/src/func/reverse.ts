function* getWord(str: string) {
  // TODO: update for more than one byte chars
  const arr: string[] | null = str.match(/\b\S+ */g);
  if (arr === null) {
    throw new Error("can't find word");
  }

  for (let word of arr) {
    yield word;
  }
}

function isLetter(char: string): boolean {
  return /[a-z]/i.test(char);
}

function reverseWord(word: string): string {
  const arr: string[] = word.split('');
  const letters: string[] = arr.filter(
    (char: string) => isLetter(char)
  ).reverse();
  let i: number = -1;

  return arr.map(
    (char: string) => isLetter(char) ? null : char
  )
  .map(item => item === null ? letters[++i] : item)
  .join('');
}

function reverse(str: string): string {
  if (str.trim().length < 2) {
    return str;
  }
  const genWord = getWord(str);
  let result: string = '';

  for (let word of genWord) {
    result += reverseWord(word);
  }

  return result;
}

export default reverse;

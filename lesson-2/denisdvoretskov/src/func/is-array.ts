type TInArray = number | string | boolean;

function isInArray(arr: TInArray[], ...rest: TInArray[]): boolean {
  if (rest.length === 0) {
    return false;
  }

  return rest.every(item => arr.includes(item));
}

export default isInArray;

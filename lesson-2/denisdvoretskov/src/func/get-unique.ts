type TGetUnique = number | string | boolean;

function getUnique(...rest: TGetUnique[]): TGetUnique[] {
  if (rest.length < 2) {
    return rest;
  }

  return rest.filter((item, index, arr) => arr.indexOf(item) === index);
}

export default getUnique;

type TSummator = number | string;

function summator(...rest: TSummator[]): number {
  return rest.reduce<number>(
    (pre: number, cur: TSummator) =>
    pre + (typeof cur === 'string' ? parseFloat(<string>cur) : cur), 0
  );
}

export default summator;

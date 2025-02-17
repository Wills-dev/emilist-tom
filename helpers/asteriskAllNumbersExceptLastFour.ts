export function asteriskAllExceptLastFour(num: number | string): string {
  const str = num.toString();

  if (str.length <= 4) {
    return str;
  }

  const asteriskedPart = "*".repeat(str.length - 4);
  const lastFourDigits = str.slice(-4);

  return asteriskedPart + lastFourDigits;
}

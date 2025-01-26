export function getLevelValue(level: string): number {
  const levels: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
  };

  return levels[level.toLowerCase()] ?? 1;
}

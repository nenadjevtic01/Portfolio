export function decodeEmail(encoded: string): string {
  return atob(encoded).split('').reverse().join('');
}

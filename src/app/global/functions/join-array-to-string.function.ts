export function joinArrayToString(items: string[] | undefined): string {
  if (!items || items.length === 0) {
    return '-';
  }
  return items.join(', ');
}

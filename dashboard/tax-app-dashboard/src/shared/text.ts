export function truncateText(text: string, maxLength: number = 50) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function formatTableHeader(header: string) {
  header = header.replaceAll("_", " ");
  return header;
}

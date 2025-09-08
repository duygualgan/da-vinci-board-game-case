export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible = 4
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisible + 2) {

    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  pages.push(1);

  if (left > 2) pages.push("…");

  for (let i = left; i <= right; i++) pages.push(i);

  if (right < totalPages - 1) pages.push("…");

  pages.push(totalPages);

  return pages;
}

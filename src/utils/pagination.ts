export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible = 2
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisible + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  if (currentPage <= maxVisible) {
    for (let i = 1; i <= maxVisible; i++) pages.push(i);
    pages.push("...");
    pages.push(totalPages);
    return pages;
  }

  if (currentPage >= totalPages - (maxVisible - 1)) {
    pages.push(1);
    pages.push("...");
    for (let i = totalPages - (maxVisible - 1); i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages);

  return pages;
}

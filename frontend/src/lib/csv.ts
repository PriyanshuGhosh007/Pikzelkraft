export type CsvRow = Record<string, string | number | null | undefined>;

function escapeCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function buildCsv(rows: CsvRow[]): string {
  if (rows.length === 0) return "";
  const headers = Array.from(
    rows.reduce((seen, row) => {
      Object.keys(row).forEach((key) => seen.add(key));
      return seen;
    }, new Set<string>())
  );
  const lines = rows.map((row) => headers.map((header) => escapeCell(row[header])).join(","));
  return [headers.join(","), ...lines].join("\n");
}

export function downloadTextFile(filename: string, content: string, mime = "text/csv"): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportCsv(filename: string, rows: CsvRow[]): void {
  downloadTextFile(filename, buildCsv(rows));
}

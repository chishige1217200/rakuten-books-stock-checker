// string[] → カンマ区切り文字列
export function arrayToCommaString(arr: string[]): string {
  return arr.join(",");
}

// カンマ区切り文字列 → string[]
export function commaStringToArray(str: string): string[] {
  // 空文字対応・空要素除外のためtrimとfilterを追加
  return str
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

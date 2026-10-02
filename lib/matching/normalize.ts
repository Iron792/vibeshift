export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\b(feat|ft|featuring|official|video|audio|lyrics)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeArtists(artists: string[]): string {
  return artists.map(normalizeText).sort().join(" ");
}

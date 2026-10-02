import { Track } from "../providers/types";
import { normalizeArtists, normalizeText } from "./normalize";

export type MatchResult = {
  source: Track;
  candidate?: Track;
  confidence: number;
  status: "matched" | "likely" | "possible" | "not_found";
};

function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.9;
  const aa = new Set(a.split(" "));
  const bb = new Set(b.split(" "));
  const intersection = [...aa].filter(x => bb.has(x)).length;
  return intersection / Math.max(aa.size, bb.size);
}

export function scoreTrack(source: Track, candidate: Track): number {
  const title = similarity(normalizeText(source.title), normalizeText(candidate.title));
  const artists = similarity(normalizeArtists(source.artists), normalizeArtists(candidate.artists));

  let duration = 0.5;
  if (source.durationMs && candidate.durationMs) {
    const diff = Math.abs(source.durationMs - candidate.durationMs);
    duration = Math.max(0, 1 - diff / 30000);
  }

  const isrc = source.isrc && candidate.isrc && source.isrc === candidate.isrc ? 1 : 0;

  return Math.round((isrc * 0.5 + title * 0.3 + artists * 0.15 + duration * 0.05) * 100);
}

export function classify(score: number): MatchResult["status"] {
  if (score >= 90) return "matched";
  if (score >= 70) return "likely";
  if (score >= 50) return "possible";
  return "not_found";
}

export function findBestMatch(source: Track, candidates: Track[]): MatchResult {
  let best: Track | undefined;
  let bestScore = 0;

  for (const candidate of candidates) {
    const score = scoreTrack(source, candidate);
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return { source, candidate: best, confidence: bestScore, status: classify(bestScore) };
}

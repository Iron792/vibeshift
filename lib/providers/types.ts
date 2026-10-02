export type Provider = "spotify" | "youtube";

export type Track = {
  id: string;
  title: string;
  artists: string[];
  album?: string;
  durationMs?: number;
  isrc?: string;
  url?: string;
  artworkUrl?: string;
};

export type Playlist = {
  id: string;
  name: string;
  description?: string;
  trackCount: number;
  artworkUrl?: string;
  url?: string;
};

export interface MusicProvider {
  getPlaylists(): Promise<Playlist[]>;
  getPlaylistTracks(playlistId: string): Promise<Track[]>;
  searchTracks(query: string): Promise<Track[]>;
  createPlaylist(name: string, description?: string): Promise<Playlist>;
  addTracks(playlistId: string, trackIds: string[]): Promise<void>;
}

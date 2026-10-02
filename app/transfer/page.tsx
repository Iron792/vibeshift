"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Info,
  Music2,
  Search,
  ShieldCheck,
  Sparkles,
  Youtube,
} from "lucide-react";

type Provider = "spotify" | "youtube";

type Playlist = {
  id: string;
  name: string;
  description: string;
  tracks: number;
  updated: string;
  colors: string;
};

const playlists: Playlist[] = [
  { id: "chill", name: "Chill Vibes", description: "Slow mornings and soft afternoons.", tracks: 42, updated: "Updated 2 days ago", colors: "artwork-sage" },
  { id: "late", name: "Late Night Drive", description: "Neon lights, open roads.", tracks: 68, updated: "Updated 1 week ago", colors: "artwork-violet" },
  { id: "focus", name: "Deep Focus", description: "Instrumentals for getting in the zone.", tracks: 31, updated: "Updated 3 weeks ago", colors: "artwork-amber" },
  { id: "liked", name: "Liked Songs", description: "The songs you keep coming back to.", tracks: 156, updated: "Updated today", colors: "artwork-blue" },
];

const steps = ["Source", "Playlist", "Destination", "Review"];

function ProviderIcon({ provider }: { provider: Provider }) {
  return provider === "spotify" ? <span className="spotify-glyph">●</span> : <span className="youtube-glyph"><Youtube /></span>;
}

export default function TransferPage() {
  const [step, setStep] = useState(0);
  const [source, setSource] = useState<Provider | null>(null);
  const [destination, setDestination] = useState<Provider | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState("chill");
  const [search, setSearch] = useState("");

  const visiblePlaylists = useMemo(
    () => playlists.filter((playlist) => playlist.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const selectSource = (provider: Provider) => {
    setSource(provider);
    setDestination(provider === "spotify" ? "youtube" : "spotify");
    setStep(1);
  };

  const selected = playlists.find((playlist) => playlist.id === selectedPlaylist) ?? playlists[0];

  return (
    <main className="transfer-page">
      <nav className="nav transfer-nav">
        <Link className="brand" href="/"><span className="brand-mark"><Music2 size={18} /></span> VibeShift</Link>
        <div className="transfer-nav-right"><span className="status-pill"><span /> Demo mode</span><Link href="/">Exit</Link></div>
      </nav>

      <div className="transfer-layout">
        <aside className="transfer-sidebar">
          <Link href="/" className="back"><ArrowLeft size={15} /> Back home</Link>
          <div className="sidebar-intro"><span className="eyebrow"><span /> NEW TRANSFER</span><h2>Move your music<br /><em>without the mess.</em></h2></div>
          <div className="stepper" aria-label="Transfer progress">
            {steps.map((label, index) => (
              <div className={`stepper-item ${index === step ? "active" : ""} ${index < step ? "complete" : ""}`} key={label}>
                <span className="stepper-number">{index < step ? <Check /> : `0${index + 1}`}</span><span>{label}</span>
              </div>
            ))}
          </div>
          <div className="sidebar-note"><ShieldCheck size={16} /><span>Your accounts stay yours.<br /><b>We never store passwords.</b></span></div>
        </aside>

        <section className="transfer-content">
          <div className="mobile-progress"><span>STEP {String(step + 1).padStart(2, "0")} / 04</span><b>{steps[step]}</b><div><i style={{ width: `${((step + 1) / 4) * 100}%` }} /></div></div>
          {step === 0 && <>
            <div className="content-heading"><span className="section-label">STEP 01 / 04</span><h1>Where is your playlist?</h1><p>Choose the service you're moving music <span>from.</span></p></div>
            <div className="provider-choice-grid">
              <button className="provider-choice spotify-choice" onClick={() => selectSource("spotify")}><div className="provider-choice-top"><ProviderIcon provider="spotify" /><span className="connect-arrow"><ArrowRight /></span></div><strong>Spotify</strong><small>Connect your Spotify library</small><div className="provider-meta"><span>Popular choice</span><span>OAuth secure</span></div></button>
              <button className="provider-choice youtube-choice" onClick={() => selectSource("youtube")}><div className="provider-choice-top"><ProviderIcon provider="youtube" /><span className="connect-arrow"><ArrowRight /></span></div><strong>YouTube</strong><small>Connect your Google account</small><div className="provider-meta"><span>Official API</span><span>OAuth secure</span></div></button>
            </div>
            <div className="supported-row"><Sparkles size={15} /><span>More services are coming soon.</span><button>See what's next <ArrowRight /></button></div>
          </>}

          {step === 1 && <>
            <div className="content-heading"><span className="section-label">STEP 02 / 04</span><h1>Pick a playlist.</h1><p>Choose what you want to bring over from <b className="inline-provider"><ProviderIcon provider={source ?? "spotify"} /> {source === "youtube" ? "YouTube" : "Spotify"}</b>.</p></div>
            <div className="connected-banner"><div className="avatar"><ProviderIcon provider={source ?? "spotify"} /></div><div><b>{source === "youtube" ? "YouTube" : "Spotify"} connected</b><span>alex@vibeshift.fm</span></div><span className="connected-check"><Check /></span></div>
            <div className="playlist-toolbar"><label className="search-field"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search playlists" aria-label="Search playlists" /></label><button className="sort-button">Recently updated <ChevronDown /></button></div>
            <div className="playlist-grid">{visiblePlaylists.map((playlist) => <button key={playlist.id} className={`playlist-card ${selectedPlaylist === playlist.id ? "selected" : ""}`} onClick={() => setSelectedPlaylist(playlist.id)}><div className={`playlist-art ${playlist.colors}`}><span>{playlist.name.slice(0, 1)}</span></div><div className="playlist-copy"><strong>{playlist.name}</strong><span>{playlist.description}</span><small><Clock3 /> {playlist.updated}</small></div><div className="playlist-count"><b>{playlist.tracks}</b><span>tracks</span></div>{selectedPlaylist === playlist.id && <span className="selected-mark"><Check /></span>}</button>)}</div>
            <div className="action-row"><button className="text-button" onClick={() => setStep(0)}><ArrowLeft /> Change source</button><button className="primary" onClick={() => setStep(2)}>Continue <ArrowRight /></button></div>
          </>}

          {step === 2 && <>
            <div className="content-heading"><span className="section-label">STEP 03 / 04</span><h1>Where should it go?</h1><p>One last connection, then we'll line up every track.</p></div>
            <div className="route-card"><div><ProviderIcon provider={source ?? "spotify"} /><span>{source === "youtube" ? "YouTube" : "Spotify"}<small>Source</small></span></div><ArrowRight className="route-arrow" /><div className="route-destination"><ProviderIcon provider={destination ?? "youtube"} /><span>{destination === "spotify" ? "Spotify" : "YouTube"}<small>Destination</small></span></div></div>
            <div className="destination-options"><span className="section-label">CHOOSE A DESTINATION</span><button className="destination-option" onClick={() => setDestination(source === "spotify" ? "youtube" : "spotify")}><ProviderIcon provider={destination ?? "youtube"} /><div><b>{destination === "spotify" ? "Spotify" : "YouTube"}</b><span>Connect to create your new playlist</span></div><Check /></button></div>
            <div className="info-card"><Info /><div><b>Your original playlist stays untouched.</b><span>VibeShift creates a copy in your destination account.</span></div></div>
            <div className="action-row"><button className="text-button" onClick={() => setStep(1)}><ArrowLeft /> Back</button><button className="primary" onClick={() => setStep(3)}>Connect & continue <ArrowRight /></button></div>
          </>}

          {step === 3 && <>
            <div className="content-heading"><span className="section-label">STEP 04 / 04</span><h1>Ready to move it?</h1><p>We'll match every song, flag anything uncertain, and let you review before creating the copy.</p></div>
            <div className="review-summary"><div className={`playlist-art ${selected.colors}`}><span>{selected.name.slice(0, 1)}</span></div><div><span className="section-label">TRANSFERRING FROM {source === "youtube" ? "YOUTUBE" : "SPOTIFY"}</span><h3>{selected.name}</h3><p>{selected.tracks} tracks · {selected.description}</p></div></div>
            <div className="review-stats"><div><strong>{selected.tracks}</strong><span>Tracks to match</span></div><div><strong>~ 2 min</strong><span>Estimated time</span></div><div><strong>90%+</strong><span>Auto-approved</span></div></div>
            <label className="toggle-row"><span><b>Automatically approve high-confidence matches</b><small>Anything above 90% moves without a manual review.</small></span><input type="checkbox" defaultChecked /><i /></label>
            <button className="primary start-transfer" onClick={() => window.alert("Demo mode: your transfer is ready to connect to the official provider APIs.")}>Start transfer <ArrowRight /></button>
            <button className="text-button centered" onClick={() => setStep(2)}><ArrowLeft /> Back to destination</button>
          </>}
        </section>
      </div>
    </main>
  );
}


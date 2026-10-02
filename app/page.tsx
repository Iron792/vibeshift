import { ArrowRight, Check, Music2, Play, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  ["Smart matching", "Match tracks using title, artist, duration and identifiers.", Sparkles],
  ["Review before transfer", "See confidence scores and fix uncertain matches.", Check],
  ["Duplicate protection", "Avoid adding songs that already exist in the destination.", ShieldCheck],
];

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="brand"><span className="brand-mark"><Music2 size={19}/></span> VibeShift</div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <button className="ghost">Sign in</button>
        </div>
      </nav>

      <section className="hero">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="eyebrow"><span /> PLAYLIST MIGRATION, REIMAGINED</div>
        <h1>Move your music.<br/><em>Keep your vibe.</em></h1>
        <p className="hero-copy">
          Transfer playlists between Spotify and YouTube without rebuilding them song by song.
          Connect, match, review, and move.
        </p>
        <div className="hero-actions">
          <a className="primary" href="/transfer">Start a transfer <ArrowRight size={18}/></a>
          <a className="secondary" href="#how"><Play size={16}/> See how it works</a>
        </div>

        <div className="platform-flow">
          <div className="platform spotify"><span className="platform-icon">●</span> Spotify</div>
          <div className="flow-line"><span/><span/><span/></div>
          <div className="transfer-core"><RefreshCw size={22}/></div>
          <div className="flow-line"><span/><span/><span/></div>
          <div className="platform youtube"><span className="yt-icon">▶</span> YouTube</div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="section-label">01 / THE FLOW</div>
        <h2>Four steps. No playlist archaeology.</h2>
        <div className="steps">
          {["Connect your accounts", "Choose a playlist", "Review smart matches", "Transfer & enjoy"].map((x, i) => (
            <div className="step" key={x}><span>0{i+1}</span><h3>{x}</h3><p>{[
              "Authorize only the permissions needed to read and create playlists.",
              "Pick one playlist or prepare several for migration.",
              "Inspect confidence scores and manually fix anything questionable.",
              "Create the destination playlist and track every successful transfer."
            ][i]}</p></div>
          ))}
        </div>
      </section>

      <section id="features" className="section feature-section">
        <div className="section-label">02 / WHY VIBESHIFT</div>
        <h2>Built around the part that actually matters.</h2>
        <div className="features">
          {features.map(([title, body, Icon]) => (
            <div className="feature" key={title}>
              <div className="feature-icon"><Icon size={21}/></div>
              <h3>{title}</h3><p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark"><Music2 size={17}/></span> VibeShift</div>
        <span>Starter project · Spotify ↔ YouTube</span>
      </footer>
    </main>
  );
}
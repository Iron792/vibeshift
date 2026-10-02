import Link from "next/link";
import { ArrowLeft, ArrowRight, Music2, Sparkles } from "lucide-react";

export default function TransferPage() {
  return (
    <main className="transfer-page">
      <nav className="nav">
        <Link className="brand" href="/"><span className="brand-mark"><Music2 size={19}/></span> VibeShift</Link>
        <span className="status-pill"><span/> Demo mode</span>
      </nav>

      <section className="transfer-shell">
        <Link href="/" className="back"><ArrowLeft size={16}/> Back</Link>
        <div className="section-label">TRANSFER / 01</div>
        <h1>Where is your playlist?</h1>
        <p className="muted">Choose the source platform to begin. OAuth and API services are intentionally scaffolded for your next step.</p>

        <div className="provider-grid">
          <button className="provider-card">
            <span className="provider-logo spotify-logo">●</span>
            <div><strong>Spotify</strong><small>Connect your Spotify library</small></div>
            <ArrowRight/>
          </button>
          <button className="provider-card">
            <span className="provider-logo youtube-logo">▶</span>
            <div><strong>YouTube</strong><small>Connect your Google account</small></div>
            <ArrowRight/>
          </button>
        </div>

        <div className="info-card">
          <div className="feature-icon"><Sparkles size={19}/></div>
          <div><strong>Next milestone</strong><p>Wire the provider adapters to official OAuth flows, then replace this demo selection with live playlist data.</p></div>
        </div>
      </section>
    </main>
  );
}
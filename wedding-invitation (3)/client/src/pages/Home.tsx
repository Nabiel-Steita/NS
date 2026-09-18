import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, CalendarDays, Camera, Heart, MapPin, Menu, Music2, Sparkles, X } from "lucide-react";

const heroImage = "/manus-storage/wedding-courtyard_42710adf.jpg";
const navItems = [
  { label: "Countdown", target: "countdown" },
  { label: "Our story", target: "story" },
  { label: "Photos", target: "photos" },
  { label: "Our film", target: "film" },
  { label: "Notes", target: "notes" },
];

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

function getTimeLeft() {
  const target = new Date("2026-12-02T18:00:00+03:00").getTime();
  const difference = Math.max(0, target - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function Home() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [envelopeClosing, setEnvelopeClosing] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("envelope-locked", !envelopeOpened);
    return () => document.body.classList.remove("envelope-locked");
  }, [envelopeOpened]);

  const handleEnvelopeOpen = () => {
    if (envelopeOpening) return;
    setEnvelopeOpening(true);
    window.setTimeout(() => setEnvelopeClosing(true), 900);
    window.setTimeout(() => setEnvelopeOpened(true), 1450);
  };

  return (
    <main className={`site-shell ${envelopeClosing || envelopeOpened ? "site-revealing" : ""}`}>
      {!envelopeOpened && (
        <section className={`envelope-gate ${envelopeClosing ? "is-closing" : ""}`} aria-label="Open wedding envelope">
          <div className="gate-glow" />
          <div className="gate-topline">A little something for you</div>
          <button className={`wedding-envelope ${envelopeOpening ? "is-open" : ""}`} onClick={handleEnvelopeOpen} aria-label="Open the wedding envelope">
            <span className="envelope-paper">
              <span className="envelope-flap" />
              <span className="envelope-letter"><small>THE COUNTDOWN IS ON</small><strong>N <i>&amp;</i> S</strong><em>02.12.2026</em></span>
              <span className="envelope-pocket" />
              <span className="wax-seal">N<span>&amp;</span>S</span>
            </span>
          </button>
          <p className="gate-kicker">Press the seal to open</p>
          <p className="gate-names">Nabiel <i>&amp;</i> Shatha</p>
          <span className="gate-date">02 December 2026</span>
        </section>
      )}
      <header className="site-nav">
        <button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><span>N</span><i>&amp;</i><span>S</span></button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.target} onClick={() => scrollToSection(item.target)}>{item.label}</button>)}
        </nav>
        <button className="nav-pill" onClick={() => scrollToSection("photos")}><Camera size={14} /> Add your photos</button>
        <button className="mobile-menu" onClick={() => setMobileNavOpen((value) => !value)} aria-label="Toggle menu">{mobileNavOpen ? <X size={20} /> : <Menu size={20} />}</button>
        {mobileNavOpen && <div className="mobile-nav-panel">{navItems.map((item) => <button key={item.target} onClick={() => { scrollToSection(item.target); setMobileNavOpen(false); }}>{item.label}</button>)}</div>}
      </header>

      

      <section className="quran-section" lang="ar" dir="rtl" aria-label="Quranic verse">
        <p className="quran-verse">
          ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾
        </p>
        <p className="quran-reference">(سورة الروم: 21)</p>
      </section>

      <section className="hero-section">
        <div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">The countdown is on</p>
          <h1>Nabiel <span>&amp;</span><br /><em>Shatha</em></h1>
          <p className="hero-subtitle">Two hearts. One very big celebration.</p>
          <button className="hero-cta" onClick={() => scrollToSection("countdown")}><span className="cta-icon"><Heart size={15} fill="currentColor" /></span> See the countdown <ArrowDown size={15} /></button>
        </div>
        <div className="hero-bottom"><span>Our wedding day</span><span className="hero-line" /><strong>02.12.2026</strong></div>
        <div className="hero-initials">N <i>&amp;</i> S</div>
      </section>

      <section id="countdown" className="countdown-section">
        <div className="countdown-copy"><p className="eyebrow">Mark your calendar</p><h2>Almost time to have<br /><em>you by my side</em></h2><p>We are counting every minute until our favorite day with our favorite people.</p></div>
        <div className="countdown-clock" aria-live="polite">
          <div className="countdown-unit"><strong>{pad(timeLeft.days)}</strong><span>days</span></div><div className="clock-divider">:</div>
          <div className="countdown-unit"><strong>{pad(timeLeft.hours)}</strong><span>hours</span></div><div className="clock-divider">:</div>
          <div className="countdown-unit"><strong>{pad(timeLeft.minutes)}</strong><span>minutes</span></div><div className="clock-divider">:</div>
          <div className="countdown-unit"><strong>{pad(timeLeft.seconds)}</strong><span>seconds</span></div>
        </div>
      </section>

      <section id="story" className="story-section">
        <div className="story-label"><span>01</span><span className="vertical-label">Us, in a few words</span></div>
        <div className="story-main"><p className="eyebrow"></p><h2>He said <em>Remember the measurement of the wall</em><br />She said <em>What was the measurement?</em></h2><div className="story-bottom"><p>Somewhere between all the conversations, shared memories, late-night talk, and “do you still love me?” I wouldn't want anyone else to start  the next chapter with.</p><div className="initial-card"><span>N</span><i>×</i><span>S</span><small>since forever</small></div></div></div>
      </section>
      <section id="photos" className="photos-section">
  <div className="photos-heading">
    <div>
      <p className="eyebrow">A little visual diary</p>
      <h2>My favorite wife to be</h2>
    </div>
  </div>

  <div className="photo-grid">
    <div className="photo-frame frame-tall">
      <div className="photo-placeholder real-photo">
        <img
          src="/images/Nabiel.jpg"
          alt="My favorite photo of Shatha"
        />
      </div>
      <span className="photo-caption"></span>
    </div>

    <div className="photo-frame frame-small">
      <div className="photo-placeholder real-photo">
        <img
          src="/images/Shatha.jpg"
          alt="Shatha's favorite memory"
        />
      </div>
      <span className="photo-caption"></span>
    </div>

    <div className="photo-frame frame-wide">
      <div className="photo-placeholder real-photo">
        <img
          src="/images/our-memory.jpg"
          alt="A favorite memory of Nabiel and Shatha"
        />
      </div>
      <span className="photo-caption"></span>
    </div>
  </div>
</section>

<section id="film" className="film-section">
  <div className="film-heading">
    <p className="eyebrow">Press play on us</p>

    <h2>
      Our little
        

      <em>love story.</em>
    </h2>

    <p>
      Save a place here for the moments I never want to forget.
    </p>
  </div>

  <div className="film-frame">
    <iframe
      className="film-video"
      src="hhttps://drive.google.com/file/d/15SNOtgiZ8g3ao7G9zjpNs3HgeX-L6w91/view?usp=sharing"
      title="Nabiel and Shatha's moments"
      allow="autoplay"
      allowFullScreen
    />

    <div className="film-label">
      <span>N &amp; S</span>
      <small>our film</small>
    </div>
  </div>
</section>



      <section className="final-section"><p className="eyebrow">Until then</p><h2>Save the date.<br /><em>Until you have all the love.</em></h2><button onClick={() => scrollToSection("countdown")} className="back-top">Back to the countdown <ArrowUpRight size={15} /></button></section>
      <footer className="site-footer"><div className="footer-mark">N <i>&amp;</i> S</div><p>Made with love by Nabiel</p><p>02.12.2026</p></footer>
    </main>
  );
}

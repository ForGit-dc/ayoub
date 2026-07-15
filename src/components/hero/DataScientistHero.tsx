import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { LANDING_COPY } from "./landingCopy";
import { startMotif } from "./motif";
import "./landing.css";

const LINKEDIN = "https://www.linkedin.com/in/ayoub-el-yanboiy";
const EMAIL = "yanboiyayoub@gmail.com";

// Flagship case-study numbers (Opinion Science, Twitter corpus Sept 2025).
// Aligned one-to-one with LANDING_COPY.<lang>.stats.
const STATS = ["90 000", "142", "88%", "768", "134", "0,62"];

// Proof metrics, aligned one-to-one with LANDING_COPY.<lang>.proof.desc.
const PROOF = ["203 456", "7,5%", "18 000+", "885/990", "3", "2"];

const HERO_EXAMPLES: Record<string, string[]> = {
  fr: ["Présente-toi en 30 secondes", "Parle-moi de ton pipeline chez Opinion Science", "Quel impact concret as-tu livré ?", "Pourquoi devrait-on te recruter ?"],
  en: ["Give me a 30-second intro", "Tell me about your pipeline at Opinion Science", "What concrete impact have you delivered?", "Why should we hire you?"],
  ar: ["قدّم نفسك في 30 ثانية", "حدّثني عن مشروعك في Opinion Science", "ما هو أثرك الملموس؟", "لماذا يجب أن نوظّفك؟"],
};

export default function DataScientistHero() {
  const { lang, setLang } = useI18n();
  const navigate = useNavigate();
  const c = (LANDING_COPY as Record<string, typeof LANDING_COPY.en>)[lang] ?? LANDING_COPY.en;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [q, setQ] = useState("");
  const [ph, setPh] = useState("");
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const go = (question: string) => navigate(question ? `/chat?q=${encodeURIComponent(question)}` : "/chat");

  // Readable typewriter placeholder: types example questions one at a time.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setPh(""); return; }
    const list = HERO_EXAMPLES[lang] ?? HERO_EXAMPLES.en;
    let i = 0, n = 0, deleting = false, timer = 0, alive = true;
    const tick = () => {
      if (!alive) return;
      const full = list[i];
      n = deleting ? n - 1 : n + 1;
      setPh(full.slice(0, n));
      if (!deleting && n >= full.length) { deleting = true; timer = window.setTimeout(tick, 2000); return; }
      if (deleting && n <= 0) { deleting = false; i = (i + 1) % list.length; timer = window.setTimeout(tick, 350); return; }
      timer = window.setTimeout(tick, deleting ? 30 : 58);
    };
    timer = window.setTimeout(tick, 700);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [lang]);

  // Top-bar border + scroll reveal
  useEffect(() => {
    const onScroll = () => barRef.current?.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal") ?? [];
    let io: IntersectionObserver | undefined;
    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io?.unobserve(e.target); } }),
        { threshold: 0.14 },
      );
      els.forEach((el) => io!.observe(el));
    }
    return () => { window.removeEventListener("scroll", onScroll); io?.disconnect(); };
  }, []);

  // Hero canvas: NETWORK FLOW motif (particles along data pipes), Cuivre Editorial palette.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return startMotif(canvas, {
      accent: "#A87B54",                       // --lp-accent (aged copper)
      accent2: "#D8B48C",                      // --lp-accent-2 (champagne)
      dim: "rgba(169, 150, 128, 0.62)",        // --lp-muted, readable over espresso
    });
  }, []);

  // data-hero selects a CSS-only composition variant (classic | mirror | centered | band),
  // defined at the end of landing.css. design-identity set "mirror" for this client.
  const projects = [c.signals.serverless, c.signals.api, c.signals.nlp, c.signals.cert];

  return (
    <div className="lp" data-hero="mirror" ref={rootRef} dir={dir}>
      <header className="bar" ref={barRef}>
        <div className="wrap bar-inner">
          <a className="brand" href="#top"><span className="dot" />AYOUB&nbsp;EL&nbsp;YANBOIY</a>
          <nav className="nav">
            <a href="#flagship">{c.nav.investigation}</a>
            <a href="#track">{c.nav.track}</a>
            <a href="#projects">{c.nav.signals}</a>
            <a href="#talk">{c.nav.contact}</a>
          </nav>
          <div className="bar-right">
            <div className="lang-switch" role="group" aria-label="Language">
              <button type="button" className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
              <button type="button" className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
              <button type="button" className={lang === "ar" ? "on" : ""} onClick={() => setLang("ar")}>ع</button>
            </div>
            <span className="bar-div" aria-hidden="true" />
            <div className="bar-links">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><Linkedin size={19} /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email"><Mail size={19} /></a>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <canvas className="field" ref={canvasRef} aria-hidden="true" />
          <div className="wrap">
            <span className="eyebrow">{c.eyebrow}</span>
            <h1>
              {c.hero.l1}<span className="glow">{c.hero.glow}</span>{c.hero.l2}
              <span className="ship">{c.hero.shipPre}<b>{c.hero.shipStrong}</b></span>
            </h1>
            <p className="lede">{c.lede}</p>

            {/* The chat IS the portfolio: this bar is the primary action */}
            <form className="chatbar" onSubmit={(e) => { e.preventDefault(); go(q.trim()); }}>
              <input
                className="chatbar-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={focused || q ? c.chat.placeholder : (ph ? ph + "▌" : c.chat.placeholder)}
                aria-label={c.chat.placeholder}
              />
              <button className="chatbar-send" type="submit">{c.chat.send}<span className="arr">→</span></button>
            </form>
            <div className="chips">
              {c.chips.map((chip, i) => (
                <button key={i} type="button" className="chip-btn" onClick={() => go(chip.q)}>{chip.label}</button>
              ))}
            </div>
            <a className="see-inv" href="#flagship">{c.seeInv} →</a>

            <div className="status">
              <span className="pulse" />
              {c.status.prefix}&nbsp; <b>{c.status.role}</b> &nbsp;·&nbsp; {c.status.loc}
            </div>
          </div>
        </section>

        {/* READOUT */}
        <section className="block" id="readout">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="marker">01</span>
              <div><div className="lab">{c.readout.lab}</div><h2>{c.readout.h2}</h2></div>
            </div>
            <div className="readout">
              <div className="readout-left reveal">
                <figure className="portrait">
                  <img src={`${import.meta.env.BASE_URL}portrait.jpg`} alt="Ayoub EL YANBOIY" loading="lazy"
                    onError={(e) => { const f = e.currentTarget.closest(".portrait"); if (f) (f as HTMLElement).style.display = "none"; }} />
                  <figcaption className="frame-tag">Paris · 2025</figcaption>
                </figure>
                <div className="card">
                  <div className="row"><span className="k">{c.card.role}</span><span className="v acc">{c.card.roleV}</span></div>
                  <div className="row"><span className="k">{c.card.base}</span><span className="v">{c.card.baseV}</span></div>
                  <div className="row"><span className="k">{c.card.degrees}</span><span className="v">{c.card.degreesV}</span></div>
                  <div className="row"><span className="k">{c.card.focus}</span><span className="v">{c.card.focusV}</span></div>
                  <div className="row"><span className="k">{c.card.cloud}</span><span className="v">{c.card.cloudV}</span></div>
                  <div className="row"><span className="k">{c.card.languages}</span><span className="v">{c.card.languagesV}</span></div>
                </div>
              </div>
              <div className="bio reveal">
                <p>{c.bio.p1}</p>
                <p className="quote">{c.bio.quote}</p>
                <p className="sig">{c.bio.sig}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP PROJECT (static feature, no live iframe) */}
        <section className="block signature" id="flagship">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="marker">02</span>
              <div>
                <div className="lab">{c.inv.lab}</div>
                <h2 className="sig-title">{c.inv.titlePre}<span className="em">{c.inv.titleEm}</span>{c.inv.titlePost}</h2>
              </div>
            </div>
            <div className="sig-grid reveal">
              {c.stats.map((label, i) => (
                <div className="stat" key={i}>
                  <div className="n">{STATS[i]}</div>
                  <div className="l">{label}</div>
                </div>
              ))}
            </div>
            <p className="sig-note reveal">{c.sigNote}</p>
          </div>
        </section>

        {/* TRACK RECORD */}
        <section className="block" id="track">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="marker">03</span>
              <div><div className="lab">{c.track.lab}</div><h2>{c.track.h2}</h2></div>
            </div>
            <div className="tl">
              {c.track.items.map((it, i) => (
                <div className="tl-item reveal" key={i}>
                  <span className="num">0{i + 1}</span>
                  <div><h3>{it.title}<span className="org">{it.org}</span></h3><p><b className="tl-metric">{it.metric}</b> {it.desc}</p></div>
                  <span className="when">{it.when}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="block" id="proof">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="marker">04</span>
              <div><div className="lab">{c.proof.lab}</div><h2>{c.proof.h2}</h2></div>
            </div>
            <div className="proof-grid">
              {PROOF.map((big, i) => (
                <div className="metric reveal" key={i}><div className="big">{big}</div><div className="desc">{c.proof.desc[i]}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="block" id="projects">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="marker">05</span>
              <div><div className="lab">{c.signals.lab}</div><h2>{c.signals.h2}</h2></div>
            </div>
            <div className="out-grid">
              {projects.map((p, i) => (
                <div className="out reveal" key={i}>
                  <div className="tag">{p.tag}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="chips">
                    {p.chips.map((ch, j) => <span className="chip" key={j}>{ch}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TALK */}
        <section className="block cta-block" id="talk">
          <div className="wrap">
            <span className="eyebrow" style={{ justifyContent: "center" }}>{c.talk.eyebrow}</span>
            <h2>{c.talk.h2pre}<span className="glow">{c.talk.h2em}</span>.</h2>
            <p className="lede">{c.talk.lede}</p>
            <div className="contact">
              <Link className="btn btn-primary" to="/chat">{c.talk.open} <span className="arr">→</span></Link>
              <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <span>{c.footer.left}</span>
          <span className="baraka">{c.footer.baraka}</span>
        </div>
      </footer>
    </div>
  );
}

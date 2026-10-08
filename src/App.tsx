import {
  ArrowRight,
  BrainCircuit,
  Check,
  Cloud,
  Code2,
  Layers3,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const TURNSTILE_SITEKEY = "0x4AAAAAAFRiEA6Nr1CiiV5Y";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Software engineering",
    copy: "Reliable web products and platforms designed around how your business actually works.",
    tags: ["Web applications", "APIs", "Internal tools"],
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Applied AI",
    copy: "Practical AI systems that remove repetitive work, surface insight and support better decisions.",
    tags: ["AI assistants", "Automation", "Data workflows"],
  },
  {
    number: "03",
    icon: Cloud,
    title: "Cloud platforms",
    copy: "Fast, secure infrastructure that scales without creating a maintenance burden for your team.",
    tags: ["Cloud architecture", "DevOps", "Modernisation"],
  },
];

const approach = [
  ["Discover", "We get close to the problem, the people and the commercial goal."],
  ["Shape", "We turn complexity into a focused roadmap with measurable outcomes."],
  ["Build", "We design, ship and validate in small, visible increments."],
  ["Evolve", "We learn from real use and keep the product moving forward."],
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Ecloria home">
      <img className="logo-mark" src="/brand-mark.svg" alt="" aria-hidden="true" />
      <span>Ecloria</span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileWidget = useRef<string | null>(null);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    const renderTurnstile = () => {
      const container = document.querySelector<HTMLElement>(".cf-turnstile");
      if (!container || !window.turnstile || turnstileWidget.current) return;

      turnstileWidget.current = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITEKEY,
        action: "contact",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    renderTurnstile();
    const retryTimer = window.setInterval(renderTurnstile, 250);
    return () => window.clearInterval(retryTimer);
  }, []);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setFormMessage("");
    const form = event.currentTarget;
    if (!turnstileToken) {
      setFormState("error");
      setFormMessage("Please complete the security verification.");
      return;
    }

    const formData = new FormData(form);
    formData.set("cf-turnstile-response", turnstileToken);
    const payload = Object.fromEntries(formData.entries());
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      form.reset();
      window.turnstile?.reset();
      setTurnstileToken("");
      setFormState("sent");
      setFormMessage("Thanks — your message is with us. We'll reply shortly.");
    } catch (error) {
      window.turnstile?.reset();
      setTurnstileToken("");
      setFormState("error");
      setFormMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "The request timed out. Please try again."
          : error instanceof Error
            ? error.message
            : "Unable to send your message.",
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <div id="top">
      <header className="site-header">
        <div className="nav-wrap">
          <Logo />
          <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
            <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>How we work</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
              Start a conversation <ArrowRight size={16} />
            </a>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-pad">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span /> UK software & AI studio</div>
              <h1>Technology that<br />moves ideas <em>forward.</em></h1>
              <p className="hero-lead">
                We design and build intelligent software for ambitious teams — from first concept to dependable, scalable product.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#contact">Tell us your idea <ArrowRight size={18} /></a>
                <a className="text-link" href="#services">Explore our work <span>↓</span></a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="signal-card card-top">
                <Sparkles size={18} />
                <span>Ideas</span>
                <strong>clarified</strong>
              </div>
              <div className="signal-card card-bottom">
                <Layers3 size={18} />
                <span>Products</span>
                <strong>engineered</strong>
              </div>
              <div className="core-mark"><span>e</span></div>
              <div className="pulse-dot dot-a" />
              <div className="pulse-dot dot-b" />
              <div className="pulse-dot dot-c" />
            </div>
          </div>
          <div className="hero-foot">
            <p>Built for the next stage of your business.</p>
            <div className="capabilities" aria-label="Capabilities">
              <span>Product</span><i /> <span>Engineering</span><i /> <span>AI</span><i /> <span>Cloud</span>
            </div>
          </div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="section-kicker">Why Ecloria</div>
          <div className="intro-copy">
            <h2>We make complex technology feel clear, useful and <span>human.</span></h2>
            <p>
              Ecloria is a software and AI company for organisations that want to move with confidence. We bring strategy, design and engineering into one senior team — so good ideas become useful products, sooner.
            </p>
          </div>
          <div className="value-row">
            <div><strong>Senior</strong><span>Specialists on every engagement</span></div>
            <div><strong>Focused</strong><span>Small teams, direct communication</span></div>
            <div><strong>End-to-end</strong><span>From idea to live product</span></div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading">
            <div>
              <div className="section-kicker light">What we do</div>
              <h2>One team.<br />Three disciplines.</h2>
            </div>
            <p>We combine product thinking and deep technical craft to solve meaningful business problems.</p>
          </div>
          <div className="service-grid">
            {services.map(({ number, icon: Icon, title, copy, tags }) => (
              <article className="service-card" key={title}>
                <div className="service-top"><span>{number}</span><Icon size={25} strokeWidth={1.6} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ul>{tags.map((tag) => <li key={tag}><Check size={14} /> {tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="approach section-pad" id="approach">
          <div className="approach-title">
            <div className="section-kicker">How we work</div>
            <h2>Clear thinking.<br />Visible progress.</h2>
            <p>No black boxes or long silences. Just a close, collaborative process that keeps the right work moving.</p>
          </div>
          <div className="steps">
            {approach.map(([title, copy], index) => (
              <div className="step" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="belief section-pad">
          <div className="belief-statement">
            <span className="quote-mark">“</span>
            <h2>Better software begins with a better understanding of the problem.</h2>
          </div>
          <div className="belief-note">
            <div className="mini-mark">e</div>
            <p>That is why we listen before we build — and measure success by the change we create, not the code we ship.</p>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-copy">
            <div className="section-kicker light">Start something</div>
            <h2>Have an idea worth building?</h2>
            <p>Tell us what you are working on. We will come back with honest thoughts and a clear next step.</p>
            <a href="mailto:hello@ecloria.co.uk">hello@ecloria.co.uk <ArrowRight size={18} /></a>
          </div>
          <form className="contact-form" onSubmit={submitContact}>
            <div className="field-row">
              <label>Name<input name="name" required minLength={2} placeholder="Your name" /></label>
              <label>Work email<input name="email" type="email" required placeholder="you@company.com" /></label>
            </div>
            <label>Company <span>(optional)</span><input name="company" placeholder="Company name" /></label>
            <label>What can we help with?<textarea name="message" required minLength={10} rows={4} placeholder="A little about your idea, challenge or goal..." /></label>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="turnstile-wrap" aria-label="Security verification">
              <div className="cf-turnstile" data-sitekey={TURNSTILE_SITEKEY} data-action="contact" />
            </div>
            <div className="form-footer">
              <button className="button button-accent" type="submit" disabled={formState === "sending"}>
                {formState === "sending" ? "Sending…" : "Send enquiry"} <ArrowRight size={18} />
              </button>
              {formMessage && <p className={`form-status ${formState}`} role="status">{formMessage}</p>}
            </div>
          </form>
        </section>
      </main>

      <footer className="footer section-pad">
        <div className="footer-main">
          <Logo />
          <p>Thoughtful software.<br />Intelligently built.</p>
          <div className="footer-links">
            <a href="#services">Services</a><a href="#approach">Approach</a><a href="#about">About</a><a href="#contact">Contact</a><a href="/privacy">Privacy policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ecloria Ltd.</span>
          <span>United Kingdom</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

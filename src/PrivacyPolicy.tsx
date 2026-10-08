export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <a className="legal-logo" href="/" aria-label="Ecloria home">
          <img className="logo-mark" src="/brand-mark.svg" alt="" aria-hidden="true" />
          <span>Ecloria</span>
        </a>
        <a className="legal-back" href="/">Back to website <span aria-hidden="true">→</span></a>
      </header>

      <main className="legal-content">
        <p className="section-kicker">Legal</p>
        <h1>Privacy policy</h1>
        <p className="legal-intro">Last updated: 9 October 2026</p>

        <p>
          Ecloria Ltd ("Ecloria", "we", "us") respects your privacy. This policy explains how we use
          information submitted through the contact form on <a href="https://ecloria.co.uk">ecloria.co.uk</a>.
        </p>

        <h2>Information we collect</h2>
        <p>
          When you contact us, we collect your name, work email address, company name (if provided), and
          the message you send. Cloudflare Turnstile also processes limited technical information to help
          prevent spam and abuse.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use this information to respond to your enquiry, understand your requirements, and keep a
          record of business communications. We do not sell your information or use it for unrelated
          advertising.
        </p>

        <h2>Service providers</h2>
        <p>
          Our website and enquiry database are hosted by Cloudflare. Contact notifications are delivered
          through Resend. These providers process information only as needed to provide their services.
        </p>

        <h2>Retention and your rights</h2>
        <p>
          We keep enquiries only for as long as they are useful for responding and managing the resulting
          relationship, typically no longer than 12 months after the last meaningful interaction unless a
          longer period is required by law. You can ask us to access, correct, or delete your personal
          information by emailing <a href="mailto:hello@ecloria.co.uk">hello@ecloria.co.uk</a>.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          Ecloria currently does not use advertising cookies or analytics trackers. Essential security
          services, including Turnstile, may set or read technical information needed to protect the form.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to <a href="mailto:hello@ecloria.co.uk">hello@ecloria.co.uk</a>.
          We may update this policy when our services change; the latest version will always be published
          on this page.
        </p>
      </main>

      <footer className="legal-footer">© {new Date().getFullYear()} Ecloria Ltd. United Kingdom.</footer>
    </div>
  );
}

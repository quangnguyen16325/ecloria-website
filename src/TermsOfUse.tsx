export default function TermsOfUse() {
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
        <h1>Terms of use</h1>
        <p className="legal-intro">Last updated: 9 October 2026</p>

        <p>
          These terms explain the basic rules for using the Ecloria website. By visiting this website,
          you agree to use it lawfully and respectfully.
        </p>

        <h2>About Ecloria</h2>
        <p>
          Ecloria is an early-stage software and AI studio building digital products, prototypes and
          technical services. Information on this website is provided for general information and may
          change as our products develop.
        </p>

        <h2>Enquiries and proposals</h2>
        <p>
          Sending an enquiry does not create a client relationship or guarantee that Ecloria will accept
          a project. Any project scope, fees, timelines and deliverables will be agreed separately in
          writing before work begins.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The website design, written content, branding and original materials belong to Ecloria or its
          licensors. You may view the website for personal or business evaluation, but you must not copy,
          republish or commercially reuse its content without permission.
        </p>

        <h2>Third-party services</h2>
        <p>
          The website may use third-party services for hosting, security and contact delivery. Their use
          is also subject to the providers’ own terms and policies. Details about contact-form data are
          available in our <a href="/privacy">Privacy Policy</a>.
        </p>

        <h2>Availability and liability</h2>
        <p>
          We work to keep the website accurate and available, but do not promise that it will always be
          uninterrupted, error-free or suitable for every purpose. To the fullest extent permitted by law,
          Ecloria is not responsible for losses arising from reliance on general website information.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href="mailto:hello@ecloria.co.uk">hello@ecloria.co.uk</a>.
        </p>
      </main>

      <footer className="legal-footer">© {new Date().getFullYear()} Ecloria Ltd.</footer>
    </div>
  );
}

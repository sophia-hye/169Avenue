const FOOTER_SECTIONS = [
  {
    title: 'Directory',
    links: ['About Our House', 'Consultancy Fees', 'Destinations', 'Press Room'],
  },
  {
    title: 'Offices',
    links: ['Seoul, Gangnam', 'New York, Madison Ave', 'London, Mayfair', 'Office Locations'],
  },
  {
    title: 'Connect',
    links: ['Admissions Hub', 'Newsletter', 'Terms of Service', 'Privacy Policy'],
  },
]

export function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-20 px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
        <div className="md:col-span-1">
          <div className="font-headline text-xl italic text-primary mb-8">
            169 Avenue
          </div>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-60">
            A global consultancy dedicated to academic excellence and architectural career building.
          </p>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-4">
            <h5 className="font-body text-sm tracking-wide uppercase font-bold text-primary mb-6">
              {section.title}
            </h5>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    className="font-body text-sm tracking-wide uppercase text-primary/60 hover:text-primary transition-all opacity-80 hover:opacity-100"
                    href="#"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-primary/5 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-primary/60 font-body text-xs tracking-widest uppercase">
        <span>&copy; 2025 169 Avenue. All Rights Reserved.</span>
        <span className="mt-4 md:mt-0">Crafted with precision.</span>
      </div>
    </footer>
  )
}

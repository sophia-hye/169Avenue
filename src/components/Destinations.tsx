const DESTINATIONS = [
  {
    title: 'United States',
    tag: 'Primary Hub',
    description: 'Elite Ivy League & STEM powerhouse research programs.',
    bgClass: 'bg-primary',
    textClass: 'text-white',
    descClass: 'text-white/70',
    imgOpacity: 'opacity-70',
    colSpan: 'md:col-span-8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8BTKGGTi199y84Gzvt901dLx39ljnKyg6PY7jzznynDiLnFDG7cgdjRLnFRokXc9rBmOW-wKWjG5-FwxYRrsGkDQvDcbn9I4rHW2JvyBr7y-uN1_-4XX0S-mc1OOXc7KGO0Bu90_Wfi5KODz57Im4UgSkuL3AECJ2aVOtnJbBTw5OST-g9DYStsRdDAkDYlM89QxOuilKPDmiZ4eWyXW8hzdc2HdJ1CnQ-UZAxROFqjihB7sYrqh4jPG1UxwoKUZPXhKRFhtWbcA',
  },
  {
    title: 'United Kingdom',
    tag: 'Heritage Focus',
    description: 'Oxbridge and the Russell Group excellence.',
    bgClass: 'bg-secondary',
    textClass: 'text-white',
    descClass: 'text-white/70',
    imgOpacity: 'opacity-60',
    colSpan: 'md:col-span-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRD4s8WiP-S4rsAhbmkoJPF2lOSWSNI3Izr8dMO-hmviyQ_RRu5tkAcwHDQcUw2U4IFX21J1Z61FoKHPUyyFUSw5gWq1F1OHxQ053x8Z6l6hmSxSDJYTWrQ2GMDIjr1eER_rdf0kLk67gEuBz36NFl4oN40XtbRcfJO_SnBZnLfEDZ8ohq3dUnel-9rKOaynFCaCSpQTeGyhy0jpdA15WJzPnK6EXcAIxvrGOg8LOTW9kG8OgsRiF_Xj4LSsjibBZ6wJUuq33I-HA',
  },
  {
    title: 'Europe',
    tag: 'Modern Classics',
    description: 'Business, Art, and Design leadership in Paris & Berlin.',
    bgClass: 'bg-surface-container-high',
    textClass: 'text-primary',
    descClass: 'text-primary/70',
    imgOpacity: 'opacity-50',
    colSpan: 'md:col-span-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6_vniE_nYT2P5vU-0L1Yy-RDdLTj_Jr5aFQOt9Hb9LD3L3mXQRMPC4FCICYlyn6nixlWkU9vUr6ibEigJM1y4ZZbfDaK9Nsp51nv5CCaE2x7ImWFGxqaTYaLrIVtMXQokCXfMPFEgL5yZXnWOl3nLay7fR5izTjkFs9cSKz1OjNkoqz5zVujo4Lyf3DYoPVcxXDKF2oyYIcM9-qccFouwIXCedVFP_9fAUU4XRyeVx7BcZvSdFF8dIRCPFMPZ9PZgAyApC4Wodrg',
  },
  {
    title: 'Asia-Pacific',
    tag: 'Emerging Frontiers',
    description: 'The new standard for global innovation hubs in Singapore & Seoul.',
    bgClass: 'bg-surface-container-low',
    textClass: 'text-primary',
    descClass: 'text-primary/70',
    imgOpacity: 'opacity-40',
    colSpan: 'md:col-span-8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI3FMV-mLdpNBSKQATtIojxXzBzXT6-6sCkmahz74S324Bv6OLOZd1eq0HGNQeDUzbna8mopESYDNS-ikA8vZdIEdBk8dRXDpBO9oUaFCCgEooqF8gm5B2iZdQckJ4oJjS1hGKaGO7Dt4bwWCRjQn1knytQTriJl5sMhZl8iVpdKVvm8EP5oSOKk5D8_zs3X32BOnNabDomEES3uQA-_E7WLCR6F1D8cRbZihCTmE5leSTn6jR4XdMX3uhHphrRMQXBYi4U-0n_IM',
  },
]

export function Destinations() {
  return (
    <section id="destinations" className="px-8 md:px-16 lg:px-24 mb-40 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <div className="max-w-xl">
          <span className="font-label text-xs tracking-[0.2em] uppercase text-secondary mb-4 block">
            The Global Reach
          </span>
          <h2 className="text-4xl md:text-6xl font-headline tracking-tight">
            Curated <br /> Destinations
          </h2>
        </div>
        <p className="md:max-w-xs font-body text-sm text-on-surface-variant leading-relaxed mt-6 md:mt-0">
          From the ivy-clad walls of New England to the historic cloisters of Oxford,
          we provide exclusive access to the world's most elite institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[800px]">
        {DESTINATIONS.map((dest) => (
          <div
            key={dest.title}
            className={`${dest.colSpan} group relative overflow-hidden ${dest.bgClass} cursor-pointer`}
          >
            <img
              alt={dest.title}
              className={`w-full h-full object-cover ${dest.imgOpacity} group-hover:scale-105 transition-transform duration-700`}
              src={dest.image}
            />
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
              <span className={`font-label text-xs tracking-widest ${dest.textClass} uppercase`}>
                {dest.tag}
              </span>
              <div>
                <h3 className={`text-4xl ${dest.textClass} font-headline mb-2`}>{dest.title}</h3>
                <p className={`${dest.descClass} font-body text-sm max-w-xs`}>{dest.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

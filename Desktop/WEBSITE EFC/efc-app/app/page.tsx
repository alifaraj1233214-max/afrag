"use client";

import { useState, useEffect, useRef } from "react";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

/* ── tiny counter hook ── */
function useCounter(target: number, trigger: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return value;
}

/* ── Counter item ── */
function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const val = useCounter(target, mounted && visible);
  useEffect(() => {
    setMounted(true);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const display = mounted ? String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '—';
  return (
    <div ref={ref} className="text-center px-8 py-4 flex-1 min-w-[140px]">
      <div className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white">
        {display}{mounted ? suffix : ''}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-white/40 font-medium">{label}</div>
    </div>
  );
}

/* ── Service card ── */
function ServiceCard({ icon, title, desc, items }: { icon: string; title: string; desc: string; items: string[] }) {
  return (
    <div className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-[#1A6BD9]/40 hover:shadow-[0_20px_60px_rgba(10,22,40,0.4)] transition-all duration-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1A6BD9] to-[#C9A227] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A6BD9]/10 to-[#C9A227]/10 border border-[#1A6BD9]/20 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#1A6BD9] group-hover:border-transparent transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed mb-4">{desc}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-white/50 font-medium">
            <span className="text-[#1A6BD9] text-[10px]">✓</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Product card ── */
function ProductCard({ tag, tagColor, name, generic, desc, form, approval }: {
  tag: string; tagColor: string; name: string; generic: string; desc: string; form: string; approval: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 flex flex-col gap-3 hover:shadow-[0_12px_40px_rgba(10,22,40,0.4)] hover:-translate-y-1 hover:border-[#1A6BD9]/25 transition-all duration-300">
      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit ${tagColor}`}>{tag}</span>
      <div className="text-2xl text-white/20">💊</div>
      <h3 className="font-[family-name:var(--font-playfair)] font-bold text-white">{name}</h3>
      <p className="text-xs text-white/35 italic -mt-2">{generic}</p>
      <p className="text-xs text-white/50 leading-relaxed flex-1">{desc}</p>
      <div className="flex gap-2 flex-wrap">
        <span className="text-[10px] text-white/35 bg-white/5 border border-white/[0.06] rounded-full px-3 py-1">🔬 {form}</span>
        <span className="text-[10px] text-white/35 bg-white/5 border border-white/[0.06] rounded-full px-3 py-1">📋 {approval}</span>
      </div>
      <a href="#contact" className="text-[#1A6BD9] text-xs font-semibold border border-[#1A6BD9] rounded-md py-2 text-center hover:bg-[#1A6BD9] hover:text-white transition-colors duration-200">
        Request Information
      </a>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Home", "About", "Treatments", "Products", "Research", "Contact"];

  return (
    <>
      {/* WebGL shader — fixed full-screen background */}
      <WebGLShader />

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A1628]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3" : "py-5"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-8">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 flex-shrink-0">
            <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
              <circle cx="20" cy="20" r="19" stroke="#C9A227" strokeWidth="2"/>
              <path d="M20 8 L20 32 M8 20 L32 20" stroke="#C9A227" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="5" fill="#C9A227"/>
            </svg>
            <div>
              <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white tracking-widest">EFC</span>
              <span className="block text-[9px] font-semibold text-[#C9A227] tracking-[3px] uppercase -mt-1">Pharmaceuticals</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="hidden lg:block ml-4 flex-shrink-0">
            <LiquidButton size="sm" className="text-white border border-[#C9A227]/40 rounded-lg bg-[#C9A227]/10 hover:bg-[#C9A227]/20 text-xs font-bold tracking-wide px-5">
              Get Consultation
            </LiquidButton>
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto text-white p-2" aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0A1628]/98 border-t border-white/[0.06] px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="text-white/70 hover:text-white text-base font-medium py-2 border-b border-white/[0.05]">
                {link}
              </a>
            ))}
            <a href="#contact" className="mt-3">
              <LiquidButton size="sm" className="text-white border border-white/20 rounded-lg w-full justify-center">
                Get Consultation
              </LiquidButton>
            </a>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Overlay so text is readable over WebGL */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/30 to-[#0A1628]/80 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#C9A227] text-xs font-semibold px-5 py-2 rounded-full mb-8 tracking-wide">
            🏆 Trusted by 500+ Healthcare Institutions Worldwide
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6">
            Pioneering{" "}
            <span className="bg-gradient-to-r from-[#1A6BD9] to-[#C9A227] bg-clip-text text-transparent">
              Pharmaceutical
            </span>
            <br />Excellence Since 1998
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
            EFC leads the forefront of pharmaceutical innovation — delivering life-changing treatments
            and therapies built on decades of scientific expertise, rigorous research, and an unwavering
            commitment to patient health.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a href="#treatments">
              <LiquidButton size="xl" className="text-white border border-white/20 rounded-xl font-bold tracking-wide">
                🔬 Explore Treatments
              </LiquidButton>
            </a>
            <a href="#research">
              <LiquidButton size="xl" className="text-white border border-[#1A6BD9]/40 rounded-xl font-bold tracking-wide bg-[#1A6BD9]/10">
                🧬 Our Research
              </LiquidButton>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section id="stats" className="relative z-10 bg-white/[0.03] border-y border-white/[0.06] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap justify-center divide-x divide-white/10">
          <StatItem target={26}   suffix="+"  label="Years of Excellence" />
          <StatItem target={180}  suffix="+"  label="Countries Served" />
          <StatItem target={2400} suffix="+"  label="Pharmaceutical Products" />
          <StatItem target={50}   suffix="M+" label="Patients Helped" />
          <StatItem target={320}  suffix="+"  label="Research Scientists" />
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="relative z-10 py-28 bg-[#0A1628]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="h-72 rounded-2xl bg-gradient-to-br from-[#0F1F3D] to-[#162844] border border-white/[0.06] flex flex-col items-center justify-center gap-3 text-white/30 text-6xl mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A6BD9]/10 to-[#C9A227]/8" />
              <span className="relative text-[#C9A227] opacity-80">⚗️</span>
              <span className="relative text-sm font-medium text-white/40">Research Laboratory</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-36 rounded-xl bg-gradient-to-br from-[#0F1F3D] to-[#162844] border border-white/[0.06] flex flex-col items-center justify-center gap-2 text-[#1A6BD9] text-3xl">
                👥<span className="text-xs text-white/40 font-medium">Expert Team</span>
              </div>
              <div className="h-36 rounded-xl bg-gradient-to-br from-[#0F1F3D] to-[#162844] border border-white/[0.06] flex flex-col items-center justify-center gap-2 text-[#C9A227] text-3xl">
                🏅<span className="text-xs text-white/40 font-medium">ISO 9001:2015</span>
              </div>
            </div>
            {/* floating badge */}
            <div className="absolute -right-6 top-6 bg-[#0F1F3D] border border-white/[0.08] rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl">
              <span className="text-2xl text-[#C9A227]">🛡️</span>
              <div>
                <p className="text-xs font-bold text-white">WHO GMP</p>
                <p className="text-[10px] text-white/40">Certified Facility</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[3px] text-[#1A6BD9] bg-[#1A6BD9]/10 border border-[#1A6BD9]/20 px-4 py-1.5 rounded-full mb-5">About EFC</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              A Legacy of{" "}
              <span className="bg-gradient-to-r from-[#1A6BD9] to-[#C9A227] bg-clip-text text-transparent">
                Scientific Innovation
              </span>{" "}
              & Patient Care
            </h2>
            <p className="text-white/55 leading-relaxed mb-4 text-sm">
              Founded in 1998, EFC has grown from a pioneering research lab into one of the world&apos;s most
              trusted pharmaceutical companies. Our mission: develop breakthrough treatments that transform
              lives, backed by rigorous science and compassionate care.
            </p>
            <p className="text-white/55 leading-relaxed mb-8 text-sm">
              With state-of-the-art manufacturing facilities operating under the highest international standards,
              we deliver pharmaceutical solutions across oncology, cardiology, neurology, and infectious diseases —
              serving providers and patients in over 180 countries.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: "⚛️", title: "Innovation First", desc: "Cutting-edge R&D with 15% annual revenue reinvested" },
                { icon: "❤️", title: "Patient-Centered", desc: "Every decision guided by patient outcomes and safety" },
                { icon: "🌍", title: "Global Impact", desc: "Accessible medicines across emerging and developed markets" },
              ].map((p) => (
                <div key={p.title} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 hover:border-[#1A6BD9]/30 hover:translate-x-1 transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-[#1A6BD9] flex items-center justify-center text-lg flex-shrink-0">{p.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{p.title}</p>
                    <p className="text-xs text-white/40">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#contact">
              <LiquidButton size="lg" className="text-white border border-white/20 rounded-xl font-semibold">
                Learn More About EFC →
              </LiquidButton>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES / TREATMENTS ═══ */}
      <section id="treatments" className="relative z-10 py-28 bg-[#080f1e]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[3px] text-[#1A6BD9] bg-[#1A6BD9]/10 border border-[#1A6BD9]/20 px-4 py-1.5 rounded-full mb-4">Therapeutic Areas</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
              Advanced <span className="bg-gradient-to-r from-[#1A6BD9] to-[#C9A227] bg-clip-text text-transparent">Treatments</span> Across Specialties
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              From rare diseases to widespread conditions, EFC offers comprehensive pharmaceutical solutions developed through decades of clinical expertise.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard icon="🎗️" title="Oncology" desc="Precision cancer therapies including targeted treatments, immunotherapy agents, and supportive oncology care." items={["Targeted Therapy", "Immunotherapy", "Supportive Care"]} />
            <ServiceCard icon="💓" title="Cardiology" desc="Comprehensive cardiovascular treatments including anti-hypertensives, anti-thrombotics, and heart failure medications." items={["Anti-Hypertensives", "Anti-Thrombotics", "Heart Failure Therapies"]} />
            <ServiceCard icon="🧠" title="Neurology" desc="Innovative neurological treatments addressing epilepsy, multiple sclerosis, Parkinson's disease and Alzheimer's." items={["Epilepsy Management", "MS Therapies", "Neurodegenerative Care"]} />
            <ServiceCard icon="🦠" title="Infectious Diseases" desc="Broad-spectrum and targeted anti-infective agents including antibiotics, antivirals, antifungals, and antimalarials." items={["Antibiotic Therapy", "Antiviral Agents", "Tropical Disease Care"]} />
            <ServiceCard icon="🧬" title="Rare Diseases" desc="Orphan drug development and specialized therapies for rare genetic and metabolic conditions worldwide." items={["Enzyme Replacement", "Gene Therapy Support", "Metabolic Disorders"]} />
            <ServiceCard icon="💉" title="Biologics & Vaccines" desc="Advanced biologic therapies leveraging monoclonal antibodies, recombinant proteins, and novel adjuvant technologies." items={["Monoclonal Antibodies", "Prophylactic Vaccines", "Biosimilars"]} />
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section id="products" className="relative z-10 py-28 bg-[#0A1628]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[3px] text-[#1A6BD9] bg-[#1A6BD9]/10 border border-[#1A6BD9]/20 px-4 py-1.5 rounded-full mb-4">Featured Products</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-[#1A6BD9] to-[#C9A227] bg-clip-text text-transparent">Pharmaceutical Portfolio</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              A selection of EFC&apos;s flagship products trusted by healthcare professionals globally.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <ProductCard tag="Oncology" tagColor="bg-[#1A6BD9]/10 text-[#5BA3F5] border border-[#1A6BD9]/20" name="EFC-Oncablast™" generic="Cabozantinib 40mg / 60mg" desc="Multi-targeted kinase inhibitor for advanced renal cell carcinoma and hepatocellular carcinoma." form="Oral tablet" approval="FDA Approved" />
            <ProductCard tag="Cardiology" tagColor="bg-red-500/10 text-red-400 border border-red-500/20" name="EFC-Cardivex™" generic="Sacubitril/Valsartan 50–200mg" desc="First-in-class angiotensin receptor-neprilysin inhibitor for heart failure with reduced ejection fraction." form="Film-coated tablet" approval="EMA Approved" />
            <ProductCard tag="Neurology" tagColor="bg-purple-500/10 text-purple-400 border border-purple-500/20" name="EFC-Neurozym™" generic="Natalizumab 300mg/15mL" desc="Anti-α4-integrin monoclonal antibody for relapsing forms of multiple sclerosis with high efficacy." form="IV Infusion" approval="FDA/EMA Approved" />
            <ProductCard tag="Biologics" tagColor="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" name="EFC-Immunogen™" generic="Adalimumab 40mg/0.4mL" desc="Recombinant human anti-TNF monoclonal antibody for rheumatoid arthritis, Crohn's, and psoriasis." form="SC Injection" approval="WHO Prequalified" />
            <ProductCard tag="Oncology" tagColor="bg-[#1A6BD9]/10 text-[#5BA3F5] border border-[#1A6BD9]/20" name="EFC-Immunex™" generic="Pembrolizumab 100mg/4mL" desc="Anti-PD-1 checkpoint inhibitor for multiple cancer indications including NSCLC and melanoma." form="IV Infusion" approval="FDA Approved" />
            <ProductCard tag="Cardiology" tagColor="bg-red-500/10 text-red-400 border border-red-500/20" name="EFC-Gluco-X™" generic="Empagliflozin 10mg / 25mg" desc="SGLT2 inhibitor for type 2 diabetes management with proven cardiovascular and renal protection." form="Oral tablet" approval="EMA Approved" />
          </div>
          <div className="text-center mt-12">
            <a href="#contact">
              <LiquidButton size="lg" className="text-white border border-white/20 rounded-xl font-semibold">
                Browse Full Catalogue →
              </LiquidButton>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ RESEARCH ═══ */}
      <section id="research" className="relative z-10 py-28 bg-[#060d1a]/95 backdrop-blur-md overflow-hidden">
        {/* grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,107,217,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,107,217,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[3px] text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/20 px-4 py-1.5 rounded-full mb-4">Research & Innovation</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
              Building Tomorrow&apos;s{" "}
              <span className="bg-gradient-to-r from-[#5BA3F5] to-[#E0B93A] bg-clip-text text-transparent">Medicines Today</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
              Our pipeline spans early discovery to Phase III clinical trials across multiple therapeutic areas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Pipeline */}
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white font-semibold mb-8">Development Pipeline</h3>
              <div className="space-y-5">
                {[
                  { label: "Discovery", width: "100%", count: "48 compounds", gold: false },
                  { label: "Pre-Clinical", width: "75%", count: "24 compounds", gold: false },
                  { label: "Phase I", width: "55%", count: "14 candidates", gold: false },
                  { label: "Phase II", width: "38%", count: "9 candidates", gold: false },
                  { label: "Phase III", width: "22%", count: "4 candidates", gold: true },
                  { label: "Regulatory Review", width: "12%", count: "2 candidates", gold: true },
                ].map((s) => (
                  <div key={s.label} className="grid grid-cols-[140px_1fr_80px] items-center gap-4">
                    <span className="text-xs text-white/50">{s.label}</span>
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.gold ? "bg-gradient-to-r from-[#C9A227] to-[#E0B93A]" : "bg-gradient-to-r from-[#1A6BD9] to-[#2E84F5]"}`} style={{ width: s.width }} />
                    </div>
                    <span className="text-[10px] text-white/30 text-right">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {[
                { icon: "🔬", title: "AI-Driven Drug Discovery", desc: "Leveraging machine learning and molecular simulation to identify novel therapeutic targets 10x faster.", tag: "Technology Focus" },
                { icon: "🧬", title: "Precision Oncology Platform", desc: "Biomarker-driven patient stratification for individualized cancer therapies.", tag: "Phase III" },
                { icon: "🛡️", title: "Next-Gen mRNA Therapeutics", desc: "Proprietary mRNA delivery platform for infectious diseases and rare metabolic disorders.", tag: "Phase II" },
                { icon: "🧠", title: "Neurodegeneration Research", desc: "Novel tau-targeting antibodies and neuroprotective agents for early-stage Alzheimer's.", tag: "Phase I" },
              ].map((h) => (
                <div key={h.title} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 flex gap-4 hover:bg-white/[0.05] hover:border-[#C9A227]/20 transition-all duration-200">
                  <div className="w-11 h-11 rounded-lg bg-[#1A6BD9]/15 flex items-center justify-center text-xl flex-shrink-0">{h.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{h.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed mb-2">{h.desc}</p>
                    <span className="text-[10px] font-bold bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20 px-2.5 py-0.5 rounded-full">{h.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="border-t border-white/[0.07] pt-10">
            <p className="text-center text-[10px] uppercase tracking-[3px] text-white/25 mb-6">International Certifications & Partnerships</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["WHO GMP", "FDA cGMP", "EMA GMP", "ISO 9001:2015", "ICH Q10", "ISO 14001"].map((cert) => (
                <div key={cert} className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-lg px-5 py-2.5 text-white/50 text-xs font-semibold hover:border-[#C9A227]/25 hover:text-white transition-all duration-200">
                  <span className="text-[#C9A227]">🏅</span> {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="relative z-10 py-28 bg-[#0A1628]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[3px] text-[#1A6BD9] bg-[#1A6BD9]/10 border border-[#1A6BD9]/20 px-4 py-1.5 rounded-full mb-4">Contact EFC</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
              Connect With Our <span className="bg-gradient-to-r from-[#1A6BD9] to-[#C9A227] bg-clip-text text-transparent">Expert Team</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Whether you&apos;re a healthcare professional, researcher, or institution — our team is ready to assist you.
            </p>
          </div>

          <div className="grid lg:grid-cols-[360px_1fr] gap-12 items-start">
            {/* Info cards */}
            <div className="space-y-4">
              {[
                { icon: "🏢", title: "Global Headquarters", text: "EFC Tower, BioMedical District\nGeneva, Switzerland 1201" },
                { icon: "📞", title: "Medical Information", text: "+41 22 900 0000\nMon–Fri, 8AM–6PM CET" },
                { icon: "✉️", title: "Email Us", text: "medical@efc-pharma.com\npartnerships@efc-pharma.com" },
                { icon: "🌍", title: "Regional Offices", text: "New York · London · Dubai\nSingapore · São Paulo · Cairo" },
              ].map((c) => (
                <div key={c.title} className="flex gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-[#1A6BD9]/30 transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-[#1A6BD9] flex items-center justify-center text-lg flex-shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-white mb-1">{c.title}</p>
                    <p className="text-xs text-white/45 whitespace-pre-line leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                {["in", "𝕏", "🔬", "▶"].map((s) => (
                  <button key={s} className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/50 hover:bg-[#0A1628] hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-bold">{s}</button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 bg-[#060d1a] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <circle cx="20" cy="20" r="19" stroke="#C9A227" strokeWidth="2"/>
                <path d="M20 8 L20 32 M8 20 L32 20" stroke="#C9A227" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="5" fill="#C9A227"/>
              </svg>
              <div>
                <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-white tracking-widest">EFC</span>
                <span className="block text-[8px] font-semibold text-[#C9A227] tracking-[3px] uppercase -mt-0.5">Pharmaceuticals</span>
              </div>
            </a>
            <p className="text-xs text-white/30 leading-relaxed mb-4">
              Advancing human health through pharmaceutical innovation and scientific excellence worldwide.
            </p>
            <div className="flex flex-wrap gap-2">
              {["WHO GMP", "FDA", "ISO 9001"].map((c) => (
                <span key={c} className="text-[9px] font-semibold text-white/25 bg-white/[0.03] border border-white/[0.06] rounded-full px-2.5 py-1">🏅 {c}</span>
              ))}
            </div>
          </div>

          {[
            { title: "Company", links: ["About EFC", "Leadership Team", "Careers", "Investor Relations", "Press & Media"] },
            { title: "Therapies", links: ["Oncology", "Cardiology", "Neurology", "Infectious Diseases", "Rare Diseases"] },
            { title: "Resources", links: ["Clinical Trials", "Product Catalogue", "Publications", "Medical Info", "Patient Support"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[9px] font-bold uppercase tracking-[2px] text-white/25 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-xs text-white/40 hover:text-white transition-colors duration-150">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.05] px-6 py-5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] text-white/25">© 2026 EFC Pharmaceuticals. All rights reserved.</p>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
                <a key={l} href="#" className="text-[11px] text-white/25 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <p className="max-w-6xl mx-auto mt-3 text-[10px] text-white/15 leading-relaxed">
            ℹ️ This website is intended for healthcare professionals and informational purposes only. Product information may vary by country. Always consult prescribing information and local regulations.
          </p>
        </div>
      </footer>

      {/* Back to top */}
      <BackToTop />
    </>
  );
}

/* ── Contact Form ── */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };
  if (submitted) return (
    <div className="text-center py-12">
      <div className="text-4xl mb-3">✅</div>
      <p className="text-white font-semibold mb-1">Message sent successfully!</p>
      <p className="text-xs text-white/40">Our team will respond within 1–2 business days.</p>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name *" id="firstName" placeholder="Dr. Sarah" />
        <Field label="Last Name *" id="lastName" placeholder="Johnson" />
      </div>
      <Field label="Email Address *" id="email" type="email" placeholder="s.johnson@hospital.com" />
      <Field label="Organization" id="org" placeholder="Hospital / Institution" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="inquiry" className="text-xs font-semibold text-white/70">Inquiry Type *</label>
        <select id="inquiry" required className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white/70 outline-none focus:border-[#1A6BD9] focus:ring-2 focus:ring-[#1A6BD9]/20 transition-all">
          <option value="" disabled>Select inquiry type</option>
          <option>Medical Information</option>
          <option>Product Inquiry</option>
          <option>Research Partnership</option>
          <option>Distribution / Procurement</option>
          <option>Clinical Trial Inquiry</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-white/70">Message *</label>
        <textarea id="message" required rows={4} placeholder="Please describe your inquiry..." className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#1A6BD9] focus:ring-2 focus:ring-[#1A6BD9]/20 transition-all resize-none" />
      </div>
      <div className="flex items-start gap-3">
        <input type="checkbox" required className="mt-0.5 accent-[#1A6BD9]" />
        <label className="text-[11px] text-white/35 leading-relaxed">I agree to EFC&apos;s Privacy Policy and consent to being contacted regarding my inquiry.</label>
      </div>
      <LiquidButton size="lg" className="text-white border border-white/20 rounded-xl font-semibold w-full justify-center" type="submit">
        ✉️ Send Message
      </LiquidButton>
    </form>
  );
}

function Field({ label, id, type = "text", placeholder }: { label: string; id: string; type?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-white/70">{label}</label>
      <input id={id} type={type} placeholder={placeholder} required className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#1A6BD9] focus:ring-2 focus:ring-[#1A6BD9]/20 transition-all" />
    </div>
  );
}

/* ── Back to top ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#1A6BD9] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(26,107,217,0.5)] hover:bg-[#0A1628] hover:-translate-y-1 transition-all duration-200">
      ↑
    </button>
  );
}

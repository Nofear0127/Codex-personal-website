"use client";

import { useEffect, useState } from "react";
import { LogIn, Menu, Play, Sparkles, UserPlus, X } from "lucide-react";
import BoomerangVideoBg from "./BoomerangVideoBg";

const BG_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4";
const navLinks = [{ href: "#purpose", label: "Purpose" }, { href: "#process", label: "The Process" }, { href: "#tariffs", label: "Tariffs" }];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);

  return <main className="relative min-h-screen w-full overflow-hidden sm:h-screen">
    <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 h-full w-full" />
    <div className="hero-wash" aria-hidden="true" />
    <nav className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-10">
      <a href="#top" className="flex items-center gap-2 text-[#2d3a2a]" aria-label="LinkFlow home"><span className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">LinkFlow<sup className="text-[10px] font-medium sm:text-xs">TM</sup></span></a>
      <div className="hidden items-center gap-1 rounded-full border border-white/60 bg-white/70 py-1 pl-6 pr-1 shadow-sm backdrop-blur-md lg:flex">
        {navLinks.map((link, index) => <a key={link.href} href={link.href} className={`px-3 py-2 text-sm transition-colors ${index === 0 ? "font-semibold text-[#1f2a1d]" : "font-medium text-[#4b5b47] hover:text-[#1f2a1d]"}`}>{link.label}</a>)}
        <a href="#signup" className="ml-2 rounded-full bg-[#1f2a1d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a3827]">Try it Live</a>
      </div>
      <div className="flex items-center gap-3 text-[#2d3a2a] sm:gap-6">
        <a href="#signup" className="hidden items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80 sm:flex"><UserPlus className="h-4 w-4" />Sign Me Up!</a>
        <a href="#login" className="hidden items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80 sm:flex"><LogIn className="h-4 w-4" />Enter</a>
        <button onClick={() => setMenuOpen(value => !value)} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[#1f2a1d] backdrop-blur-md transition-all duration-300 hover:bg-white/90 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          <Menu className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
          <X className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
        </button>
      </div>
    </nav>

    <div className={`fixed inset-0 z-20 bg-[#1f2a1d]/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={closeMenu} />
    <aside className={`fixed bottom-0 right-0 top-0 z-20 w-[85%] max-w-sm bg-white/95 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex h-full flex-col px-8 pb-8 pt-24">
        <div className="flex flex-col gap-1">{navLinks.map((link, index) => <a key={link.href} href={link.href} onClick={closeMenu} style={{ transitionDelay: menuOpen ? `${150 + index * 70}ms` : "0ms" }} className={`border-b border-[#1f2a1d]/10 py-4 text-2xl font-semibold text-[#1f2a1d] transition-all duration-500 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>{link.label}</a>)}</div>
        <div style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }} className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
          <a href="#signup" onClick={closeMenu} className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden"><UserPlus className="h-4 w-4" />Sign Me Up!</a>
          <a href="#login" onClick={closeMenu} className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden"><LogIn className="h-4 w-4" />Enter</a>
          <a href="#signup" onClick={closeMenu} className="mt-2 rounded-full bg-[#1f2a1d] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2a3827]">Try it Live</a>
        </div>
      </div>
    </aside>

    <section id="top" className="relative z-10 flex flex-col items-center px-4 pt-24 text-center sm:px-6 sm:pt-28 md:pt-32">
      <h1 className="max-w-5xl text-[2rem] font-normal leading-[0.95] tracking-[-0.035em] text-[#336443] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem]">Close the rift <span className="text-[#85AB8B]">linking<br className="hidden sm:block" /> signals and action</span></h1>
      <p className="mt-6 max-w-md px-2 text-sm leading-relaxed text-[#4b5b47] sm:mt-8 sm:text-base md:text-lg">Shape scattered signals into meaningful outcomes via AI-driven workflows.</p>
    </section>
    <section id="purpose" className="absolute bottom-6 left-4 right-4 z-10 max-w-sm sm:bottom-8 sm:left-6 sm:right-auto md:bottom-10 md:left-10">
      <div className="mb-3 flex items-center gap-2 text-[#3d5638] sm:text-white/95"><Sparkles className="h-4 w-4" /><span className="text-sm font-semibold sm:font-medium">FluxEngine<sup className="text-[10px]">TM</sup></span></div>
      <p className="mb-6 max-w-xs text-xs font-medium leading-relaxed text-[#3d5638]/90 sm:font-normal sm:text-white/85">LinkFlow smoothly unites your company systems, streamlining data paths between services without having to write custom scripts.</p>
      <div className="flex flex-wrap items-center gap-4"><a id="signup" href="mailto:hello@linkflow.ai" className="rounded-full bg-[#3d5638] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d4228] sm:bg-white sm:px-6 sm:py-3 sm:text-[#1f2a1d] sm:hover:bg-white/90">Try it Live</a><a id="process" href="#tariffs" className="text-sm font-semibold text-[#3d5638] transition-opacity hover:opacity-80 sm:font-medium sm:text-white">Know More.</a></div>
    </section>
    <div id="tariffs" className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 text-sm text-white/90 sm:flex md:bottom-10 md:right-10"><button className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30" aria-label="Play how we build video"><Play className="ml-0.5 h-3 w-3 fill-white text-white" /></button><span className="font-medium">How we build?</span><span className="text-white/60">1:35</span></div>
  </main>;
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, Mail, Phone, MapPin, Send } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#030914] text-white/80 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-between p-2 shadow-lg shadow-brand-orange/30 transform group-hover:scale-105 transition-transform duration-200">
                <Car className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                MOROCCO<span className="text-brand-orange">DRIVE</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Morocco Drive est le leader de la location de voitures premium au Maroc. Voyagez avec élégance, confort et sécurité grâce à notre flotte moderne présente dans les plus grandes villes du Royaume.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-orange hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-orange hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-orange hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-orange hover:text-white flex items-center justify-center transition-all duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide uppercase">Liens Rapides</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-orange transition-colors">Accueil</Link>
              </li>
              <li>
                <Link href="/flotte" className="hover:text-brand-orange transition-colors">Notre Flotte</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-orange transition-colors">Nos Services</Link>
              </li>
              <li>
                <Link href="/agences" className="hover:text-brand-orange transition-colors">Nos Agences</Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-brand-orange transition-colors">À Propos</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-orange transition-colors">Blog & Guides</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-orange transition-colors text-white/50">Espace Admin</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide uppercase">Catégories</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/flotte?cat=economique" className="hover:text-brand-orange transition-colors">Voitures Économiques</Link>
              </li>
              <li>
                <Link href="/flotte?cat=berline" className="hover:text-brand-orange transition-colors">Berlines Confortables</Link>
              </li>
              <li>
                <Link href="/flotte?cat=suv" className="hover:text-brand-orange transition-colors">SUV Familiaux</Link>
              </li>
              <li>
                <Link href="/flotte?cat=luxe" className="hover:text-brand-orange transition-colors">Prestige & Luxe</Link>
              </li>
              <li>
                <Link href="/flotte?cat=4x4" className="hover:text-brand-orange transition-colors">4x4 Tout-Terrain</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide uppercase">Newsletter</h3>
            <p className="text-sm text-white/60 mb-4">
              Abonnez-vous pour recevoir nos offres spéciales et guides de voyage.
            </p>
            <form onSubmit={handleSubscribe} className="relative mb-6">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-md bg-brand-orange hover:bg-brand-orange-light text-white transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 mt-2">Merci pour votre inscription !</p>
            )}

            <div className="space-y-3 text-sm mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>+212 522 010 203 (Assistance 24/7)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span>support@moroccodrive.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-xs">Mohammed V Airport, Casablanca, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-white/45 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Morocco Drive. Tous droits réservés. Conçu pour démonstration client.
          </p>
          {/* Payment Methods icons */}
          <div className="flex items-center space-x-3 grayscale opacity-60">
            <span className="text-[10px] text-white/40 font-semibold tracking-wider mr-2">PAIEMENT SÉCURISÉ :</span>
            <div className="bg-white/5 px-2 py-1 rounded text-white text-[10px] font-bold">VISA</div>
            <div className="bg-white/5 px-2 py-1 rounded text-white text-[10px] font-bold">MASTERCARD</div>
            <div className="bg-white/5 px-2 py-1 rounded text-white text-[10px] font-bold">APPLE PAY</div>
            <div className="bg-white/5 px-2 py-1 rounded text-white text-[10px] font-bold">CMI</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

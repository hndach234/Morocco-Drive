"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Car,
  Shield,
  Clock,
  Plane,
  ChevronDown,
  Star,
  Search,
  Calendar,
  MapPin,
  ArrowRight,
  Send,
  HelpCircle
} from "lucide-react";

import carsData from "../../data/cars.json";
import reviewsData from "../../data/reviews.json";
import faqData from "../../data/faq.json";
import agenciesData from "../../data/agencies.json";

export default function Home() {
  const router = useRouter();
  
  // Search Form State
  const [pickupAgency, setPickupAgency] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [category, setCategory] = useState("");

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickupAgency) params.append("agency", pickupAgency);
    if (category) params.append("cat", category);
    if (pickupDate) params.append("start", pickupDate);
    if (returnDate) params.append("end", returnDate);
    router.push(`/flotte?${params.toString()}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Filter popular cars
  const popularCars = carsData.filter(car => car.isPopular).slice(0, 3);

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[95vh] min-h-[600px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
            alt="Premium Car Morocco Drive"
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-light-bg via-transparent to-black/50 dark:from-dark-bg" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-brand-orange/90 text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
              Expérience de Location de Luxe au Maroc
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight max-w-4xl mx-auto drop-shadow-md">
              Découvrez le Maroc avec <span className="text-brand-orange">Style</span> & <span className="text-brand-orange">Confort</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-6 text-white/80 leading-relaxed drop-shadow">
              Morocco Drive vous propose une flotte moderne et haut de gamme. Prenez la route en toute sérénité depuis nos 8 agences stratégiques.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/flotte"
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-light text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-brand-orange/30 transform hover:-translate-y-0.5 transition-all"
            >
              Découvrir la Flotte
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur font-bold px-8 py-3.5 rounded-xl transform hover:-translate-y-0.5 transition-all"
            >
              Nos Services Premium
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Barre de recherche (Floating Search Bar) */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 -mt-24 sm:-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass dark:bg-dark-card/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-brand-blue/10 dark:border-white/10"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Pickup Agency */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                <span>Agence de Départ</span>
              </label>
              <div className="relative">
                <select
                  value={pickupAgency}
                  onChange={(e) => setPickupAgency(e.target.value)}
                  className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-brand-orange appearance-none cursor-pointer"
                >
                  <option value="">Sélectionner une ville</option>
                  {agenciesData.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 pointer-events-none text-brand-blue/50 dark:text-white/50" />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70 flex items-center space-x-1">
                <Car className="w-3.5 h-3.5 text-brand-orange" />
                <span>Type de Véhicule</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-brand-orange appearance-none cursor-pointer"
                >
                  <option value="">Tous types</option>
                  <option value="economique">Économique</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="luxe">Luxe & Sport</option>
                  <option value="4x4">4x4 Tout-Terrain</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 pointer-events-none text-brand-blue/50 dark:text-white/50" />
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                <span>Date de Prise</span>
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2.5 px-4 text-sm font-medium focus:outline-none focus:border-brand-orange cursor-pointer"
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                <span>Date de Retour</span>
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2.5 px-4 text-sm font-medium focus:outline-none focus:border-brand-orange cursor-pointer"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-brand-orange/20 transition-all flex items-center justify-center space-x-2 cursor-pointer h-[46px]"
            >
              <Search className="w-4 h-4" />
              <span>Rechercher</span>
            </button>
          </form>
        </motion.div>
      </section>

      {/* 3. Pourquoi nous choisir */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Pourquoi Louer Chez Nous</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white mt-2">
            L'Excellence du Service de Location
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Clock className="w-6 h-6 text-white" />,
              title: "Assistance client 24/7",
              desc: "Notre équipe dévouée vous accompagne à tout moment, de jour comme de nuit, par téléphone ou WhatsApp."
            },
            {
              icon: <Shield className="w-6 h-6 text-white" />,
              title: "Zéro frais cachés",
              desc: "Le tarif réservé correspond exactement au montant à payer. Assurance tiers et taxes comprises."
            },
            {
              icon: <Car className="w-6 h-6 text-white" />,
              title: "Véhicules Récents",
              desc: "Toutes nos voitures subissent des contrôles stricts et réguliers pour vous garantir une sécurité absolue."
            },
            {
              icon: <Plane className="w-6 h-6 text-white" />,
              title: "Livraison Aéroport gratuit",
              desc: "Prise en charge directe dès votre descente d'avion à Casablanca, Marrakech, Agadir et Tanger."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue dark:bg-brand-orange flex items-center justify-center mb-6 shadow-md shadow-brand-blue/10 dark:shadow-brand-orange/20">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-blue dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-brand-blue/70 dark:text-white/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Voitures populaires */}
      <section className="py-24 bg-brand-blue/5 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-16">
            <div>
              <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Flotte Vedette</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white mt-2">
                Nos Voitures Populaires
              </h2>
            </div>
            <Link
              href="/flotte"
              className="mt-4 sm:mt-0 flex items-center space-x-1.5 text-sm font-bold text-brand-orange hover:text-brand-orange-light transition-colors group"
            >
              <span>Voir toute la flotte</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                {/* Car Image */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                    {car.category.toUpperCase()}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-dark-card/95 text-brand-blue dark:text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 fill-current text-brand-orange" />
                    <span>{car.rating}</span>
                  </div>
                </div>

                {/* Car Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-1">
                    {car.make} <span className="font-semibold text-brand-blue/80 dark:text-white/80">{car.model}</span>
                  </h3>
                  <p className="text-xs text-brand-blue/60 dark:text-white/60 mb-4">{car.engine} • {car.fuel}</p>
                  
                  {/* Specs Mini */}
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-light-border dark:border-dark-border py-3 mb-6 text-center text-xs font-semibold text-brand-blue/70 dark:text-white/70">
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold mb-0.5">Transmission</p>
                      <p className="truncate text-brand-orange">{car.transmission}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold mb-0.5">Capacité</p>
                      <p className="text-brand-blue dark:text-white">{car.seats} places</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold mb-0.5">Bagages</p>
                      <p className="text-brand-blue dark:text-white">{car.luggage} sacs</p>
                    </div>
                  </div>

                  {/* Price and CTAs */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-brand-orange">{car.price} DH</span>
                      <span className="text-[11px] text-brand-blue/50 dark:text-white/50 block">/ jour</span>
                    </div>
                    
                    <Link
                      href={`/flotte?select=${car.id}`}
                      className="bg-brand-blue hover:bg-brand-blue-light dark:bg-white/10 dark:hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors border border-transparent dark:border-white/15"
                    >
                      Détails & Réserver
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Avis clients */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Témoignages</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white mt-2">
            Ce Que Disent Nos Clients
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-brand-orange mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < review.rating ? "text-brand-orange" : "text-zinc-200 dark:text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-brand-blue/80 dark:text-white/80 italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-4 border-t border-light-border dark:border-dark-border pt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-blue dark:text-white">{review.name}</h4>
                  <p className="text-xs text-brand-blue/50 dark:text-white/50">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FAQ interactive */}
      <section className="py-24 bg-brand-blue/5 dark:bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-8 h-8 text-brand-orange mx-auto mb-2" />
            <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white mt-2">
              Questions Fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-brand-blue dark:text-white transition-colors hover:text-brand-orange cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-orange transition-transform duration-200 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-brand-blue/70 dark:text-white/70 border-t border-light-border dark:border-dark-border leading-relaxed bg-brand-blue/[0.01] dark:bg-white/[0.01]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="py-20 relative bg-brand-blue text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Restez informé de nos offres exclusives
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
            Inscrivez-vous à notre newsletter et profitez de réductions spéciales et d'itinéraires de voyage exclusifs au Maroc.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Entrez votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-brand-orange focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
            >
              <span>S'abonner</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-green-400 mt-4 font-semibold"
            >
              ✓ Votre inscription a été enregistrée avec succès. Merci !
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
}

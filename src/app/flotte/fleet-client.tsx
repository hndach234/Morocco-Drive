"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Car,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  Briefcase,
  Gauge,
  Fuel,
  Info,
  Calendar,
  X,
  CheckCircle2,
  CalendarDays,
  MapPin,
  ChevronRight,
  ShieldCheck,
  User,
  Mail,
  PhoneCall,
  RotateCcw,
  Sparkles
} from "lucide-react";

import { Breadcrumb } from "@/components/breadcrumb";
import carsData from "../../../data/cars.json";
import categoriesData from "../../../data/categories.json";
import agenciesData from "../../../data/agencies.json";

export default function FleetClient() {
  const searchParams = useSearchParams();

  // URL parameters parsing
  const initialCategory = searchParams.get("cat") || "";
  const initialAgency = searchParams.get("agency") || "";
  const initialSelect = searchParams.get("select") || "";
  const initialStart = searchParams.get("start") || "";
  const initialEnd = searchParams.get("end") || "";

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAgency, setSelectedAgency] = useState(initialAgency);
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [priceRange, setPriceRange] = useState<number>(3500);

  // Sorting State
  const [sortBy, setSortBy] = useState("recommended");

  // Selected Car for Modals
  const [activeCarId, setActiveCarId] = useState<string | null>(null);
  const [bookingCarId, setBookingCarId] = useState<string | null>(null);

  // Booking Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [pickupDate, setPickupDate] = useState(initialStart || new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(initialEnd || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]);
  const [pickupAgencyLoc, setPickupAgencyLoc] = useState(initialAgency || "casablanca");
  const [returnAgencyLoc, setReturnAgencyLoc] = useState(initialAgency || "casablanca");
  
  // Options states
  const [optGps, setOptGps] = useState(false);
  const [optBabySeat, setOptBabySeat] = useState(false);
  const [optFullInsurance, setOptFullInsurance] = useState(false);
  const [optAdditionalDriver, setOptAdditionalDriver] = useState(false);

  // Booking Success State
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Detail Modal Gallery Active Image
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Open detail modal if specified in URL
  useEffect(() => {
    if (initialSelect) {
      setActiveCarId(initialSelect);
    }
  }, [initialSelect]);

  // Handle URL change updates
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialAgency) setSelectedAgency(initialAgency);
  }, [initialCategory, initialAgency]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedAgency("");
    setSelectedTransmission("");
    setSelectedFuel("");
    setPriceRange(3500);
    setSortBy("recommended");
  };

  // Find active cars data
  const activeCar = useMemo(() => {
    return carsData.find(c => c.id === activeCarId) || null;
  }, [activeCarId]);

  const bookingCar = useMemo(() => {
    return carsData.find(c => c.id === bookingCarId) || null;
  }, [bookingCarId]);

  // Gallery images (simulated since we only have one main image per car)
  const carGallery = useMemo(() => {
    if (!activeCar) return [];
    // We construct 3 variations of the same Unsplash image by changing styling params, or using similar luxury car tags
    return [
      activeCar.image,
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600"
    ];
  }, [activeCar]);

  // Filtering Logic
  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      // Keyword filter
      const matchesKeyword =
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory ? car.category === selectedCategory : true;

      // Agency availability filter
      const matchesAgency = selectedAgency ? car.agencyIds.includes(selectedAgency) : true;

      // Transmission filter
      const matchesTransmission = selectedTransmission ? car.transmission === selectedTransmission : true;

      // Fuel filter
      const matchesFuel = selectedFuel ? car.fuel === selectedFuel : true;

      // Price range
      const matchesPrice = car.price <= priceRange;

      return matchesKeyword && matchesCategory && matchesAgency && matchesTransmission && matchesFuel && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);
      return 0; // recommended / default
    });
  }, [searchQuery, selectedCategory, selectedAgency, selectedTransmission, selectedFuel, priceRange, sortBy]);

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [pickupDate, returnDate]);

  // Calculate booking pricing summary
  const pricingSummary = useMemo(() => {
    if (!bookingCar) return { base: 0, gps: 0, baby: 0, insurance: 0, driver: 0, total: 0 };
    const base = bookingCar.price * rentalDays;
    const gps = optGps ? 30 * rentalDays : 0;
    const baby = optBabySeat ? 50 * rentalDays : 0;
    const insurance = optFullInsurance ? 100 * rentalDays : 0;
    const driver = optAdditionalDriver ? 150 : 0; // flat fee
    const total = base + gps + baby + insurance + driver;
    return { base, gps, baby, insurance, driver, total };
  }, [bookingCar, rentalDays, optGps, optBabySeat, optFullInsurance, optAdditionalDriver]);

  // Handle booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    // Trigger Success screen
    setBookingSuccess(true);

    // Fire Confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Reset booking form
  const handleCloseBookingModal = () => {
    setBookingCarId(null);
    setBookingSuccess(false);
    // Clear form
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setOptGps(false);
    setOptBabySeat(false);
    setOptFullInsurance(false);
    setOptAdditionalDriver(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Breadcrumbs */}
      <Breadcrumb items={[{ label: "Notre flotte" }]} />

      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white">
          Notre Flotte Automobile
        </h1>
        <p className="text-sm sm:text-base text-brand-blue/60 dark:text-white/60 mt-2">
          Découvrez notre large gamme de véhicules premium, entretenus avec le plus grand soin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl h-fit sticky top-24 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 font-bold text-brand-blue dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
              <span>Filtres</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-orange hover:text-brand-orange-light font-bold flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Search Keyword */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70">
                Recherche
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Marque, modèle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 pl-9 text-sm focus:outline-none focus:border-brand-orange"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-brand-blue/40 dark:text-white/40" />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-brand-orange"
              >
                <option value="">Toutes les catégories</option>
                {categoriesData.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Agency availability */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70">
                Disponibilité Agence
              </label>
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-brand-orange"
              >
                <option value="">Toutes les agences</option>
                {agenciesData.map(agency => (
                  <option key={agency.id} value={agency.id}>{agency.city}</option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70">
                Transmission
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "", label: "Tous" },
                  { value: "Manuelle", label: "Manu" },
                  { value: "Automatique", label: "Auto" }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedTransmission(opt.value)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                      selectedTransmission === opt.value
                        ? "bg-brand-orange border-brand-orange text-white"
                        : "bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-brand-blue/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70">
                Carburant
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "", label: "Tous" },
                  { value: "Diesel", label: "Diesel" },
                  { value: "Essence", label: "Essence" }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedFuel(opt.value)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                      selectedFuel === opt.value
                        ? "bg-brand-orange border-brand-orange text-white"
                        : "bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-brand-blue/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-brand-blue/70 dark:text-white/70">
                <span>Prix max / jour</span>
                <span className="text-brand-orange font-extrabold">{priceRange} DH</span>
              </div>
              <input
                type="range"
                min="230"
                max="3500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-orange cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-blue/40 dark:text-white/40 font-bold">
                <span>230 DH</span>
                <span>3500 DH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Fleet Content */}
        <div className="lg:col-span-3">
          {/* Sorting and Summary */}
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between shadow-sm mb-8 gap-4">
            <span className="text-xs sm:text-sm font-bold text-brand-blue/70 dark:text-white/70">
              <span className="text-brand-orange font-extrabold">{filteredCars.length}</span> véhicules disponibles
            </span>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <label className="text-xs font-bold text-brand-blue/60 dark:text-white/60 shrink-0">
                Trier par :
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-1.5 px-3 text-xs font-bold focus:outline-none focus:border-brand-orange cursor-pointer"
              >
                <option value="recommended">Recommandé</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="rating">Mieux notés</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>
          </div>

          {/* Cars Grid */}
          {filteredCars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl"
            >
              <Car className="w-12 h-12 text-brand-blue/20 dark:text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-brand-blue dark:text-white">Aucun véhicule trouvé</h3>
              <p className="text-sm text-brand-blue/60 dark:text-white/60 mt-1">
                Modifiez vos critères de recherche ou réinitialisez les filtres.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCars.map((car) => (
                  <motion.div
                    layout
                    key={car.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <Image
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3.5 left-3.5 bg-brand-orange text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                        {car.category}
                      </div>
                      <div className="absolute top-3.5 right-3.5 bg-white/95 dark:bg-dark-card/95 text-brand-blue dark:text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current text-brand-orange" />
                        <span>{car.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-base font-bold text-brand-blue dark:text-white mb-0.5">
                        {car.make} <span className="font-medium text-brand-blue/70 dark:text-white/70">{car.model}</span>
                      </h3>
                      <p className="text-[10px] text-brand-blue/50 dark:text-white/50 mb-3 uppercase tracking-wider font-bold">
                        {car.engine} • {car.fuel}
                      </p>

                      {/* Specs Icons */}
                      <div className="grid grid-cols-3 gap-1 border-t border-b border-light-border dark:border-dark-border py-2 mb-4 text-[10px] font-semibold text-brand-blue/60 dark:text-white/60 text-center">
                        <div className="flex flex-col items-center">
                          <Gauge className="w-3.5 h-3.5 mb-1 text-brand-orange/70" />
                          <span className="truncate w-full">{car.transmission}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Users className="w-3.5 h-3.5 mb-1 text-brand-orange/70" />
                          <span>{car.seats} Places</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Briefcase className="w-3.5 h-3.5 mb-1 text-brand-orange/70" />
                          <span>{car.luggage} Sacs</span>
                        </div>
                      </div>

                      {/* Price & Buttons */}
                      <div className="mt-auto pt-2 flex flex-col space-y-2.5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] uppercase font-bold text-brand-blue/40 dark:text-white/40">Tarif Journalier</span>
                          <p>
                            <span className="text-xl font-extrabold text-brand-orange">{car.price} DH</span>
                            <span className="text-[10px] text-brand-blue/50 dark:text-white/50">/jour</span>
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setActiveCarId(car.id)}
                            className="bg-light-bg dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-brand-blue dark:text-white font-bold text-xs py-2 rounded-lg transition-colors border border-light-border dark:border-white/10 flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <Info className="w-3.5 h-3.5" />
                            <span>Détails</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setBookingCarId(car.id);
                              // Seed defaults
                              setPickupAgencyLoc(selectedAgency || car.agencyIds[0] || "casablanca");
                              setReturnAgencyLoc(selectedAgency || car.agencyIds[0] || "casablanca");
                            }}
                            className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs py-2 rounded-lg shadow shadow-brand-orange/10 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Réserver</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCarId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCarId(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Gallery */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-zinc-50 dark:bg-black/20">
                <div className="relative h-60 w-full rounded-xl overflow-hidden shadow-inner bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={carGallery[activeImageIdx] || activeCar.image}
                    alt={`${activeCar.make} ${activeCar.model}`}
                    fill
                    className="object-cover transition-all duration-300"
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-2 mt-4">
                  {carGallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`relative w-16 h-12 rounded-md overflow-hidden border-2 cursor-pointer ${
                        activeImageIdx === i ? "border-brand-orange" : "border-transparent"
                      }`}
                    >
                      <Image src={img} alt="car thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 space-y-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue/50 dark:text-white/50">Disponibilité Agences</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCar.agencyIds.map(agencyId => {
                      const agency = agenciesData.find(a => a.id === agencyId);
                      return (
                        <span key={agencyId} className="bg-brand-blue/5 dark:bg-white/5 text-brand-blue dark:text-white/80 text-[10px] font-semibold px-2 py-1 rounded">
                          {agency?.city || agencyId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Information */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="bg-brand-orange/15 text-brand-orange text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                    {activeCar.category}
                  </span>
                  
                  <h2 className="text-2xl font-extrabold text-brand-blue dark:text-white mt-3">
                    {activeCar.make} <span className="font-medium text-brand-blue/70 dark:text-white/70">{activeCar.model}</span>
                  </h2>

                  <div className="flex items-center space-x-1.5 text-xs text-brand-orange font-semibold mt-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{activeCar.rating} ({activeCar.reviewsCount} avis clients)</span>
                  </div>

                  {/* Core Specifications */}
                  <div className="grid grid-cols-2 gap-3 mt-5 bg-light-bg dark:bg-white/5 p-3.5 rounded-xl text-xs font-medium text-brand-blue/80 dark:text-white/80">
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Trans : <strong>{activeCar.transmission}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Carb : <strong>{activeCar.fuel}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Sièges : <strong>{activeCar.seats}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Coffre : <strong>{activeCar.luggage} Bagages</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2 border-t border-brand-blue/5 dark:border-white/5 pt-2 mt-1">
                      <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Conso : <strong>{activeCar.consumption}</strong> ({activeCar.engine})</span>
                    </div>
                  </div>

                  {/* Features Checkboxes */}
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue/50 dark:text-white/50 mb-2">Options incluses</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {activeCar.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 text-xs text-brand-blue/80 dark:text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-light-border dark:border-dark-border pt-4 mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-brand-blue/40 dark:text-white/40 block font-bold uppercase">Location</span>
                    <p className="flex items-baseline">
                      <span className="text-2xl font-extrabold text-brand-orange">{activeCar.price} DH</span>
                      <span className="text-[10px] text-brand-blue/50 dark:text-white/50 ml-1">/ jour</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setBookingCarId(activeCar.id);
                      setPickupAgencyLoc(selectedAgency || activeCar.agencyIds[0] || "casablanca");
                      setReturnAgencyLoc(selectedAgency || activeCar.agencyIds[0] || "casablanca");
                      setActiveCarId(null);
                    }}
                    className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-brand-orange/20 transition-all cursor-pointer"
                  >
                    Réserver Maintenant
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {bookingCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseBookingModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm fixed"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Close button */}
              <button
                onClick={handleCloseBookingModal}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-brand-blue/5 dark:bg-white/5 text-brand-blue dark:text-white hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {!bookingSuccess ? (
                <form onSubmit={handleBookingSubmit} className="flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible">
                  {/* Form fields */}
                  <div className="w-full md:w-3/5 p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-none">
                    <span className="text-brand-orange font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span>Étape finale de réservation</span>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue dark:text-white mt-1">
                      Louer la {bookingCar.make} {bookingCar.model}
                    </h2>
                    
                    {/* Inputs Group */}
                    <div className="space-y-4 mt-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-light-border dark:border-dark-border pb-1.5">
                        Informations Conducteur
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Nom Complet</label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="Youssef Bennani"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 pl-9 text-sm focus:outline-none focus:border-brand-orange"
                            />
                            <User className="absolute left-3 top-2.5 w-4 h-4 text-brand-blue/30 dark:text-white/30" />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Téléphone</label>
                          <div className="relative">
                            <input
                              type="tel"
                              required
                              placeholder="+212 6 00 00 00 00"
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 pl-9 text-sm focus:outline-none focus:border-brand-orange"
                            />
                            <PhoneCall className="absolute left-3 top-2.5 w-4 h-4 text-brand-blue/30 dark:text-white/30" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Adresse Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="youssef@example.com"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 pl-9 text-sm focus:outline-none focus:border-brand-orange"
                          />
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-brand-blue/30 dark:text-white/30" />
                        </div>
                      </div>

                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-light-border dark:border-dark-border pb-1.5 pt-2">
                        Détails du Trajet
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Agence de départ</label>
                          <select
                            value={pickupAgencyLoc}
                            onChange={(e) => setPickupAgencyLoc(e.target.value)}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-brand-orange"
                          >
                            {agenciesData.map(a => (
                              <option key={a.id} value={a.id}>{a.city}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Agence de retour</label>
                          <select
                            value={returnAgencyLoc}
                            onChange={(e) => setReturnAgencyLoc(e.target.value)}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-brand-orange"
                          >
                            {agenciesData.map(a => (
                              <option key={a.id} value={a.id}>{a.city}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Date de départ</label>
                          <input
                            type="date"
                            required
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-1.5 px-3 text-sm focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Date de retour</label>
                          <input
                            type="date"
                            required
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-1.5 px-3 text-sm focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                      </div>

                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-light-border dark:border-dark-border pb-1.5 pt-2">
                        Options additionnelles
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-brand-blue/80 dark:text-white/80">
                        <label className="flex items-center space-x-2.5 p-2 bg-light-bg dark:bg-white/5 rounded-xl border border-light-border dark:border-white/5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={optGps}
                            onChange={(e) => setOptGps(e.target.checked)}
                            className="accent-brand-orange w-4 h-4 shrink-0"
                          />
                          <span>GPS Maroc (+30 DH/j)</span>
                        </label>
                        <label className="flex items-center space-x-2.5 p-2 bg-light-bg dark:bg-white/5 rounded-xl border border-light-border dark:border-white/5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={optBabySeat}
                            onChange={(e) => setOptBabySeat(e.target.checked)}
                            className="accent-brand-orange w-4 h-4 shrink-0"
                          />
                          <span>Siège Bébé (+50 DH/j)</span>
                        </label>
                        <label className="flex items-center space-x-2.5 p-2 bg-light-bg dark:bg-white/5 rounded-xl border border-light-border dark:border-white/5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={optFullInsurance}
                            onChange={(e) => setOptFullInsurance(e.target.checked)}
                            className="accent-brand-orange w-4 h-4 shrink-0"
                          />
                          <span>Zéro Franchise (+100 DH/j)</span>
                        </label>
                        <label className="flex items-center space-x-2.5 p-2 bg-light-bg dark:bg-white/5 rounded-xl border border-light-border dark:border-white/5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={optAdditionalDriver}
                            onChange={(e) => setOptAdditionalDriver(e.target.checked)}
                            className="accent-brand-orange w-4 h-4 shrink-0"
                          />
                          <span>Conducteur Suppl. (+150 DH)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Summary Column */}
                  <div className="w-full md:w-2/5 bg-brand-blue text-white p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-6 flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>Récapitulatif</span>
                      </h3>

                      {/* Mini car details */}
                      <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-white/10">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-white/10 shrink-0">
                          <Image src={bookingCar.image} alt={bookingCar.model} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{bookingCar.make} {bookingCar.model}</h4>
                          <span className="text-[10px] text-white/60 bg-white/10 px-2 py-0.5 rounded uppercase">{bookingCar.category}</span>
                        </div>
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="space-y-3.5 text-xs text-white/80">
                        <div className="flex justify-between">
                          <span>Prix journalier</span>
                          <span className="font-bold text-white">{bookingCar.price} DH</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Durée de location</span>
                          <span className="font-bold text-white">{rentalDays} {rentalDays > 1 ? "jours" : "jour"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tarif de base ({rentalDays}j)</span>
                          <span className="font-bold text-white">{pricingSummary.base} DH</span>
                        </div>

                        {/* Options pricing if selected */}
                        {(optGps || optBabySeat || optFullInsurance || optAdditionalDriver) && (
                          <div className="pt-3 border-t border-white/10 space-y-2.5">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">Options souscrites</h4>
                            {optGps && (
                              <div className="flex justify-between text-[11px]">
                                <span>Option GPS Maroc ({rentalDays}j)</span>
                                <span>{pricingSummary.gps} DH</span>
                              </div>
                            )}
                            {optBabySeat && (
                              <div className="flex justify-between text-[11px]">
                                <span>Option Siège Bébé ({rentalDays}j)</span>
                                <span>{pricingSummary.baby} DH</span>
                              </div>
                            )}
                            {optFullInsurance && (
                              <div className="flex justify-between text-[11px]">
                                <span>Assurance Zéro Franchise ({rentalDays}j)</span>
                                <span>{pricingSummary.insurance} DH</span>
                              </div>
                            )}
                            {optAdditionalDriver && (
                              <div className="flex justify-between text-[11px]">
                                <span>Conducteur Additionnel (Fixe)</span>
                                <span>{pricingSummary.driver} DH</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/15">
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-sm font-bold uppercase tracking-wider text-white">Montant Total</span>
                        <div className="text-right">
                          <span className="text-3xl font-extrabold text-brand-orange">{pricingSummary.total} DH</span>
                          <span className="text-[10px] text-white/50 block">TTC (Assurance incluse)</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer text-sm"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirmer ma demande</span>
                      </button>

                      <p className="text-[10px] text-white/40 text-center mt-3 leading-relaxed">
                        En soumettant cette demande, vous acceptez d'être contacté par notre agence pour valider votre dossier de location.
                      </p>
                    </div>
                  </div>
                </form>
              ) : (
                // Success screen
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 sm:p-12 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white">
                    Demande envoyée !
                  </h2>
                  
                  <p className="text-sm sm:text-base text-brand-blue/70 dark:text-white/70 max-w-md mx-auto mt-4 leading-relaxed">
                    Votre demande de réservation a été envoyée avec succès.
                  </p>
                  
                  <div className="mt-8 bg-light-bg dark:bg-white/5 p-6 rounded-xl border border-light-border dark:border-white/5 text-left text-xs max-w-md w-full space-y-2 text-brand-blue/80 dark:text-white/80">
                    <h3 className="font-bold text-sm text-brand-orange mb-3 border-b border-light-border dark:border-white/5 pb-1">Récapitulatif de la simulation</h3>
                    <p>• <strong>Véhicule :</strong> {bookingCar.make} {bookingCar.model} ({bookingCar.price} DH/jour)</p>
                    <p>• <strong>Durée :</strong> {rentalDays} {rentalDays > 1 ? "jours" : "jour"}</p>
                    <p>• <strong>Prise en charge :</strong> Agence de {pickupAgencyLoc} ({pickupDate})</p>
                    <p>• <strong>Montant calculé :</strong> {pricingSummary.total} DH TTC</p>
                    <p className="text-[10px] text-brand-blue/40 dark:text-white/40 pt-2 italic">Aucune donnée n'a été enregistrée en base de données conformément au cahier des charges.</p>
                  </div>

                  <button
                    onClick={handleCloseBookingModal}
                    className="mt-8 bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Retourner à la flotte
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

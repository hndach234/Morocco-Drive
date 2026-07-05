"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight, Compass, Shield } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import agenciesData from "../../../data/agencies.json";

export default function AgenciesPage() {
  const [selectedCityId, setSelectedCityId] = useState("casablanca");

  const activeAgency = agenciesData.find(a => a.id === selectedCityId) || agenciesData[0];

  // OpenStreetMap embed URL coordinates mapping
  // We can construct a nice coordinates bounding box or point view using OpenStreetMap embeds:
  const getMapEmbedUrl = (lat: number, lng: number) => {
    // Zoomed in view around the coordinates
    const offset = 0.015;
    const minLat = lat - offset;
    const maxLat = lat + offset;
    const minLng = lng - offset;
    const maxLng = lng + offset;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "Nos agences" }]} />

      <div className="text-center sm:text-left mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white">
          Nos Agences de Location au Maroc
        </h1>
        <p className="text-sm sm:text-base text-brand-blue/60 dark:text-white/60 mt-2">
          Retrouvez-nous dans les 8 plus grandes villes et aéroports du Maroc.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Agencies List */}
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
          {agenciesData.map((agency) => {
            const isSelected = selectedCityId === agency.id;
            return (
              <button
                key={agency.id}
                onClick={() => setSelectedCityId(agency.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-brand-blue dark:bg-dark-card border-brand-orange text-white shadow-lg"
                    : "bg-white dark:bg-dark-card border-light-border dark:border-dark-border text-brand-blue dark:text-white hover:bg-brand-blue/5 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base sm:text-lg">{agency.city}</h3>
                  <MapPin className={`w-4 h-4 ${isSelected ? "text-brand-orange" : "text-brand-blue/40 dark:text-white/40"}`} />
                </div>
                <p className={`text-xs mt-1 leading-snug ${isSelected ? "text-white/80" : "text-brand-blue/60 dark:text-white/60"}`}>
                  {agency.name}
                </p>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <Phone className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-brand-orange" : "text-brand-orange"}`} />
                    <span>{agency.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-brand-orange" : "text-brand-orange"}`} />
                    <span className="truncate">{agency.email}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Agency Detail & Map */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* Selected Agency Info Box */}
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] bg-brand-orange/15 text-brand-orange font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Agence Sélectionnée
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-blue dark:text-white mt-1.5">{activeAgency.city}</h2>
                <p className="text-xs sm:text-sm text-brand-blue/60 dark:text-white/60 mt-1">{activeAgency.address}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-brand-blue/80 dark:text-white/80 font-medium">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Horaires : <strong>{activeAgency.hours}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Contact : <strong>{activeAgency.phone}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end shrink-0">
              <Link
                href={`/flotte?agency=${activeAgency.id}`}
                className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-brand-orange/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Louer dans cette agence</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Map Box */}
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm h-[380px] sm:h-[450px] relative">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={getMapEmbedUrl(activeAgency.coordinates.lat, activeAgency.coordinates.lng)}
              className="grayscale dark:invert opacity-90"
              title={`Carte de l'agence Morocco Drive à ${activeAgency.city}`}
            />
            <div className="absolute bottom-3 left-3 bg-brand-blue/90 dark:bg-dark-card/90 text-white text-[10px] font-semibold py-1 px-2.5 rounded backdrop-blur border border-white/10 flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-brand-orange animate-spin-slow" />
              <span>Coordonnées : {activeAgency.coordinates.lat.toFixed(4)}, {activeAgency.coordinates.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services in Agencies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-brand-blue/5 dark:bg-white/[0.02] p-8 rounded-3xl border border-light-border dark:border-white/5">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center shrink-0">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-brand-blue dark:text-white text-sm">Réseau National</h3>
            <p className="text-xs text-brand-blue/60 dark:text-white/60 mt-1 leading-relaxed">
              Présence dans tous les aéroports clés et centres-villes pour une flexibilité maximale de prise et restitution.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center shrink-0">
            <Clock className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-brand-blue dark:text-white text-sm">Prise en Charge Rapide</h3>
            <p className="text-xs text-brand-blue/60 dark:text-white/60 mt-1 leading-relaxed">
              Moins de 10 minutes d'attente. Votre voiture est prête à votre arrivée avec des contrats pré-remplis en ligne.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center shrink-0">
            <Shield className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-brand-blue dark:text-white text-sm">Assistance 24/7 de Proximité</h3>
            <p className="text-xs text-brand-blue/60 dark:text-white/60 mt-1 leading-relaxed">
              En cas d'aléa routier, notre agence la plus proche intervient immédiatement pour vous dépanner ou remplacer le véhicule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

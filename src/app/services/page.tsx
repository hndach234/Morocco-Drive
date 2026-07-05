import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  CalendarRange,
  Briefcase,
  Users,
  PlaneTakeoff,
  Award,
  ShieldCheck,
  CheckCircle2,
  Phone
} from "lucide-react";

export const metadata = {
  title: "Nos Services Premium - Morocco Drive",
  description: "Découvrez nos solutions de location sur mesure au Maroc : courte durée, longue durée, transferts aéroport, location avec chauffeur et offres VIP.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: <CalendarRange className="w-8 h-8 text-brand-orange" />,
      title: "Location Courte Durée",
      desc: "Idéal pour vos vacances ou vos déplacements ponctuels au Maroc. Profitez de tarifs compétitifs dégressifs à partir de 3 jours.",
      features: [
        "Kilométrage illimité (à partir de 7 jours)",
        "Assistance routière 24h/24 & 7j/7",
        "Deuxième conducteur gratuit (selon offres)",
        "Modification & annulation flexibles"
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8 text-brand-orange" />,
      title: "Location Longue Durée (LLD)",
      desc: "Destiné aux entreprises et aux professionnels résidents. Externalisez la gestion de votre flotte et optimisez vos coûts mensuels.",
      features: [
        "Véhicule neuf configuré selon vos besoins",
        "Entretien, pneumatiques & réparations inclus",
        "Véhicule de remplacement équivalent garanti",
        "Avantages fiscaux (loyers déductibles)"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-brand-orange" />,
      title: "Location avec Chauffeur",
      desc: "Voyagez en toute sérénité sans le stress de la conduite. Nos chauffeurs professionnels multilingues et discrets prennent le volant.",
      features: [
        "Chauffeurs professionnels certifiés",
        "Disponibilité horaire personnalisée",
        "Parfaite connaissance du réseau routier",
        "Idéal pour délégations VIP et mariages"
      ]
    },
    {
      icon: <PlaneTakeoff className="w-8 h-8 text-brand-orange" />,
      title: "Transferts Aéroports",
      desc: "Simplifiez vos arrivées et vos départs du Maroc. Nous assurons la liaison directe depuis et vers les principaux aéroports du Royaume.",
      features: [
        "Accueil personnalisé avec pancarte",
        "Suivi en temps réel de votre vol",
        "Prise en charge des bagages",
        "Liaison directe vers votre hôtel ou bureau"
      ]
    },
    {
      icon: <Award className="w-8 h-8 text-brand-orange" />,
      title: "Service Prestige & VIP",
      desc: "Bénéficiez d'une expérience haut de gamme sur mesure avec nos véhicules de luxe de dernière génération et une conciergerie dédiée.",
      features: [
        "Flotte exclusive (Mercedes G63, Range Sport)",
        "Livraison du véhicule sur le lieu de votre choix",
        "Agent d'accueil dédié personnalisé",
        "Confidentialité et discrétion absolues"
      ]
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-orange" />,
      title: "Gestion de Flotte Corporate",
      desc: "Une solution globale pour rationaliser la mobilité de vos collaborateurs et assurer la continuité de votre activité.",
      features: [
        "Contrats modulables de 12 à 48 mois",
        "Facturation centralisée simplifiée",
        "Suivi télématique et reporting (option)",
        "Support client grands comptes dédié"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "Services" }]} />

      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Solutions de Mobilité</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white mt-2">
          Nos Services de Location Premium
        </h1>
        <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        <p className="text-sm sm:text-base text-brand-blue/60 dark:text-white/60 mt-4 leading-relaxed">
          Que vous soyez un touriste à la recherche d'aventure, un professionnel pressé ou une entreprise désireuse de structurer sa flotte, Morocco Drive propose des formules adaptées à chaque besoin.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-brand-blue/5 dark:bg-white/5 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h2 className="text-xl font-bold text-brand-blue dark:text-white mb-3">
                {service.title}
              </h2>
              <p className="text-sm text-brand-blue/70 dark:text-white/70 leading-relaxed mb-6">
                {service.desc}
              </p>
              
              <ul className="space-y-2.5 mb-8">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-brand-blue/80 dark:text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/flotte"
              className="w-full text-center bg-brand-blue hover:bg-brand-blue-light dark:bg-white/5 dark:hover:bg-white/10 text-white font-bold text-xs py-3 rounded-xl transition-all border border-transparent dark:border-white/10"
            >
              Découvrir les Véhicules Assosiés
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-brand-blue text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Besoin d'un service sur mesure ?</h2>
            <p className="text-sm sm:text-base text-white/80 mt-3 leading-relaxed">
              Nos agents de conciergerie sont à votre entière disposition pour concevoir des offres spéciales adaptées à vos exigences de déplacement spécifiques.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            <Link
              href="/contact"
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold px-8 py-3.5 rounded-xl text-center shadow-lg transition-colors"
            >
              Demander un Devis Personnalisé
            </Link>
            
            <a
              href="tel:+212522010203"
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3.5 rounded-xl font-bold transition-all text-center"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              <span>Nous Appeler</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

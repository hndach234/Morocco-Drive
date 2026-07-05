import Image from "next/image";
import { Breadcrumb } from "@/components/breadcrumb";
import { Check, Shield, Award, Users2, Sparkles, MapPin } from "lucide-react";

export const metadata = {
  title: "À Propos - Morocco Drive",
  description: "Découvrez l'histoire de Morocco Drive, notre engagement pour l'excellence et nos valeurs fondamentales pour la location de voitures premium au Maroc.",
};

export default function AboutPage() {
  const stats = [
    { value: "10+", label: "Années d'expérience" },
    { value: "22+", label: "Modèles premium" },
    { value: "8", label: "Agences à travers le pays" },
    { value: "50k+", label: "Clients satisfaits" },
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6 text-brand-orange" />,
      title: "Sécurité & Fiabilité",
      desc: "Nous appliquons des protocoles d'entretien rigoureux. Chaque véhicule est minutieusement nettoyé et inspecté avant chaque départ."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-orange" />,
      title: "Service Premium",
      desc: "De la bouteille d'eau offerte à la prise en charge personnalisée à l'aéroport, nous soignons chaque détail pour votre confort."
    },
    {
      icon: <Users2 className="w-6 h-6 text-brand-orange" />,
      title: "Transparence Totale",
      desc: "Aucune surprise à la facturation. Tous nos tarifs incluent l'assurance tiers et les taxes obligatoires, sans frais cachés."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "À propos" }]} />

      {/* Intro Hero Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Qui Sommes-Nous</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue dark:text-white mt-2 leading-tight">
            Morocco Drive : L'Art du Voyage Premium
          </h1>
          <div className="w-16 h-1 bg-brand-orange mt-4 mb-6 rounded-full" />
          <p className="text-sm sm:text-base text-brand-blue/70 dark:text-white/70 leading-relaxed mb-4">
            Fondée avec la volonté de révolutionner la location de voitures au Maroc, Morocco Drive s'est rapidement imposée comme la référence du service haut de gamme dans le Royaume. Nous pensons que le voyage commence dès la remise des clés.
          </p>
          <p className="text-sm sm:text-base text-brand-blue/70 dark:text-white/70 leading-relaxed">
            Que vous voyagiez pour affaires à Casablanca, pour le plaisir dans les ruelles bleues de Chefchaouen ou pour l'aventure dans le désert de Merzouga, nous mettons à votre disposition le véhicule idéal allié à un service client irréprochable.
          </p>
        </div>
        <div className="relative h-80 sm:h-[400px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"
            alt="Marrakech driving Morocco Drive"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-brand-blue text-white rounded-3xl p-8 sm:p-12 mb-20 relative overflow-hidden shadow-xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-3xl sm:text-5xl font-extrabold text-brand-orange">{stat.value}</p>
              <p className="text-xs sm:text-sm text-white/70 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Nos Valeurs</span>
          <h2 className="text-3xl font-extrabold text-brand-blue dark:text-white mt-2">Ce Qui Nous Anime</h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-2xl shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-blue dark:text-white mb-2">{val.title}</h3>
              <p className="text-xs sm:text-sm text-brand-blue/70 dark:text-white/70 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Commitment details */}
      <div className="bg-brand-blue/5 dark:bg-white/[0.02] border border-light-border dark:border-white/5 rounded-3xl p-8 sm:p-12 mb-10 flex flex-col lg:flex-row items-center gap-10">
        <div className="space-y-4 lg:w-2/3">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Notre Engagement de Mobilité</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue dark:text-white">Charte Qualité Morocco Drive</h2>
          <p className="text-xs sm:text-sm text-brand-blue/70 dark:text-white/70 leading-relaxed">
            Louer un véhicule doit être simple et agréable. C'est pourquoi nous garantissons une transparence tarifaire absolue et un nettoyage approfondi. Nos voitures font l'objet d'une vérification mécanique complète à chaque retour de location pour assurer votre sécurité sur les routes du Maroc.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {[
              "Contrat de location digital simplifié",
              "Carburant fourni selon politique équitable",
              "Sièges enfants et GPS nettoyés individuellement",
              "Remplacement immédiat en cas de panne"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-brand-blue/80 dark:text-white/80">
                <Check className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-1/3 h-52 sm:h-64 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600"
            alt="Premium Range Rover Evoque Morocco Drive"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

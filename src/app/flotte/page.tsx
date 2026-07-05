import { Suspense } from "react";
import FleetClient from "./fleet-client";

export const metadata = {
  title: "Notre Flotte Automobile - Morocco Drive",
  description: "Parcourez notre flotte de plus de 20 véhicules disponibles à la location au Maroc : Dacia Logan, Renault Clio, Peugeot 208, VW Golf, Mercedes Classe C, Range Rover, etc.",
};

export default function FlottePage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-brand-blue/70 dark:text-white/70">Chargement de la flotte...</p>
      </div>
    }>
      <FleetClient />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import agenciesData from "../../../data/agencies.json";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSent(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Reset Form
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    
    // Auto reset success screen after 8s
    setTimeout(() => setIsSent(false), 8000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "Contact" }]} />

      <div className="text-center sm:text-left mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white">
          Contactez Notre Équipe
        </h1>
        <p className="text-sm sm:text-base text-brand-blue/60 dark:text-white/60 mt-2">
          Nous sommes à votre disposition pour répondre à toutes vos questions 24h/24.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        {/* Contact info column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-brand-blue dark:text-white border-b border-light-border dark:border-white/5 pb-2">
              Morocco Drive Support
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0 text-brand-orange">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-brand-blue/50 dark:text-white/50 uppercase">Téléphone (Assistance)</h3>
                  <p className="text-sm font-bold text-brand-blue dark:text-white mt-0.5">+212 522 010 203</p>
                  <p className="text-[10px] text-brand-blue/40 dark:text-white/40">Disponible 24h/24, 7j/7</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0 text-brand-orange">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-brand-blue/50 dark:text-white/50 uppercase">Email</h3>
                  <p className="text-sm font-bold text-brand-blue dark:text-white mt-0.5">contact@moroccodrive.com</p>
                  <p className="text-[10px] text-brand-blue/40 dark:text-white/40">Réponse sous 2 heures</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0 text-brand-orange">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-brand-blue/50 dark:text-white/50 uppercase">Siège Social</h3>
                  <p className="text-sm font-bold text-brand-blue dark:text-white mt-0.5">Aéroport Mohammed V, Casablanca, Maroc</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0 text-brand-orange">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-brand-blue/50 dark:text-white/50 uppercase">Horaires d'ouverture</h3>
                  <p className="text-xs font-semibold text-brand-blue/80 dark:text-white/80 mt-0.5">Aéroports : 24h/24 & 7j/7</p>
                  <p className="text-xs font-semibold text-brand-blue/80 dark:text-white/80">Bureaux ville : 08:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick list of other agencies phones */}
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-brand-blue dark:text-white mb-4 border-b border-light-border dark:border-white/5 pb-2">
              Lignes Directes Agences
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {agenciesData.map(a => (
                <div key={a.id} className="space-y-0.5">
                  <p className="font-bold text-brand-blue dark:text-white">{a.city}</p>
                  <p className="text-[10px] text-brand-blue/50 dark:text-white/50">{a.phone.replace("+212 ", "0")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 sm:p-8 rounded-2xl shadow-sm">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-brand-blue dark:text-white">Envoyez-nous un Message</h2>
              <p className="text-xs text-brand-blue/60 dark:text-white/60">Remplissez le formulaire ci-dessous, notre équipe commerciale vous répondra rapidement.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Nom Complet</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Numéro de Téléphone</label>
                  <input
                    type="tel"
                    placeholder="Ex: 06 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Adresse Email</label>
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Objet de la Demande</label>
                <input
                  type="text"
                  placeholder="Ex: Demande de tarif de groupe, information LLD..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Votre Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Rédigez votre demande ici..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-brand-orange resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer text-sm"
              >
                <span>Envoyer le Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-blue dark:text-white">Message Envoyé !</h2>
              <p className="text-sm sm:text-base text-brand-blue/70 dark:text-white/70 max-w-md mx-auto mt-4 leading-relaxed">
                Merci ! Votre message a été envoyé avec succès. Notre équipe vous recontactera sous 2 heures.
              </p>
              
              <div className="mt-8 p-4 bg-brand-blue/5 dark:bg-white/5 border border-light-border dark:border-white/5 rounded-xl text-left text-xs max-w-md w-full">
                <p className="text-brand-orange font-bold text-center mb-1">Informations de démonstration</p>
                <p className="text-center text-[10px] text-brand-blue/50 dark:text-white/50">Aucune donnée n'a été enregistrée sur le serveur.</p>
              </div>

              <button
                onClick={() => setIsSent(false)}
                className="mt-8 bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Envoyer un nouveau message
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

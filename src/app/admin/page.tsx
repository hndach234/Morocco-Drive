"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Car,
  CalendarDays,
  Users,
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2,
  X,
  FileText,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import carsData from "../../../data/cars.json";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"stats" | "cars" | "bookings" | "clients" | "payments">("stats");

  // Simulated state initialized from JSON or mock data
  const [cars, setCars] = useState(carsData.slice(0, 10)); // Use first 10 for dashboard size
  const [bookings, setBookings] = useState([
    { id: "RES-4091", client: "Youssef El Amrani", car: "Peugeot 208", start: "2026-07-06", end: "2026-07-10", total: 1280, status: "Confirmée" },
    { id: "RES-4092", client: "Sarah Miller", car: "Range Rover Evoque", start: "2026-07-08", end: "2026-07-15", total: 7700, status: "En attente" },
    { id: "RES-4093", client: "Karim Bennani", car: "Mercedes Classe C", start: "2026-07-10", end: "2026-07-12", total: 2800, status: "Confirmée" },
    { id: "RES-4094", client: "Amina Mansouri", car: "Dacia Logan", start: "2026-07-12", end: "2026-07-15", total: 750, status: "Terminée" },
    { id: "RES-4095", client: "David Dubois", car: "Dacia Duster", start: "2026-07-15", end: "2026-07-22", total: 2800, status: "Annulée" }
  ]);
  const [clients, setClients] = useState([
    { id: "CLI-001", name: "Youssef El Amrani", email: "youssef@example.com", phone: "+212 661 23 45 67", rentals: 5, status: "Actif" },
    { id: "CLI-002", name: "Sarah Miller", email: "sarah.m@gmail.com", phone: "+1 415 889 2211", rentals: 1, status: "Actif" },
    { id: "CLI-003", name: "Karim Bennani", email: "bennani.karim@net.ma", phone: "+212 662 98 76 54", rentals: 12, status: "Premium" },
    { id: "CLI-004", name: "Amina Mansouri", email: "amina.m@outlook.com", phone: "+212 522 11 22 33", rentals: 3, status: "Actif" },
    { id: "CLI-005", name: "Jean Dupont", email: "j.dupont@yahoo.fr", phone: "+33 6 12 34 56 78", rentals: 0, status: "Inactif" }
  ]);
  const [payments, setPayments] = useState([
    { id: "PAY-9011", client: "Youssef El Amrani", amount: 1280, date: "2026-07-05", method: "Carte Bancaire", status: "Réussi" },
    { id: "PAY-9012", client: "Karim Bennani", amount: 2800, date: "2026-07-05", method: "Carte Bancaire", status: "Réussi" },
    { id: "PAY-9013", client: "Amina Mansouri", amount: 750, date: "2026-07-04", method: "Espèces (Agence)", status: "Réussi" },
    { id: "PAY-9014", client: "Sarah Miller", amount: 7700, date: "2026-07-03", method: "Apple Pay", status: "En cours" },
    { id: "PAY-9015", client: "David Dubois", amount: 2800, date: "2026-07-02", method: "Carte Bancaire", status: "Remboursé" }
  ]);

  // Modal States
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(null);
  const [targetEntity, setTargetEntity] = useState<"car" | "booking" | "client" | "payment" | null>(null);
  
  // Selected item id for edit/delete
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Form Fields State
  const [carForm, setCarForm] = useState({ make: "", model: "", category: "economique", price: 300, transmission: "Manuelle", fuel: "Diesel" });
  const [bookingForm, setBookingForm] = useState({ client: "", car: "", start: "", end: "", total: 0, status: "Confirmée" });
  const [clientForm, setClientForm] = useState({ name: "", email: "", phone: "", status: "Actif" });
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Modal actions handlers
  const handleOpenAdd = (entity: "car" | "booking" | "client") => {
    setTargetEntity(entity);
    setModalType("add");
    // Clear forms
    setCarForm({ make: "", model: "", category: "economique", price: 300, transmission: "Manuelle", fuel: "Diesel" });
    setBookingForm({ client: "", car: "", start: "", end: "", total: 0, status: "Confirmée" });
    setClientForm({ name: "", email: "", phone: "", status: "Actif" });
  };

  const handleOpenEdit = (entity: "car" | "booking" | "client", item: any) => {
    setTargetEntity(entity);
    setModalType("edit");
    setSelectedItemId(item.id);
    if (entity === "car") {
      setCarForm({ make: item.make, model: item.model, category: item.category, price: item.price, transmission: item.transmission, fuel: item.fuel });
    } else if (entity === "booking") {
      setBookingForm({ client: item.client, car: item.car, start: item.start, end: item.end, total: item.total, status: item.status });
    } else if (entity === "client") {
      setClientForm({ name: item.name, email: item.email, phone: item.phone, status: item.status });
    }
  };

  const handleOpenDelete = (entity: "car" | "booking" | "client" | "payment", itemId: string) => {
    setTargetEntity(entity);
    setModalType("delete");
    setSelectedItemId(itemId);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "add") {
      if (targetEntity === "car") {
        const newCar = {
          id: `car-${Date.now()}`,
          make: carForm.make,
          model: carForm.model,
          category: carForm.category,
          price: Number(carForm.price),
          transmission: carForm.transmission,
          fuel: carForm.fuel,
          image: "https://images.unsplash.com/photo-1606225457115-9b0de873c5db?auto=format&fit=crop&q=80&w=600",
          seats: 5, doors: 5, luggage: 2, engine: "1.6 dCi", consumption: "4.5L", features: ["Climatisation"], agencyIds: ["casablanca"], rating: 5.0, reviewsCount: 0, isPopular: false
        };
        setCars([newCar, ...cars]);
        triggerNotification(`Le véhicule ${carForm.make} ${carForm.model} a été ajouté avec succès (Simulation).`);
      } else if (targetEntity === "booking") {
        const newBooking = {
          id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
          client: bookingForm.client,
          car: bookingForm.car,
          start: bookingForm.start,
          end: bookingForm.end,
          total: Number(bookingForm.total),
          status: bookingForm.status
        };
        setBookings([newBooking, ...bookings]);
        triggerNotification(`La réservation pour ${bookingForm.client} a été ajoutée (Simulation).`);
      } else if (targetEntity === "client") {
        const newClient = {
          id: `CLI-${Math.floor(100 + Math.random() * 900)}`,
          name: clientForm.name,
          email: clientForm.email,
          phone: clientForm.phone,
          rentals: 0,
          status: clientForm.status
        };
        setClients([newClient, ...clients]);
        triggerNotification(`Le client ${clientForm.name} a été enregistré (Simulation).`);
      }
    } else if (modalType === "edit") {
      if (targetEntity === "car") {
        setCars(cars.map(c => c.id === selectedItemId ? { ...c, ...carForm, price: Number(carForm.price) } : c));
        triggerNotification("Modifications du véhicule enregistrées avec succès (Simulation).");
      } else if (targetEntity === "booking") {
        setBookings(bookings.map(b => b.id === selectedItemId ? { ...b, ...bookingForm, total: Number(bookingForm.total) } : b));
        triggerNotification("Réservation modifiée avec succès (Simulation).");
      } else if (targetEntity === "client") {
        setClients(clients.map(c => c.id === selectedItemId ? { ...c, ...clientForm } : c));
        triggerNotification("Profil client mis à jour avec succès (Simulation).");
      }
    }
    setModalType(null);
  };

  const handleDeleteConfirm = () => {
    if (targetEntity === "car") {
      setCars(cars.filter(c => c.id !== selectedItemId));
      triggerNotification("Véhicule supprimé de la liste (Simulation).");
    } else if (targetEntity === "booking") {
      setBookings(bookings.filter(b => b.id !== selectedItemId));
      triggerNotification("Réservation supprimée (Simulation).");
    } else if (targetEntity === "client") {
      setClients(clients.filter(c => c.id !== selectedItemId));
      triggerNotification("Client supprimé (Simulation).");
    } else if (targetEntity === "payment") {
      setPayments(payments.filter(p => p.id !== selectedItemId));
      triggerNotification("Transaction archivée (Simulation).");
    }
    setModalType(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "Administration" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-blue dark:text-white">
            Dashboard d'Administration
          </h1>
          <p className="text-sm text-brand-blue/60 dark:text-white/60 mt-1">
            Console de gestion et statistiques de Morocco Drive (Mode Visualisation).
          </p>
        </div>
        <div className="mt-4 sm:mt-0 bg-brand-orange/15 text-brand-orange border border-brand-orange/20 text-xs font-bold py-1.5 px-3.5 rounded-full flex items-center space-x-1.5">
          <AlertCircle className="w-4 h-4" />
          <span>Démonstration client</span>
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-brand-blue dark:bg-brand-orange text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl shadow-xl flex items-center space-x-2 border border-white/10"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs */}
      <div className="flex space-x-1.5 border-b border-light-border dark:border-dark-border mb-8 overflow-x-auto pb-1">
        {[
          { id: "stats", label: "Statistiques", icon: <BarChart3 className="w-4 h-4" /> },
          { id: "cars", label: "Véhicules", icon: <Car className="w-4 h-4" /> },
          { id: "bookings", label: "Réservations", icon: <CalendarDays className="w-4 h-4" /> },
          { id: "clients", label: "Clients", icon: <Users className="w-4 h-4" /> },
          { id: "payments", label: "Paiements", icon: <CreditCard className="w-4 h-4" /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-brand-blue/60 dark:text-white/60 hover:text-brand-orange"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panels */}
      {/* 1. STATS TAB */}
      {activeTab === "stats" && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Revenus Mensuels", value: "142 500 DH", trend: "+12.4%", icon: <DollarSign className="w-5 h-5" /> },
              { label: "Réservations Actives", value: "48", trend: "+8.1%", icon: <CalendarDays className="w-5 h-5" /> },
              { label: "Taux Flotte Louée", value: "82 %", trend: "+4.5%", icon: <TrendingUp className="w-5 h-5" /> },
              { label: "Nouveaux Clients", value: "124", trend: "+18.9%", icon: <Users className="w-5 h-5" /> }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-5 rounded-2xl shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-bold text-brand-blue/50 dark:text-white/50 uppercase">{stat.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-blue dark:text-white">{stat.value}</h3>
                  <span className="text-[10px] text-green-500 font-extrabold mt-1 block">{stat.trend} ce mois</span>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Chart and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-sm">
              <h2 className="text-base font-bold text-brand-blue dark:text-white mb-6">Simulation du Chiffre d'Affaires hebdomadaire</h2>
              <div className="flex items-end justify-between h-48 pt-6 border-b border-light-border dark:border-white/10 px-4">
                {[
                  { day: "Lun", val: "45%", dh: "12k" },
                  { day: "Mar", val: "60%", dh: "16k" },
                  { day: "Mer", val: "55%", dh: "15k" },
                  { day: "Jeu", val: "75%", dh: "22k" },
                  { day: "Ven", val: "90%", dh: "28k" },
                  { day: "Sam", val: "95%", dh: "32k" },
                  { day: "Dim", val: "85%", dh: "25k" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center space-y-2 w-1/8 group">
                    <span className="text-[9px] text-brand-orange opacity-0 group-hover:opacity-100 font-bold transition-opacity">{item.dh}</span>
                    <div
                      style={{ height: item.val }}
                      className="w-8 sm:w-10 bg-brand-blue dark:bg-brand-orange rounded-t-md hover:bg-brand-orange transition-all duration-300"
                    />
                    <span className="text-[10px] text-brand-blue/50 dark:text-white/50 font-bold">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activites */}
            <div className="lg:col-span-1 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-sm">
              <h2 className="text-base font-bold text-brand-blue dark:text-white mb-6 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>Activités Récentes</span>
              </h2>

              <div className="space-y-4">
                {[
                  { text: "Nouvelle réservation RES-4092 par Sarah M.", time: "il y a 5 min", type: "booking" },
                  { text: "Paiement PAY-9011 réussi pour 1280 DH", time: "il y a 15 min", type: "payment" },
                  { text: "Nouveau client Youssef El A. inscrit", time: "il y a 1h", type: "client" },
                  { text: "Voiture Peugeot 208 marquée comme Disponible", time: "il y a 2h", type: "car" }
                ].map((act, i) => (
                  <div key={i} className="flex items-start space-x-3 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                    <div>
                      <p className="font-semibold text-brand-blue/80 dark:text-white/80">{act.text}</p>
                      <span className="text-[10px] text-brand-blue/40 dark:text-white/40">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VEHICULES TAB */}
      {activeTab === "cars" && (
        <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-light-border dark:border-white/10 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-base font-bold text-brand-blue dark:text-white">Liste des Voitures</h2>
            <button
              onClick={() => handleOpenAdd("car")}
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une Voiture</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-light-bg dark:bg-white/5 text-brand-blue/60 dark:text-white/60 font-bold uppercase border-b border-light-border dark:border-white/5">
                  <th className="p-4">Voiture</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Tarif journalier</th>
                  <th className="p-4">Transmission</th>
                  <th className="p-4">Carburant</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-white/5 text-brand-blue dark:text-white font-semibold">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-brand-blue/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="p-4 flex items-center space-x-3">
                      <div className="relative w-10 h-8 rounded overflow-hidden bg-zinc-100 shrink-0">
                        <img src={car.image} alt={car.model} className="object-cover w-full h-full" />
                      </div>
                      <span>{car.make} {car.model}</span>
                    </td>
                    <td className="p-4 capitalize">{car.category}</td>
                    <td className="p-4 text-brand-orange font-extrabold">{car.price} DH</td>
                    <td className="p-4">{car.transmission}</td>
                    <td className="p-4">{car.fuel}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit("car", car)}
                        className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-white/10 text-brand-blue/60 dark:text-white/60 hover:text-brand-orange cursor-pointer"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete("car", car.id)}
                        className="p-1.5 rounded hover:bg-red-500/10 text-brand-blue/60 dark:text-white/60 hover:text-red-500 cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. RESERVATIONS TAB */}
      {activeTab === "bookings" && (
        <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-light-border dark:border-white/10 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-base font-bold text-brand-blue dark:text-white">Liste des Réservations</h2>
            <button
              onClick={() => handleOpenAdd("booking")}
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Créer une Réservation</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-light-bg dark:bg-white/5 text-brand-blue/60 dark:text-white/60 font-bold uppercase border-b border-light-border dark:border-white/5">
                  <th className="p-4">Réf</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Véhicule</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-white/5 text-brand-blue dark:text-white font-semibold">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-brand-blue/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="p-4 text-brand-orange font-bold">{booking.id}</td>
                    <td className="p-4">{booking.client}</td>
                    <td className="p-4">{booking.car}</td>
                    <td className="p-4">{booking.start} au {booking.end}</td>
                    <td className="p-4 text-brand-orange font-extrabold">{booking.total} DH</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        booking.status === "Confirmée" || booking.status === "Terminée"
                          ? "bg-green-500/10 text-green-500"
                          : booking.status === "En attente"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit("booking", booking)}
                        className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-white/10 text-brand-blue/60 dark:text-white/60 hover:text-brand-orange cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete("booking", booking.id)}
                        className="p-1.5 rounded hover:bg-red-500/10 text-brand-blue/60 dark:text-white/60 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. CLIENTS TAB */}
      {activeTab === "clients" && (
        <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-light-border dark:border-white/10 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-base font-bold text-brand-blue dark:text-white">Fichier Clients</h2>
            <button
              onClick={() => handleOpenAdd("client")}
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nouveau Client</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-light-bg dark:bg-white/5 text-brand-blue/60 dark:text-white/60 font-bold uppercase border-b border-light-border dark:border-white/5">
                  <th className="p-4">Réf ID</th>
                  <th className="p-4">Nom complet</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Téléphone</th>
                  <th className="p-4">Locations faites</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-white/5 text-brand-blue dark:text-white font-semibold">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-brand-blue/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="p-4 font-mono">{client.id}</td>
                    <td className="p-4">{client.name}</td>
                    <td className="p-4">{client.email}</td>
                    <td className="p-4">{client.phone}</td>
                    <td className="p-4 text-center">{client.rentals}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        client.status === "Premium"
                          ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                          : client.status === "Actif"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-zinc-500/10 text-zinc-500"
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit("client", client)}
                        className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-white/10 text-brand-blue/60 dark:text-white/60 hover:text-brand-orange cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete("client", client.id)}
                        className="p-1.5 rounded hover:bg-red-500/10 text-brand-blue/60 dark:text-white/60 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. PAYEMENTS TAB */}
      {activeTab === "payments" && (
        <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-light-border dark:border-white/10 flex items-center justify-between">
            <h2 className="text-base font-bold text-brand-blue dark:text-white">Historique des Transactions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-light-bg dark:bg-white/5 text-brand-blue/60 dark:text-white/60 font-bold uppercase border-b border-light-border dark:border-white/5">
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Montant</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Mode de paiement</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Archiver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-white/5 text-brand-blue dark:text-white font-semibold">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-brand-blue/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="p-4 font-mono text-brand-orange">{pay.id}</td>
                    <td className="p-4">{pay.client}</td>
                    <td className="p-4 font-extrabold text-brand-blue dark:text-white">{pay.amount} DH</td>
                    <td className="p-4">{pay.date}</td>
                    <td className="p-4">{pay.method}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pay.status === "Réussi"
                          ? "bg-green-500/10 text-green-500"
                          : pay.status === "En cours"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-zinc-500/10 text-zinc-500"
                      }`}>
                        {pay.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenDelete("payment", pay.id)}
                        className="p-1.5 rounded hover:bg-red-500/10 text-brand-blue/60 dark:text-white/60 hover:text-red-500 cursor-pointer"
                        title="Archiver"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CRUD simulation Modals (Add / Edit / Delete) */}
      <AnimatePresence>
        {modalType && targetEntity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm fixed"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 text-brand-blue/60 dark:text-white/60 hover:text-brand-orange cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* DELETE CONFIRMATION MODAL */}
              {modalType === "delete" ? (
                <div className="text-center space-y-4 pt-2">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto border border-red-500/20">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">Confirmer la suppression</h3>
                  <p className="text-xs sm:text-sm text-brand-blue/70 dark:text-white/70 leading-relaxed">
                    Voulez-vous vraiment supprimer cet élément ({selectedItemId}) ? Cette action simulée mettra à jour la liste active sans persister sur disque.
                  </p>
                  <div className="flex space-x-3 pt-4 justify-center">
                    <button
                      onClick={() => setModalType(null)}
                      className="bg-light-bg dark:bg-white/5 border border-light-border dark:border-white/10 text-brand-blue dark:text-white font-bold text-xs py-2.5 px-5 rounded-lg cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-2.5 px-5 rounded-lg cursor-pointer"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ) : (
                /* ADD / EDIT FORM MODALS */
                <form onSubmit={handleSave} className="space-y-4">
                  <h3 className="text-lg font-extrabold text-brand-blue dark:text-white">
                    {modalType === "add" ? "Ajouter" : "Modifier"} -{" "}
                    {targetEntity === "car" ? "Véhicule" : targetEntity === "booking" ? "Réservation" : "Client"}
                  </h3>
                  
                  {/* Car Form Fields */}
                  {targetEntity === "car" && (
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Marque</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Peugeot"
                          value={carForm.make}
                          onChange={(e) => setCarForm({ ...carForm, make: e.target.value })}
                          className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs text-brand-blue dark:text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Modèle</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: 208"
                          value={carForm.model}
                          onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                          className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs text-brand-blue dark:text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Tarif / jour (DH)</label>
                          <input
                            type="number"
                            required
                            value={carForm.price}
                            onChange={(e) => setCarForm({ ...carForm, price: Number(e.target.value) })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs text-brand-blue dark:text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Catégorie</label>
                          <select
                            value={carForm.category}
                            onChange={(e) => setCarForm({ ...carForm, category: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs text-brand-blue dark:text-white focus:outline-none focus:border-brand-orange"
                          >
                            <option value="economique">Économique</option>
                            <option value="berline">Berline</option>
                            <option value="suv">SUV</option>
                            <option value="luxe">Luxe & Sport</option>
                            <option value="4x4">4x4 Tout-Terrain</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Transmission</label>
                          <select
                            value={carForm.transmission}
                            onChange={(e) => setCarForm({ ...carForm, transmission: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs text-brand-blue dark:text-white focus:outline-none"
                          >
                            <option value="Manuelle">Manuelle</option>
                            <option value="Automatique">Automatique</option>
                          </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Carburant</label>
                          <select
                            value={carForm.fuel}
                            onChange={(e) => setCarForm({ ...carForm, fuel: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs text-brand-blue dark:text-white focus:outline-none"
                          >
                            <option value="Diesel">Diesel</option>
                            <option value="Essence">Essence</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Booking Form Fields */}
                  {targetEntity === "booking" && (
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Client</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.client}
                          onChange={(e) => setBookingForm({ ...bookingForm, client: e.target.value })}
                          className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Véhicule</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.car}
                          onChange={(e) => setBookingForm({ ...bookingForm, car: e.target.value })}
                          className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Montant total (DH)</label>
                          <input
                            type="number"
                            required
                            value={bookingForm.total}
                            onChange={(e) => setBookingForm({ ...bookingForm, total: Number(e.target.value) })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Statut</label>
                          <select
                            value={bookingForm.status}
                            onChange={(e) => setBookingForm({ ...bookingForm, status: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none"
                          >
                            <option value="Confirmée">Confirmée</option>
                            <option value="En attente">En attente</option>
                            <option value="Terminée">Terminée</option>
                            <option value="Annulée">Annulée</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Début</label>
                          <input
                            type="date"
                            required
                            value={bookingForm.start}
                            onChange={(e) => setBookingForm({ ...bookingForm, start: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-1.5 px-3 text-xs focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Fin</label>
                          <input
                            type="date"
                            required
                            value={bookingForm.end}
                            onChange={(e) => setBookingForm({ ...bookingForm, end: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-1.5 px-3 text-xs focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Client Form Fields */}
                  {targetEntity === "client" && (
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Nom Complet</label>
                        <input
                          type="text"
                          required
                          value={clientForm.name}
                          onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                          className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Email</label>
                        <input
                          type="email"
                          required
                          value={clientForm.email}
                          onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                          className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Téléphone</label>
                          <input
                            type="text"
                            required
                            value={clientForm.phone}
                            onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-xs font-bold text-brand-blue/70 dark:text-white/70">Statut</label>
                          <select
                            value={clientForm.status}
                            onChange={(e) => setClientForm({ ...clientForm, status: e.target.value })}
                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl py-2 px-3 text-xs focus:outline-none"
                          >
                            <option value="Actif">Actif</option>
                            <option value="Premium">Premium</option>
                            <option value="Inactif">Inactif</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setModalType(null)}
                      className="bg-light-bg dark:bg-white/5 border border-light-border dark:border-white/10 text-brand-blue dark:text-white font-bold text-xs py-2.5 px-5 rounded-lg cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-xs py-2.5 px-6 rounded-lg cursor-pointer"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

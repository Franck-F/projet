import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Sparkles, ArrowRight, FileSpreadsheet, FileText, Presentation, Bot, BookOpen } from "lucide-react";

export const Landing = (): JSX.Element => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col xl:min-h-screen xl:h-screen xl:w-screen">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -top-40 -right-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl animate-pulse animation-delay-2000" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-pink-600/10 blur-3xl animate-pulse animation-delay-4000" />

      <header className="relative z-10 border-b border-gray-800/70">
        <div className="w-4/5 mx-auto px-4 sm:px-6 py-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 lg:h-12 lg:w-12 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300">
              <Sparkles className="h-5 w-5 lg:h-7 lg:w-7" />
            </span>
            <span className="text-lg lg:text-2xl font-semibold tracking-tight">Votre Assistant Documentaire IA</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-gray-300">
            <Link to="/help" className="hover:text-white transition-colors lg:text-2xl">Aide</Link>
            <a href="https://notebooklm.google.com/notebook/b935055c-463b-4fc4-b680-056da3cd341f" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors lg:text-2xl">
              <BookOpen className="h-4 w-4 lg:h-7 lg:w-7" />
              Synthèse documentaire
            </a>
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white">
              <Link to="/app" className="inline-flex items-center gap-2 lg:text-2xl">
                Commencer
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1 min-h-0 flex items-stretch xl:h-full xl:w-full">
        {/* Hero */}
        <section className="w-4/5 h-full px-4 sm:px-6 py-10 sm:py-12 flex items-center mx-auto xl:h-full xl:w-4/5">
          <div className="w-full h-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center xl:w-full xl:h-full">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-base sm:text-lg lg:text-3xl">
                <Sparkles className="h-4 w-4" />
                Plate‑forme IA pour les documents
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
                Travaillez plus vite avec vos PDF, rapports et présentations
              </h1>
              <p className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl lg:py-9 text-gray-300 leading-7 max-w-2xl">
                Extrayez des tableaux, générez des rapports et des présentations, et interrogez vos fichiers avec un chatbot documentaire.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="lg:h-20 lg:w-80  px-6 bg-blue-600 hover:bg-blue-500 text-white text-base lg:text-lg xl:text-xl">
                  <Link to="/app" className="inline-flex items-center gap-2">Commencer <ArrowRight className="h-8 w-8" /></Link>
                </Button>
                <Button asChild variant="outline" className="lg:h-20 lg:w-70 px-6 border-gray-700 bg-gray-900 hover:bg-gray-800 text-gray-200 text-base lg:text-lg xl:text-xl">
                  <Link to="/help">Documentation</Link>
                </Button>
              </div>
              {/* Compact value props row */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <span className="inline-flex items-center gap-2 rounded-[5vh] border border-gray-700 bg-gray-800/60 px-5 py-2 sm:text-base lg:text-lg">
                  <span className="h-5 w-5  rounded-full bg-blue-400" /> Rapide
                </span>
                <span className="inline-flex items-center gap-2 rounded-[5vh] border border-gray-700 bg-gray-800/60 px-5 py-2 sm:text-base lg:text-lg">
                  <span className="h-5 w-5 rounded-full bg-emerald-400" /> Précis
                </span>
                <span className="inline-flex items-center gap-2 rounded-[5vh] border border-gray-700 bg-gray-800/60 px-5 py-2 sm:text-base lg:text-lg">
                  <span className="h-5 w-5 rounded-full bg-purple-400" /> Simple
                </span>
              </div>
            </div>
            <div className="lg:col-span-6 hidden md:flex">
              {/* Feature highlight card */}
              <div className="lg:w-full lg:h-4/5 rounded-2xl border border-gray-800 bg-gray-900/60 shadow-xl p-5 backdrop-blur">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-3 transition-transform duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center gap-2 text-cyan-300 mb-2 text-base lg:text-lg xl:text-xl">
                      <FileSpreadsheet className="h-15 w-15 lg:h-16 lg:w-16 xl:h-17 xl:w-17" />
                      Extraction de tableaux
                    </div>
                    <p className="text-gray-400 text-sm lg:text-base xl:text-lg">PDF → XLSX multi‑feuilles, prêt à analyser.</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-3 transition-transform duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center gap-2 text-emerald-300 mb-2 text-base lg:text-lg xl:text-xl">
                      <FileText className="h-15 w-15 lg:h-16 lg:w-16 xl:h-17 xl:w-17" />
                      Rapport automatisé
                    </div>
                    <p className="text-gray-400 text-sm lg:text-base xl:text-lg">Analyses fiables, rapport fidèle aux données.</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-3 transition-transform duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center gap-2 text-orange-300 mb-2 text-base lg:text-lg xl:text-xl">
                      <Presentation className="h-15 w-15 lg:h-16 lg:w-16 xl:h-17 xl:w-17" />
                      Présentation claire
                    </div>
                    <p className="text-gray-400 text-sm lg:text-base xl:text-lg">Slides prêtes à l’emploi depuis les points clés.</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-3 transition-transform duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center gap-2 text-purple-300 mb-2 text-base lg:text-lg xl:text-xl">
                      <Bot className="h-15 w-15 lg:h-16 lg:w-16 xl:h-17 xl:w-17" />
                      Chatbot documentaire
                    </div>
                    <p className="text-gray-400 text-sm lg:text-base xl:text-lg">Questions/réponses alignées sur vos documents.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-gray-800/70">
        <div className="w-full px-4 sm:px-6 py-3 text-center text-gray-400 text-sm sm:text-base lg:text-lg">
          © {new Date().getFullYear()} — Plate‑forme documentaire IA - JRBC
        </div>
      </footer>
    </div>
  );
};




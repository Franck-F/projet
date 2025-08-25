import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  HelpCircle,
  UploadCloud,
  FileText,
  Presentation,
  Bot,
  CheckCircle2,
  ArrowLeft,
  Workflow,
  BrainCircuit,
  Cloud,
  ChevronDown,
  Lock,
  ServerCrash,
  Link2Off,
  MessageSquareWarning
} from "lucide-react";

const FaqItem = ({ question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full flex justify-between items-center text-left py-4 px-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <Icon className="w-6 h-6 text-blue-400" />
          <span className="font-semibold text-lg text-white">{question}</span>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-300 text-base lg:text-lg">
          {answer}
        </div>
      )}
    </div>
  );
};

export const Help = (): JSX.Element => {
  const faqData = [
    {
      question: "Quel est l'objectif de cette application ?",
      answer:
        "L'application vise à automatiser l'extraction de données, la génération de rapports et de présentations pour optimiser l'efficacité des collaborateurs. C'est un outil pour se concentrer sur l'analyse et la prise de décision, pendant que l'assistant s'occupe des tâches répétitives.",
      icon: HelpCircle,
    },
    {
      question: "Comment fonctionne l'extraction de données ?",
      answer:
        "Vous pouvez téléverser des fichiers PDF ou des images contenant des tableaux. L'application utilise un workflow d'IA pour identifier et extraire les données tabulaires, puis les organise dans un fichier Excel (.xlsx).",
      icon: UploadCloud,
    },
    {
      question: "Quels types de rapports puis-je générer ?",
      answer:
        "L'application peut générer des rapports détaillés à partir des données extraites des fichiers Excel. L'IA analyse les données et s'appuie sur des modèles prédéfinis pour créer un rapport structuré et complet au format PDF.",
      icon: FileText,
    },
    {
      question: "Comment fonctionne la génération de présentations ?",
      answer:
        "Après avoir généré un rapport, l'application peut automatiquement créer une présentation PowerPoint (.pptx). Elle synthétise les points clés du rapport et les présente de manière claire et concise.",
      icon: Presentation,
    },
    {
      question: "Les documents et Les données sont-ils en sécurité ?",
      answer:
        "Oui, la sécurité est prioritaire. Les fichiers sont traités de manière sécurisée et aucune conservation des documents n'est effectuée une fois le traitement terminé. L'application utilise des connexions sécurisées (HTTPS) pour tous les transferts de données.",
      icon: Lock,
    },
    {
        question: "L'application est lente ou ne répond pas, que faire ?",
        answer: "Un simple rafraîchissement de la page (F5 ou Cmd+R sur Mac) peut résoudre le problème. Si le problème persiste, vérifiez votre connexion internet.",
        icon: ServerCrash
    },
    {
        question: "Le lien de téléchargement ne fonctionne pas, que faire ?",
        answer: "Assurez-vous que votre connexion internet est stable. Si le problème persiste, relancez le processus de génération.",
        icon: Link2Off
    },
    {
        question: "L'assistant par chat est indisponible, que faire ?",
        answer: "Vérifiez votre connexion internet. Le service peut parfois être en maintenance, réessayez après quelques instants.",
        icon: MessageSquareWarning
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white">
      <header className="sticky top-0 z-10 bg-gray-900/70 backdrop-blur border-b border-gray-800">
        <div className="w-full px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20 text-blue-300">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight">Centre d'aide</h1>
              <p className="text-base text-gray-300">
                Guide complet d’utilisation
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-gray-800 hover:bg-gray-700 text-white text-base lg:text-lg"
          >
            <Link to="/app" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Retour à l'application
            </Link>
          </Button>
        </div>
      </header>

      <main className="w-full mx-auto px-4 sm:px-6 py-10 text-gray-200 text-base lg:text-lg">
        <div className="flex gap-8">
          {/* Sommaire */}
          <aside className="w-72 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-gray-800 bg-gray-900/60 shadow">
                <div className="px-4 py-3 border-b border-gray-800">
                  <h2 className="text-base font-semibold tracking-wide text-gray-300">
                    Sommaire
                  </h2>
                </div>
                <nav className="p-2 text-base lg:text-lg">
                  <a
                    href="#presentation"
                    className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  >
                    Présentation du SaaS
                  </a>
                  <a
                    href="#how"
                    className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  >
                    Comment ça marche
                  </a>
                  <a
                    href="#architecture"
                    className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  >
                    Architecture
                  </a>
                  <a
                    href="#faq"
                    className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  >
                    FAQ
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="flex-1 space-y-6">
            <div
              id="presentation"
              className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/20 text-blue-300">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-white">
                    Présentation du SaaS
                  </h2>
                  <p className="leading-8 text-gray-300 text-base lg:text-lg">
                  Devenir la plateforme de référence pour la gestion de l'information. Offrir une solution intégrée qui extrait, organise et structure les données de toutes sources. Exceller dans la création de rapports dynamiques et personnalisables pour une prise de décision éclairée. Maîtriser l'analyse et la synthèse documentaire grâce à l'IA, garantissant des insights clés et un gain de temps considérable. JRBC Docs Assistant est une application web développée en React qui permet aux collaborateurs de générer des documents. Elle intègre une interface intuitive et friendly, un aperçu en temps réel et un assistant par chat.
                  </p>
                </div>
              </div>
            </div>

            <div
              id="how"
              className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-600/20 text-cyan-300">
                  <Workflow className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">
                    Comment ça marche
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Utiliser l'Espace de Travail
                      </h4>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>
                          <span className="font-medium text-white">
                            Importez votre document
                          </span>{" "}
                          — Commencez par téléverser le fichier que vous souhaitez analyser (rapport, tableur, etc.).
                        </li>
                        <li>
                          <span className="font-medium text-white">
                            Choisissez une action
                          </span>{" "}
                          — Une fois le fichier chargé, plusieurs options s'offrent à vous : Commencer l'extraction, Générer le rapport ou Générer la présentation.
                        </li>
                        <li>
                          <span className="font-medium text-white">
                            Récupérez votre fichier
                          </span>{" "}
                          — Après le traitement, l'application vous fournira une URL. Cliquez sur ce lien pour télécharger le document nouvellement généré.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="architecture"
              className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-600/20 text-purple-300">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">
                    Architecture
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p>L'application est construite avec une architecture moderne pour garantir une expérience utilisateur fluide et une maintenance aisée.</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium text-white">
                          Frontend :
                          </span>{" "}
                          — L'interface que vous utilisez est développée avec React et TypeScript, assurant une application robuste et performante. Le style est géré par Tailwind CSS pour une cohérence visuelle.
                        </li>
                        <li>
                          <span className="font-medium text-white">
                          Backend & Automatisation :
                          </span>{" "}
                          — Les processus en arrière-plan, comme le traitement de vos documents, sont orchestrés par n8n, une plateforme d'automatisation de workflows. Cela nous permet de connecter différents services et API de manière efficace.
                        </li>
                        <li>
                          <span className="font-medium text-white">
                          Intelligence Artificielle :
                          </span>{" "}
                          — Les fonctionnalités d'extraction, de génération de rapport et de présentation sont propulsées par des agents d'IA, qui utilisent des modèles de langage avancés pour comprendre et traiter vos documents.
                        </li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="faq"
              className="rounded-xl border border-gray-800 bg-gray-900/60 shadow"
            >
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-white p-6">
                Questions fréquentes (FAQ)
              </h3>
              <div className="divide-y divide-gray-800">
                {faqData.map((item, index) => (
                  <FaqItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

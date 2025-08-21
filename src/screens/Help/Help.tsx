import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { HelpCircle, UploadCloud, FileText, Presentation, Bot, CheckCircle2, ArrowLeft, Workflow, BrainCircuit, FileSpreadsheet, Cloud, ArrowRight, ArrowDown } from "lucide-react";

export const Help = (): JSX.Element => {
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
              <p className="text-base text-gray-300">Guide complet d’utilisation</p>
            </div>
          </div>
          <Button asChild className="bg-gray-800 hover:bg-gray-700 text-white text-base lg:text-lg">
            <Link to="/app" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Retour à l'application
            </Link>
          </Button>
        </div>
      </header>

      <main className="w-full max-w-none px-0 sm:px-0 py-10 text-gray-200 text-base lg:text-lg">
        <div className="flex w-full gap-6 px-4 sm:px-6">
          {/* Sommaire (barre latérale gauche) */}
          <aside className="w-72 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-gray-800 bg-gray-900/60 shadow">
                <div className="px-4 py-3 border-b border-gray-800">
                  <h2 className="text-base font-semibold tracking-wide text-gray-300">Sommaire</h2>
                </div>
                <nav className="p-2 text-base lg:text-lg">
                  <a href="#presentation" className="block px-3 py-2 rounded-md hover:bg-gray-800">Présentation du SaaS</a>
                  <a href="#how" className="block px-3 py-2 rounded-md hover:bg-gray-800">Comment ça marche</a>
                  <a href="#extraction" className="block px-3 py-2 rounded-md hover:bg-gray-800">1. Extraction de données</a>
                  <a href="#rapport" className="block px-3 py-2 rounded-md hover:bg-gray-800">2. Génération de rapport</a>
                  <a href="#slides" className="block px-3 py-2 rounded-md hover:bg-gray-800">3. Génération de présentation</a>
                  <a href="#assistant" className="block px-3 py-2 rounded-md hover:bg-gray-800">Assistant (Chatbot)</a>
                  <a href="#conseils" className="block px-3 py-2 rounded-md hover:bg-gray-800">Conseils & bonnes pratiques</a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Contenu */}
          <section className="flex-1 space-y-6">
            <div id="presentation" className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/20 text-blue-300">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-white">Présentation du SaaS</h2>
                  <p className="leading-8 text-gray-300 text-base lg:text-lg">
                    Cette application vous aide à extraire des informations de vos documents (PDF et images),
                    à générer un rapport synthétique et à produire une présentation professionnelle à partir de ces données.
                    Elle inclut également un assistant conversationnel pour vous guider à chaque étape.
                  </p>
                </div>
              </div>
            </div>

            <div id="how" className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-600/20 text-cyan-300">
                  <Workflow className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">Comment ça marche</h3>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Parcours de bout en bout</h4>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>
                          <span className="font-medium text-white">Extraction de tableaux (PDF → XLSX)</span> — L’utilisateur téléverse un PDF, l’IA orchestre l’analyse et l’extraction des données, met en forme et structure les tableaux dans plusieurs feuilles de calcul, puis retourne un fichier Excel (.xlsx).
                        </li>
                        <li>
                          <span className="font-medium text-white">Génération de rapport</span> — Le système reçoit le fichier .xlsx, mène des analyses approfondies via des agents IA et, sur la base de modèles de rapport pré‑entraînés, produit un rapport fidèle aux données et aux analyses.
                        </li>
                        <li>
                          <span className="font-medium text-white">Génération de présentation</span> — À partir des analyses (et/ou du rapport), l’IA génère une présentation claire et structurée, prête à être partagée.
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">Chatbot documentaire</h4>
                      <p>
                        Le chatbot agit comme un super agent documentaire. Interrogez‑le sur les documents fournis : ses réponses sont alignées sur le contenu réel de ces documents.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
                        <div className="inline-flex items-center gap-2 mb-2 text-cyan-300"><Workflow className="w-5 h-5" /><span className="font-medium">Orchestration n8n</span></div>
                        <p className="text-gray-300">Le système d’automatisation s’appuie sur l’orchestrateur n8n. Il comprend plusieurs workflows indépendants, chacun construit autour d’un ou plusieurs agents IA et relié à des API.</p>
                      </div>
                      <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
                        <div className="inline-flex items-center gap-2 mb-2 text-emerald-300"><BrainCircuit className="w-5 h-5" /><span className="font-medium">Agents IA</span></div>
                        <p className="text-gray-300">Les agents IA (pilotés par un LLM) assurent l’analyse, l’extraction, la synthèse et la génération de contenu selon des modèles et des consignes.</p>
                      </div>
                      <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
                        <div className="inline-flex items-center gap-2 mb-2 text-blue-300"><Cloud className="w-5 h-5" /><span className="font-medium">APIs & services</span></div>
                        <ul className="space-y-1 text-gray-300">
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1 text-green-400" />Google Cloud (Docs, Sheets, Slides) pour la gestion de fichiers et de modèles.</li>
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1 text-green-400" />ConvertAPI pour convertir PNG/JPG et scans en PDF exploitables.</li>
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1 text-green-400" />Gemini (LLM) comme « cerveau » des workflows : logique, analyses poussées, structuration.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold text-white mb-3">Architecture</h4>
                      <div className="overflow-x-auto">
                        <div className="min-w-[980px] flex flex-col items-stretch gap-6">
                          {/* Ligne 1 */}
                          <div className="flex items-center justify-center gap-4">
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="text-gray-300 font-medium">Utilisateur</div>
                              <div className="text-xs text-gray-400">Upload PDF / XLSX</div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-500" />
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="text-gray-300 font-medium">Orchestrateur n8n</div>
                              <div className="text-xs text-gray-400">Routage & déclenchement</div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-500" />
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="text-gray-300 font-medium">Workflows IA</div>
                              <div className="text-xs text-gray-400">Extraction • Rapport • Slides</div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-500" />
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="text-gray-300 font-medium">Sorties</div>
                              <div className="text-xs text-gray-400">XLSX • PDF • PPTX</div>
                            </div>
                          </div>

                          {/* Flèche vers sous-processus */}
                          <div className="flex items-center justify-center">
                            <ArrowDown className="w-6 h-6 text-gray-500" />
                          </div>

                          {/* Ligne 2: détails workflows */}
                          <div className="flex items-stretch justify-center gap-4">
                            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 min-w-64">
                              <div className="flex items-center gap-2 mb-2 text-indigo-300"><UploadCloud className="w-5 h-5" /><span className="font-medium">Extraction</span></div>
                              <ul className="text-sm text-gray-300 space-y-1">
                                <li>PDF → Détection & parsing tableaux</li>
                                <li>Mise en forme multi-feuilles</li>
                                <li>Sortie: <span className="text-gray-200 font-medium">XLSX</span></li>
                              </ul>
                            </div>
                            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 min-w-64">
                              <div className="flex items-center gap-2 mb-2 text-emerald-300"><FileText className="w-5 h-5" /><span className="font-medium">Rapport</span></div>
                              <ul className="text-sm text-gray-300 space-y-1">
                                <li>Analyse approfondie (.xlsx)</li>
                                <li>Modèles de rapport entraînés</li>
                                <li>Sortie: <span className="text-gray-200 font-medium">PDF</span></li>
                              </ul>
                            </div>
                            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 min-w-64">
                              <div className="flex items-center gap-2 mb-2 text-orange-300"><Presentation className="w-5 h-5" /><span className="font-medium">Présentation</span></div>
                              <ul className="text-sm text-gray-300 space-y-1">
                                <li>Résumé points clés</li>
                                <li>Structuration des slides</li>
                                <li>Sortie: <span className="text-gray-200 font-medium">PPTX</span></li>
                              </ul>
                            </div>
                          </div>

                          {/* Ligne 3: Agents & APIs */}
                          <div className="flex items-center justify-center gap-4">
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="inline-flex items-center gap-2 text-emerald-300"><BrainCircuit className="w-5 h-5" /><span className="font-medium">Agents IA</span></div>
                              <div className="text-xs text-gray-400">Pilotés par LLM (Gemini)</div>
                            </div>
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="inline-flex items-center gap-2 text-blue-300"><Cloud className="w-5 h-5" /><span className="font-medium">APIs</span></div>
                              <div className="text-xs text-gray-400">Google Cloud • ConvertAPI • etc.</div>
                            </div>
                          </div>

                          {/* Ligne 4: Chatbot */}
                          <div className="flex items-center justify-center gap-4">
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="inline-flex items-center gap-2 text-purple-300"><Bot className="w-5 h-5" /><span className="font-medium">Chatbot</span></div>
                              <div className="text-xs text-gray-400">Q/R sur les documents fournis</div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-500" />
                            <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-center min-w-44">
                              <div className="text-gray-300 font-medium">Documents</div>
                              <div className="text-xs text-gray-400">Sources vérifiées</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="extraction" className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-600/20 text-indigo-300">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">1. Extraction de données</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Téléversez un fichier PDF, PNG ou JPG.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Le système analyse le contenu et extrait tous les tableaux pertinents.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Une fois terminé, vous pourrez ouvrir et télécharger le résultat sous forme de fichier Excel.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="rapport" className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-600/20 text-emerald-300">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">2. Génération de rapport</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Utilise les données extraites ou téléersez d'autre données xlsxpour créer un rapport structuré.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Le système analyse  et génère un rapport structuré et détaillé.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Le rapport final est disponible à l'ouverture et au téléchargement.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="slides" className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-600/20 text-orange-300">
                  <Presentation className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">3. Génération de présentation</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Convertit les points clés du rapport en diapositives claires.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Produit un fichier de présentation (PPTX) prêt à l'emploi.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="assistant" className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-600/20 text-purple-300">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">Assistant (Chatbot)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Accessible depuis l'application principale en bas à droite.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                      <span className="text-base lg:text-lg">Posez des questions sur vos fichiers, demandez des conseils d'utilisation ou des actions guidées.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="conseils" className="rounded-xl border border-gray-800 bg-gray-900/60 shadow p-6">
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">Conseils et bonnes pratiques</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                  <span className="text-base lg:text-lg">Préférez des documents pdf, xlsx, png ou jpg.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                  <span className="text-base lg:text-lg">Évitez les fichiers protégés par mot de passe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-6 h-6 mt-0.5 text-green-400" />
                  <span className="text-base lg:text-lg">Surveillez la taille maximale des fichiers autorisés (jusqu'à 200 Mo).</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};



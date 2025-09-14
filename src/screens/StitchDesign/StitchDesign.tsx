import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import axios from "axios";
import logo from "../../assets/logo.jpg";
import {
  FilePlus,
  Presentation,
  FileText,
  Menu,
  Moon,
  Sun,
  Upload,
  Download,
  X,
  HelpCircle,
  BookOpen,
  LoaderCircle,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx"; // Import clsx
import "@n8n/chat/style.css";
import "../../chat-customizations.css";
import { createChat } from "@n8n/chat";

type TabKey = "extraction" | "generation" | "presentation";
type OperationState = {
  isProcessing: boolean;
  result: string | null;
  error: string | null;
};

export const StitchDesign = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const [extractionFiles, setExtractionFiles] = useState<File[]>([]);
  const [generationFiles, setGenerationFiles] = useState<File[]>([]);
  const [presentationFiles, setPresentationFiles] = useState<File[]>([]);
  const [processingState, setProcessingState] = useState<
    Record<TabKey, OperationState>
  >({
    extraction: { isProcessing: false, result: null, error: null },
    generation: { isProcessing: false, result: null, error: null },
    presentation: { isProcessing: false, result: null, error: null },
  });

  const onDropExtraction = useCallback((acceptedFiles: File[]) => {
    setExtractionFiles(acceptedFiles);
  }, []);

  const onDropGeneration = useCallback((acceptedFiles: File[]) => {
    setGenerationFiles(acceptedFiles);
  }, []);

  const onDropPresentation = useCallback((acceptedFiles: File[]) => {
    setPresentationFiles(acceptedFiles);
  }, []);

  const {
    getRootProps: getExtractionRootProps,
    getInputProps: getExtractionInputProps,
    isDragActive: isExtractionDragActive,
  } = useDropzone({ onDrop: onDropExtraction });
  const {
    getRootProps: getGenerationRootProps,
    getInputProps: getGenerationInputProps,
    isDragActive: isGenerationDragActive,
  } = useDropzone({ onDrop: onDropGeneration });
  const {
    getRootProps: getPresentationRootProps,
    getInputProps: getPresentationInputProps,
    isDragActive: isPresentationDragActive,
  } = useDropzone({ onDrop: onDropPresentation });

  const handleProcess = async (tab: TabKey) => {
    console.log(`Début du traitement pour l'onglet: ${tab}`);
    let files: File[] = [];
    let webhookUrl = "";

    switch (tab) {
      case "extraction":
        files = extractionFiles;
        webhookUrl =
          "https://n8n.srv856869.hstgr.cloud/webhook/c9b3deb8-2d60-40c3-9eb6-624961acde5e"; 
        break;
      case "generation":
        files = generationFiles;
        webhookUrl =
          "https://n8n.srv856869.hstgr.cloud/webhook/generation_rapport"; 
        break;
      case "presentation":
        files = presentationFiles;
        webhookUrl =
          "https://n8n.srv856869.hstgr.cloud/webhook/generation_presentation"; 
        break;
      default:
        return;
    }

    if (files.length === 0) {
      console.log("Aucun fichier téléversé.");
      setProcessingState((prev) => ({
        ...prev,
        [tab]: { ...prev[tab], error: "Veuillez téléverser un fichier." },
      }));
      return;
    }

    console.log("Fichiers à traiter:", files);
    console.log("URL du webhook:", webhookUrl);

    setProcessingState((prev) => ({
      ...prev,
      [tab]: { isProcessing: true, error: null, result: null },
    }));

    const formData = new FormData();
    formData.append("file", files[0]);

    console.log("Envoi de la requête au webhook...");
    try {
      const response = await axios.post(webhookUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Extract the URL from the response data
      console.log("Réponse du webhook:", response.data);
      setProcessingState((prev) => ({
        ...prev,
        [tab]: {
          isProcessing: false,
          result: response.data as string,
          error: null,
        },
      }));
    } catch (error) {
      console.error("Erreur lors de l'appel au webhook:", error);
      setProcessingState((prev) => ({
        ...prev,
        [tab]: {
          isProcessing: false,
          result: null,
          error: "Une erreur est survenue.",
        },
      }));
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const rapportInputRef = React.useRef<HTMLInputElement>(null);
  const presentationInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File, url: string, label: string) => {
    setUploading(label);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPopup({ message: "Modèle transmis avec succès!", type: 'success' });
    } catch (error) {
      setPopup({ message: "Erreur lors de la transmission du modèle.", type: 'error' });
      console.error(`Error uploading file to ${url}:`, error);
    } finally {
      setUploading(null);
      setTimeout(() => setPopup(null), 3000);
    }
  };

  const onRapportFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file, "https://n8n.srv856869.hstgr.cloud/webhook/template_rapport", "Ajouter un modèle de rapport");
    }
  };

  const onPresentationFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file, "https://n8n.srv856869.hstgr.cloud/webhook/template_presentation", "Ajouter un modèle de présentation");
    }
  };

  // route page Help (/help). No internal modal state needed.

  // Navigation menu items data
  const navItems = [
    {
      icon: <FilePlus className="w-6 h-6" />,
      label: "Ajouter un modèle de rapport",
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      label: "Ajouter un modèle de présentation",
    },
  ];

  const tabItems = [
    { value: "extraction", label: "Extraction de Données" },
    { value: "generation", label: "Génération de Rapport" },
    { value: "presentation", label: "Génération de présentation" },
  ];

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-[#f9f9f9] text-[#111616]";

  const cardThemeClasses = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-[#d6e2e0]";

  const sidebarThemeClasses = isDarkMode ? "bg-gray-800" : "bg-[#f9f9f9]";
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://n8n.srv856869.hstgr.cloud/webhook/1b3a54c0-ca1e-42bc-8556-8ef16bc85f2c/chat",
      webhookConfig: {
        method: "POST",
        headers: {},
      },
      target: "#n8n-chat",
      mode: "window",
      chatInputKey: "chatInput",
      chatSessionKey: "sessionId",
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: "en",
      theme: "dark",
      initialMessages: [],
      i18n: {
        en: {
          title: "Discutez avec vos fichiers et documents",
          footer:
            "Vous pouvez ajouter des fichiers et documents à partir de votre ordinateur ou de votre cloud de stockage.",
          getStarted: "Commencer la conversation",
          inputPlaceholder: "Entrez votre question..",
          closeButtonTooltip: "Fermer la conversation",
          fileUploadDropzoneLabel: "Glissez et déposez les 📂",
          subtitle: "Start new conversation.",
          fileUploadButtonLabel: "Upload File",
        },
        fr: {
          title: "👋",
          subtitle: "Démarre une nouvelle conversation.",
          footer: "",
          getStarted: "Nouvelle conversation",
          inputPlaceholder: "Tapez votre question..",
          closeButtonTooltip: "Fermer le chat",
          fileUploadDropzoneLabel:
            "Glissez et déposez les fichiers ici ou cliquez pour parcourir",
          fileUploadButtonLabel: "Téléverser un fichier",
        },
      },
      enableStreaming: false,
      allowFileUploads: true,
      allowedFilesMimeTypes: "application/pdf,image/png,image/jpeg",
    });
  }, [isDarkMode]);

  return (
    <div className={`flex h-screen overflow-hidden ${themeClasses}`}>
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-8 rounded-lg text-white ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            <p className="text-lg">{popup.message}</p>
          </div>
        </div>
      )}
      {/* Help content is now served on /help route */}
      {/* Overlay for mobile --- Clicking it will close the sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-20 w-80 transition-transform duration-300 ease-in-out lg:relative lg:w-[430px] lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarThemeClasses}`}
      >
        <input
          type="file"
          ref={rapportInputRef}
          onChange={onRapportFileSelect}
          style={{ display: "none" }}
        />
        <input
          type="file"
          ref={presentationInputRef}
          onChange={onPresentationFileSelect}
          style={{ display: "none" }}
        />
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 lg:hidden">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={toggleSidebar}
              aria-label="Fermer le menu"
              title="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Profile section */}
          <div className="flex flex-col items-center justify-center p-4">
            <Link to="/">
              <Avatar className="w-32 h-32 rounded-full mb-4">
                <img
                  src={logo}
                  alt="logo"
                  className="h-full w-full object-cover"
                />
              </Avatar>
            </Link>
            <h2
              className={`text-xl lg:text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              JEAN RAPHAËL BERT
            </h2>
            <p
              className={`text-base lg:text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              CONSULTANT
            </p>
          </div>

          {/* Navigation menu */}
          <nav
            className={`flex flex-col p-4 ${isDarkMode ? "bg-gray-800" : ""}`}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.label === "Ajouter un modèle de rapport") {
                    rapportInputRef.current?.click();
                  } else if (item.label === "Ajouter un modèle de présentation") {
                    presentationInputRef.current?.click();
                  }
                }}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 text-base lg:text-lg ${
                  isDarkMode
                    ? "text-gray-100 hover:bg-gray-800"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
                disabled={uploading === item.label}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 text-blue-400"
                      : "bg-[#545554] text-[#5b8984]"
                  }`}
                >
                  {uploading === item.label ? (
                    <LoaderCircle className="w-6 h-6 animate-spin" />
                  ) : (
                    item.icon
                  )}
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            <a
              href="https://notebooklm.google.com/notebook/b935055c-463b-4fc4-b680-056da3cd341f"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 text-base lg:text-lg ${
                isDarkMode
                  ? "text-gray-100 hover:bg-gray-800"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-blue-400"
                    : "bg-[#545554] text-[#5b8984]"
                }`}
              >
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-medium">
                Synthèse & Exploration Documentaire
              </span>
            </a>
          </nav>

          {/* Help button at the bottom */}
          <div className="mt-auto p-4">
            <Button
              asChild
              className={clsx(
                "w-full text-base lg:text-lg",
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-[#a0ddd8] hover:bg-[#8accc7] text-gray-800"
              )}
            >
              <Link
                to="/help"
                className="flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-5 h-5" />
                Aide
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`flex items-center justify-between p-4 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Ouvrir le menu"
            title="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1"></div>{" "}
          {/* This will push the theme toggle to the right */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isDarkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
            }`}
            aria-label="Basculer le thème"
            title="Basculer le thème"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Tabs defaultValue="extraction" className="w-full">
            <TabsList
              className={`grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`text-base lg:text-lg rounded-md ${
                    isDarkMode
                      ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
                      : "data-[state=active]:bg-white data-[state=active]:text-black"
                  }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {["extraction", "generation", "presentation"].map((t) => {
              const tab = t as TabKey;
              const content: Record<
                TabKey,
                {
                  title: string;
                  icon: JSX.Element;
                  buttonLabel: string;
                  resultLabel: string;
                }
              > = {
                extraction: {
                  title: "Extraction de Données",
                  icon: (
                    <Upload
                      className={`w-10 h-10 mb-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    />
                  ),
                  buttonLabel: "Commencer le traitement",
                  resultLabel: "Résultats",
                },
                generation: {
                  title: "Générer un rapport",
                  icon: (
                    <FileText
                      className={`w-10 h-10 mb-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    />
                  ),
                  buttonLabel: "Générer le rapport",
                  resultLabel: "Résultats de Génération",
                },
                presentation: {
                  title: "Générer une présentation",
                  icon: (
                    <FileText
                      className={`w-10 h-10 mb-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    />
                  ),
                  buttonLabel: "Générer la présentation",
                  resultLabel: "Résultats de Présentation",
                },
              };
              const currentContent = content[tab];

              return (
                <TabsContent value={tab} className="mt-4" key={tab}>
                  <div className="flex flex-col items-center w-full gap-4">
                    <h3 className="text-xl lg:text-2xl font-bold w-4/5">
                      {currentContent.title}
                    </h3>
                    <Card
                      {...(tab === "extraction"
                        ? getExtractionRootProps()
                        : tab === "generation"
                        ? getGenerationRootProps()
                        : getPresentationRootProps())}
                      className={`w-4/5 min-h-[320px] p-4 sm:p-6 border-2 border-dashed bg-transparent ${cardThemeClasses} flex flex-col justify-center items-center cursor-pointer`}
                    >
                      <input
                        {...(tab === "extraction"
                          ? getExtractionInputProps()
                          : tab === "generation"
                          ? getGenerationInputProps()
                          : getPresentationInputProps())}
                      />
                      <CardContent className="flex flex-col items-center gap-4">
                        {(tab === "extraction" && isExtractionDragActive) ||
                        (tab === "generation" && isGenerationDragActive) ||
                        (tab === "presentation" && isPresentationDragActive) ? (
                          <p
                            className={`text-lg lg:text-xl font-bold text-center ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            Déposez les fichiers ici...
                          </p>
                        ) : (
                          <>
                            {currentContent.icon}
                            <h4
                              className={`text-lg lg:text-xl font-bold text-center ${
                                isDarkMode ? "text-white" : "text-gray-800"
                              }`}
                            >
                              Glissez et déposez vos fichiers ici
                            </h4>
                            <p
                              className={`text-base lg:text-lg text-center ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              PDF, PNG, JPG, JPEG (Max. 200MB)
                            </p>
                            <Button
                              variant="outline"
                              className={clsx(
                                "mt-2 text-base lg:text-lg",
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
                                  : "bg-[#eaf2ef] border-[#d6e2e0] hover:bg-[#d8e8e3] text-gray-800"
                              )}
                            >
                              Parcourir les fichiers
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                    {(tab === "extraction" && extractionFiles.length > 0) ||
                    (tab === "generation" && generationFiles.length > 0) ||
                    (tab === "presentation" && presentationFiles.length > 0) ? (
                      <div className="w-4/5 mt-4">
                        <h4 className="text-lg font-bold mb-2">
                          Fichiers téléversés:
                        </h4>
                        <ul>
                          {(tab === "extraction"
                            ? extractionFiles
                            : tab === "generation"
                            ? generationFiles
                            : presentationFiles
                          ).map((file) => (
                            <li
                              key={file.name}
                              className={`text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {file.name} - {file.size} bytes
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <div className="flex justify-center mt-4 w-4/5">
                      <Button
                        onClick={() => handleProcess(tab)}
                        disabled={processingState[tab].isProcessing}
                        className={clsx(
                          "text-base lg:text-lg",
                          isDarkMode
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-[#a0ddd8] hover:bg-[#8accc7] text-gray-800"
                        )}
                      >
                        {processingState[tab].isProcessing
                          ? "Traitement en cours..."
                          : currentContent.buttonLabel}
                      </Button>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mt-6 w-4/5">
                      {currentContent.resultLabel}
                    </h3>
                    <Card
                      className={`w-4/5 min-h-[320px] p-4 sm:p-6 border-2 border-dashed bg-transparent ${cardThemeClasses} flex flex-col justify-center`}
                    >
                      <CardContent className="flex flex-col items-center gap-4">
                        {processingState[tab].isProcessing ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            <p className="text-lg">Traitement en cours...</p>
                          </div>
                        ) : (
                          <>
                            {/* Show default placeholder content if no result and no error */}
                            {!processingState[tab].result &&
                              !processingState[tab].error && (
                                <>
                                  <Download
                                    className={`w-10 h-10 mb-4 ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  <h4
                                    className={`text-lg lg:text-xl font-bold text-center ${
                                      isDarkMode
                                        ? "text-white"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    Aperçu non disponible
                                  </h4>
                                  <p
                                    className={`text-base lg:text-lg text-center ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    Vérifiez et téléchargez le résultat
                                  </p>
                                </>
                              )}

                            {/* The button itself */}
                            <Button
                              variant="outline"
                              className={clsx(
                                "mt-2 text-base lg:text-lg",
                                isDarkMode
                                  ? processingState[tab].result
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : processingState[tab].error
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
                                  : processingState[tab].result
                                  ? "bg-green-500 hover:bg-green-600 text-white"
                                  : processingState[tab].error
                                  ? "bg-red-500 hover:bg-red-600 text-white"
                                  : "bg-[#eaf2ef] border-[#d6e2e0] hover:bg-[#d8e8e3] text-gray-800"
                              )}
                              onClick={() =>
                                processingState[tab].result &&
                                window.open(
                                  processingState[tab].result,
                                  "_blank"
                                )
                              }
                              disabled={
                                !processingState[tab].result &&
                                !processingState[tab].error
                              } // Disable if no result and no error
                            >
                              {processingState[tab].result
                                ? "Vérifiez et téléchargez le résultat"
                                : "Télécharger le résultat"}
                            </Button>

                            {/* Display error message below the button if there's an error */}
                            {processingState[tab].error && (
                              <p className="text-red-500">
                                {processingState[tab].error}
                              </p>
                            )}
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </main>
        <footer
          className={`flex justify-center items-center w-full py-3 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <p
            className={clsx(
              "text-base lg:text-lg",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}
          >
            © {new Date().getFullYear()} — Plate‑forme documentaire IA - JRBC
          </p>
        </footer>
      </div>
    </div>
  );
};
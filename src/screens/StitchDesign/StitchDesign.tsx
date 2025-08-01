import React, { useState, useCallback, useEffect } from "react";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import axios from 'axios';
import logo from "../../assets/logo.jpg";
import { Database, FileText, Menu, Moon, Sun, Upload, Download, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx'; // Import clsx
import '@n8n/chat/style.css';
import '../../chat-customizations.css'; // Import custom CSS
import { createChat } from '@n8n/chat';

declare module "*.jpg" {
  const value: string;
  export default value;
}

export const StitchDesign = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [extractionFiles, setExtractionFiles] = useState([]);
  const [generationFiles, setGenerationFiles] = useState([]);
  const [presentationFiles, setPresentationFiles] = useState([]);
  const [processingState, setProcessingState] = useState({
    extraction: { isProcessing: false, result: null, error: null },
    generation: { isProcessing: false, result: null, error: null },
    presentation: { isProcessing: false, result: null, error: null },
  });

  const onDropExtraction = useCallback(acceptedFiles => {
    setExtractionFiles(acceptedFiles);
  }, []);

  const onDropGeneration = useCallback(acceptedFiles => {
    setGenerationFiles(acceptedFiles);
  }, []);

  const onDropPresentation = useCallback(acceptedFiles => {
    setPresentationFiles(acceptedFiles);
  }, []);

  const { getRootProps: getExtractionRootProps, getInputProps: getExtractionInputProps, isDragActive: isExtractionDragActive } = useDropzone({ onDrop: onDropExtraction });
  const { getRootProps: getGenerationRootProps, getInputProps: getGenerationInputProps, isDragActive: isGenerationDragActive } = useDropzone({ onDrop: onDropGeneration });
  const { getRootProps: getPresentationRootProps, getInputProps: getPresentationInputProps, isDragActive: isPresentationDragActive } = useDropzone({ onDrop: onDropPresentation });

  const handleProcess = async (tab) => {
    console.log(`Début du traitement pour l'onglet: ${tab}`);
    let files, setFiles, webhookUrl;

    switch (tab) {
      case 'extraction':
        files = extractionFiles;
        setFiles = setExtractionFiles;
        webhookUrl = "https://n8n.srv856869.hstgr.cloud/webhook/c9b3deb8-2d60-40c3-9eb6-624961acde5e"; // Remplacez par le bon webhook
        break;
      case 'generation':
        files = generationFiles;
        setFiles = setGenerationFiles;
        webhookUrl = "https://n8n.srv856869.hstgr.cloud/webhook-test/d7a23733-4bd3-43a3-95f8-76cdcc889e72"; // Remplacez par le bon webhook
        break;
      case 'presentation':
        files = presentationFiles;
        setFiles = setPresentationFiles;
        webhookUrl = "https://n8n.srv856869.hstgr.cloud/webhook-test/d7a23733-4bd3-43a3-95f8-76cdcc889e72"; // Remplacez par le bon webhook
        break;
      default:
        return;
    }

    if (files.length === 0) {
      console.log("Aucun fichier téléversé.");
      setProcessingState(prev => ({ ...prev, [tab]: { ...prev[tab], error: "Veuillez téléverser un fichier." } }));
      return;
    }

    console.log("Fichiers à traiter:", files);
    console.log("URL du webhook:", webhookUrl);

    setProcessingState(prev => ({ ...prev, [tab]: { isProcessing: true, error: null, result: null } }));

    const formData = new FormData();
    formData.append("file", files[0]);

    console.log("Envoi de la requête au webhook...");
    try {
      const response = await axios.post(webhookUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Extract the URL from the response data
      console.log("Réponse du webhook:", response.data);
      setProcessingState(prev => ({ ...prev, [tab]: { isProcessing: false, result: response.data, error: null } }));
    } catch (error) {
      console.error("Erreur lors de l'appel au webhook:", error);
      setProcessingState(prev => ({ ...prev, [tab]: { isProcessing: false, result: null, error: "Une erreur est survenue." } }));
    } 
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Navigation menu items data
  const navItems = [
    {
      icon: <Database className="w-6 h-6" />,
      label: "Extraire",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: "Générer",
    },
  ];

  const tabItems = [
    { value: 'extraction', label: 'Extraction de Données' },
    { value: 'generation', label: 'Génération de Rapport' },
    { value: 'presentation', label: 'Génération de présentation' }
  ];

  const themeClasses = isDarkMode 
    ? "bg-gray-900 text-white" 
    : "bg-[#f9f9f9] text-[#111616]";

  const cardThemeClasses = isDarkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-[#d6e2e0]";

  const sidebarThemeClasses = isDarkMode 
    ? "bg-gray-800" 
    : "bg-[#f9f9f9]";
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.srv856869.hstgr.cloud/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Salut ! 👋',
        'Comment puis-je t\'aider aujourd\'hui ?'
      ],
      i18n: {
        en: {
          title: '👋',
          subtitle: "Démarre une nouvell conversation.",
          footer: '',
          getStarted: 'Nouvelle conversation',
          inputPlaceholder: 'Tapez votre question..',
          closeButtonTooltip: 'Fermer le chat',
        },
      },
      enableStreaming: false,
    });
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden ${themeClasses}`}>
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
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarThemeClasses}`}
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Profile section */}
        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="w-32 h-32 rounded-full mb-4">
            <img src={logo} alt="logo" className="h-full w-full object-cover" />
          </Avatar>
          <h2 className={`text-xl lg:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            JEAN RAPHAËL BERT
          </h2>
          <p className={`text-base lg:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            CONSULTANT
          </p>
        </div>

        {/* Navigation menu */}
        <nav className={`flex flex-col p-4 ${isDarkMode ? 'bg-gray-800' : ''}`}>
          {navItems.map((item) => (
            <a
              href="#"
              key={item.label}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 text-base lg:text-lg ${isDarkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-200'}`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-[#545554] text-[#5b8984]'}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1"></div> {/* This will push the theme toggle to the right */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Tabs defaultValue="extraction" className="w-full">
            <TabsList className={`grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {tabItems.map(tab => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className={`text-base lg:text-lg rounded-md ${isDarkMode 
                    ? 'data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300' 
                    : 'data-[state=active]:bg-white data-[state=active]:text-black'}`}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {[ 'extraction', 'generation', 'presentation' ].map(tab => {
              const content = {
                extraction: {
                  title: 'Extraction de Données',
                  icon: <Upload className={`w-10 h-10 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />,
                  buttonLabel: 'Commencer le traitement',
                  resultLabel: 'Résultats'
                },
                generation: {
                  title: 'Générer un rapport',
                  icon: <FileText className={`w-10 h-10 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />,
                  buttonLabel: 'Générer le rapport',
                  resultLabel: 'Résultats de Génération'
                },
                presentation: {
                  title: 'Générer une présentation',
                  icon: <FileText className={`w-10 h-10 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />,
                  buttonLabel: 'Générer la présentation',
                  resultLabel: 'Résultats de Présentation'
                }
              };
              const currentContent = content[tab];

              return (
                <TabsContent value={tab} className="mt-4" key={tab}>
                  <div className="flex flex-col items-center w-full gap-4">
                    <h3 className="text-xl lg:text-2xl font-bold w-4/5">{currentContent.title}</h3>
                    <Card {...(tab === 'extraction' ? getExtractionRootProps() : tab === 'generation' ? getGenerationRootProps() : getPresentationRootProps())} className={`w-4/5 min-h-[320px] p-4 sm:p-6 border-2 border-dashed bg-transparent ${cardThemeClasses} flex flex-col justify-center items-center cursor-pointer`}>
                      <input {...(tab === 'extraction' ? getExtractionInputProps() : tab === 'generation' ? getGenerationInputProps() : getPresentationInputProps())} />
                      <CardContent className="flex flex-col items-center gap-4">
                        {(tab === 'extraction' && isExtractionDragActive) || (tab === 'generation' && isGenerationDragActive) || (tab === 'presentation' && isPresentationDragActive) ? (
                          <p className={`text-lg lg:text-xl font-bold text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Déposez les fichiers ici...</p>
                        ) : (
                          <>
                            {currentContent.icon}
                            <h4 className={`text-lg lg:text-xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Glissez et déposez vos fichiers ici</h4>
                            <p className={`text-base lg:text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>PDF, PNG, JPG, JPEG (Max. 200MB)</p>
                            <Button
                    variant="outline"
                    className={clsx(
                      'mt-2 text-base lg:text-lg',
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white'
                        : 'bg-[#eaf2ef] border-[#d6e2e0] hover:bg-[#d8e8e3] text-gray-800'
                    )}
                  >
                    Parcourir les fichiers
                  </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                    {(tab === 'extraction' && extractionFiles.length > 0) || (tab === 'generation' && generationFiles.length > 0) || (tab === 'presentation' && presentationFiles.length > 0) ? (
                      <div className="w-4/5 mt-4">
                        <h4 className="text-lg font-bold mb-2">Fichiers téléversés:</h4>
                        <ul>
                          {(tab === 'extraction' ? extractionFiles : tab === 'generation' ? generationFiles : presentationFiles).map(file => (
                            <li key={file.path} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {file.path} - {file.size} bytes
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
                          'text-base lg:text-lg',
                          isDarkMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-[#a0ddd8] hover:bg-[#8accc7] text-gray-800'
                        )}
                      >
                        {processingState[tab].isProcessing ? 'Traitement en cours...' : currentContent.buttonLabel}
                      </Button>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mt-6 w-4/5">{currentContent.resultLabel}</h3>
                    <Card className={`w-4/5 min-h-[320px] p-4 sm:p-6 border-2 border-dashed bg-transparent ${cardThemeClasses} flex flex-col justify-center`}>
                      <CardContent className="flex flex-col items-center gap-4">
                        {processingState[tab].isProcessing ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            <p className="text-lg">Traitement en cours...</p>
                          </div>
                        ) : processingState[tab].error ? (
                          <p className="text-red-500">{processingState[tab].error}</p>
                        ) : processingState[tab].result ? (
                          <Button
                            variant="outline"
                            className={`mt-2 text-base lg:text-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' : 'bg-[#eaf2ef] border-[#d6e2e0] hover:bg-[#d8e8e3] text-gray-800'}`}
                            onClick={() => window.open(processingState[tab].result, '_blank')}
                          >
                            Vérifiez et téléchargez le résultat
                          </Button>
                        ) : (
                          <>
                            <Download className={`w-10 h-10 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                            <h4 className={`text-lg lg:text-xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Aperçu non disponible</h4>
                            <p className={`text-base lg:text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Vérifiez et téléchargez le résultat</p>
                            <Button variant="outline" className={`mt-2 text-base lg:text-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' : 'bg-[#eaf2ef] border-[#d6e2e0] hover:bg-[#d8e8e3] text-gray-800'}`}>
                              Vérifiez et téléchargez le résultat
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </main>
        <footer className="flex justify-center items-center w-full py-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
          <p
                    className={clsx(
                      'text-base lg:text-lg',
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    )}
                  >
                    Copyright JRBC 2025 All rights reserved
                  </p>
        </footer>
      </div>
    </div>
  );
};
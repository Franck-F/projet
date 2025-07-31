import React, { useState } from "react";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Moon, Sun, Upload, Download, FileText, Database } from "lucide-react";
import logo from "../../assets/logo.jpg";

declare module "*.jpg" {
  const value: string;
  export default value;
}

export const StitchDesign = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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

  const themeClasses = isDarkMode 
    ? "bg-gray-900 text-white" 
    : "bg-[#f9f9f9] text-[#111616]";

  const cardThemeClasses = isDarkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-[#d6e2e0]";

  const sidebarThemeClasses = isDarkMode 
    ? "bg-gray-800" 
    : "bg-[#f9f9f9]";

  return (
    <div className={`flex flex-col items-center justify-center relative min-h-screen transition-colors duration-300 ${themeClasses}`}>
      <div className="flex flex-col min-h-[800px] items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
            {/* Sidebar */}
            <aside className={`w-96 relative h-[760px] transition-colors duration-300 ${sidebarThemeClasses}`}>
              {/* Profile section */}
              <div className="flex w-96 h-[228px] items-center justify-center p-4 absolute top-0 left-0">
                <div className="flex flex-col items-center gap-4 relative flex-1 grow">
                  <div className="inline-flex flex-col items-center gap-4 relative flex-1 grow">
                    <Avatar className="relative w-32 h-32 rounded-[64px]">
                      <img
                        src={logo}
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    </Avatar>

                    <div className="inline-flex flex-col items-center justify-center relative flex-[0_0_auto]">
                      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                        <h2 className={`relative self-stretch mt-[-1.00px] font-bold text-[22px] tracking-[0] leading-7 whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                          JEAN RAPHAËL BERT
                        </h2>
                      </div>

                      <div className="flex flex-col w-[271px] items-center relative flex-[0_0_auto]">
                        <p className={`relative self-stretch mt-[-1.00px] font-normal text-base tracking-[0] leading-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#5b8984]'}`}>
                          CONSULTANT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation menu */}
              {navItems.map((item, index) => (
                <div
                  key={`nav-item-${index}`}
                  className={`flex w-80 h-14 items-center justify-between px-4 py-0 absolute left-0 transition-colors duration-300 hover:bg-opacity-80 cursor-pointer ${sidebarThemeClasses}`}
                  style={{ top: `${228 + index * 56}px` }}
                >
                  <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                    <div className={`w-10 h-10 items-center justify-center rounded-lg flex relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-[#eaf2ef] text-[#5b8984]'}`}>
                      {item.icon}
                    </div>

                    <div className="flex-col items-start flex-1 grow flex relative">
                      <div className={`relative self-stretch mt-[-1.00px] font-normal text-base tracking-[0] leading-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                        {item.label}
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <div className="flex w-7 items-center justify-center relative flex-1 grow">
                      <div className={`w-6 h-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#5b8984]'}`}>
                        →
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Main content */}
            <main className="flex flex-col items-start flex-1 grow relative h-[760px]">
              <Tabs defaultValue="extraction" className="w-full flex flex-col flex-1">
                {/* Header with theme toggle */}
                <div className="flex flex-col items-start pt-0 pb-3 px-0 relative self-stretch w-full flex-[0_0_auto]">
                  <div className={`relative self-stretch w-full h-[54px] border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-[#d6e2e0]'}`}>
                    <TabsList className="bg-transparent h-full p-0 justify-start">
                      <TabsTrigger
                        value="extraction"
                        className={`h-full pt-4 pb-[13px] px-4 data-[state=active]:border-b-[3px] data-[state=active]:shadow-none data-[state=active]:font-bold rounded-none transition-colors duration-300 ${
                          isDarkMode
                            ? 'data-[state=active]:border-blue-400 data-[state=active]:text-wgray data-[state=inactive]:text-gray data-[state=active]:bg-gray-700'
                            : 'data-[state=active]:border-[#9da1a4] data-[state=active]:text-[#111616] data-[state=inactive]:text-[#5b8984]data-[state=active]:bg-[#9c9b9b]'
                        }`}
                      >
                        Extraction de Données
                      </TabsTrigger>
                      <TabsTrigger
                        value="generation"
                        className={`h-full pt-4 pb-[13px] px-4 data-[state=active]:border-b-[3px] data-[state=active]:shadow-none data-[state=active]:font-bold rounded-none transition-colors duration-300 ${
                          isDarkMode
                            ? 'data-[state=active]:border-blue-400 data-[state=active]:text-white data-[state=inactive]:text-white data-[state=active]:bg-gray-700'
                            : 'data-[state=active]:border-[#9da1a4] data-[state=active]:text-[#111616] data-[state=inactive]:text-[#5b8984]'
                        }`}
                      >
                        Génération de Rapport
                      </TabsTrigger>
                      <TabsTrigger
                        value="presentation"
                        className={`h-full pt-4 pb-[13px] px-4 data-[state=active]:border-b-[3px] data-[state=active]:shadow-none data-[state=active]:font-bold rounded-none transition-colors duration-300 ${
                          isDarkMode
                            ? 'data-[state=active]:border-blue-400 data-[state=active]:text-white data-[state=inactive]:text-white data-[state=active]:bg-gray-700'
                            : 'data-[state=active]:border-[#9da1a4] data-[state=active]:text-[#111616] data-[state=inactive]:text-[#5b8984]'
                        }`}
                      >
                        Génération de présentation
                      </TabsTrigger>
                    </TabsList>

                    {/* Theme toggle button */}
                    <button
                      onClick={toggleTheme}
                      className={`absolute w-[30px] h-[30px] top-[12px] right-[15px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        isDarkMode 
                          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      }`}
                    >
                      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <TabsContent value="extraction" className="flex-1 mt-0">
                  {/* Section title */}
                  <div className="flex flex-col items-start pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
                    <h3 className={`relative self-stretch mt-[-1.00px] font-bold text-lg tracking-[0] leading-[23px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                      Extraction de Données
                    </h3>
                  </div>

                  {/* File upload section */}
                  <div className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className={`flex flex-col items-center gap-6 px-6 py-14 relative self-stretch w-full flex-[0_0_auto] rounded-xl border-2 border-dashed bg-transparent transition-colors duration-300 ${
                      isDarkMode ? 'border-gray-600' : 'border-[#d6e2e0]'
                    }`}>
                      <CardContent className="p-0 flex flex-col items-center gap-6">
                        <div className="inline-flex flex-col max-w-[480px] items-center gap-2 relative flex-[0_0_auto]">
                          <Upload className={`w-12 h-12 mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#5b8984]'}`} />
                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <h4 className={`relative self-stretch mt-[-1.00px] font-bold text-lg text-center tracking-[0] leading-[23px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                              Glissez et déposez vos fichiers ici
                            </h4>
                          </div>

                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <p className={`relative self-stretch mt-[-1.00px] font-normal text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#111616]'}`}>
                              PDF, PNG, JPG, JPEG (Max. 200MB)
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                              : 'bg-[#eaf2ef] border-[#d6e2e0] text-[#111616] hover:bg-[#d8e8e3]'
                          }`}
                        >
                          Parcourir les fichiers
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action button */}
                  <div className="flex items-start justify-end px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
                    <Button className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-[#a0ddd8] text-[#111616] hover:bg-[#8accc7]'
                    }`}>
                      Commencer le traitement
                    </Button>
                  </div>

                  {/* Results section title */}
                  <div className="flex flex-col items-start pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
                    <h3 className={`relative self-stretch mt-[-1.00px] font-bold text-lg tracking-[0] leading-[23px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                      Résultats
                    </h3>
                  </div>

                  {/* Results section */}
                  <div className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className={`flex flex-col items-center gap-6 px-6 py-14 relative self-stretch w-full flex-[0_0_auto] rounded-xl border-2 border-dashed bg-transparent transition-colors duration-300 ${
                      isDarkMode ? 'border-gray-600' : 'border-[#d6e2e0]'
                    }`}>
                      <CardContent className="p-0 flex flex-col items-center gap-6">
                        <div className="inline-flex flex-col max-w-[480px] items-center gap-2 relative flex-[0_0_auto]">
                          <Download className={`w-12 h-12 mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#5b8984]'}`} />
                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <h4 className={`relative self-stretch mt-[-1.00px] font-bold text-lg text-center tracking-[0] leading-[23px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                              Aperçu non disponible
                            </h4>
                          </div>

                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <p className={`relative self-stretch mt-[-1.00px] font-normal text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#111616]'}`}>
                              Vérifiez et téléchargez le résultat
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                              : 'bg-[#eaf2ef] border-[#d6e2e0] text-[#111616] hover:bg-[#d8e8e3]'
                          }`}
                        >
                          Vérifiez et téléchargez le résultat
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="generation" className="flex-1 mt-0">
                  {/* Section title */}
                  <div className="flex flex-col items-start pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
                    <h3 className={`relative self-stretch mt-[-1.00px] font-bold text-lg tracking-[0] leading-[23px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                      Générer un rapport
                    </h3>
                  </div>

                  {/* File upload section */}
                  <div className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className={`flex flex-col items-center gap-6 px-6 py-14 relative self-stretch w-full flex-[0_0_auto] rounded-xl border-2 border-dashed bg-transparent transition-colors duration-300 ${
                      isDarkMode ? 'border-gray-600' : 'border-[#d6e2e0]'
                    }`}>
                      <CardContent className="p-0 flex flex-col items-center gap-6">
                        <div className="inline-flex flex-col max-w-[480px] items-center gap-2 relative flex-[0_0_auto]">
                          <FileText className={`w-12 h-12 mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#5b8984]'}`} />
                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <h4 className={`relative self-stretch mt-[-1.00px] font-bold text-lg text-center tracking-[0] leading-[23px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                              Configurez vos paramètres de génération
                            </h4>
                          </div>

                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <p className={`relative self-stretch mt-[-1.00px] font-normal text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#111616]'}`}>
                              Définissez les critères de génération de données
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                              : 'bg-[#eaf2ef] border-[#d6e2e0] text-[#111616] hover:bg-[#d8e8e3]'
                          }`}
                        >
                          Commencer la génération
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action button */}
                  <div className="flex items-start justify-end px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
                    <Button className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-[#a0ddd8] text-[#111616] hover:bg-[#8accc7]'
                    }`}>
                      Générer le rapport
                    </Button>
                  </div>

                  {/* Results section title */}
                  <div className="flex flex-col items-start pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
                    <h3 className={`relative self-stretch mt-[-1.00px] font-bold text-lg tracking-[0] leading-[23px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                      Résultats de Génération
                    </h3>
                  </div>

                  {/* Results section */}
                  <div className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className={`flex flex-col items-center gap-6 px-6 py-14 relative self-stretch w-full flex-[0_0_auto] rounded-xl border-2 border-dashed bg-transparent transition-colors duration-300 ${
                      isDarkMode ? 'border-gray-600' : 'border-[#d6e2e0]'
                    }`}>
                      <CardContent className="p-0 flex flex-col items-center gap-6">
                        <div className="inline-flex flex-col max-w-[480px] items-center gap-2 relative flex-[0_0_auto]">
                          <Download className={`w-12 h-12 mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#5b8984]'}`} />
                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <h4 className={`relative self-stretch mt-[-1.00px] font-bold text-lg text-center tracking-[0] leading-[23px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                              Aperçu non disponible
                            </h4>
                          </div>

                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <p className={`relative self-stretch mt-[-1.00px] font-normal text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#111616]'}`}>
                              Vérifiez et téléchargez le résultat de la génération
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                              : 'bg-[#eaf2ef] border-[#d6e2e0] text-[#111616] hover:bg-[#d8e8e3]'
                          }`}
                        >
                          Vérifiez et téléchargez le résultat
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="presentation" className="flex-1 mt-0">
                  {/* Section title */}
                  <div className="flex flex-col items-start pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
                    <h3 className={`relative self-stretch mt-[-1.00px] font-bold text-lg tracking-[0] leading-[23px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                      Générer une présentation
                    </h3>
                  </div>

                  {/* File upload section */}
                  <div className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className={`flex flex-col items-center gap-6 px-6 py-14 relative self-stretch w-full flex-[0_0_auto] rounded-xl border-2 border-dashed bg-transparent transition-colors duration-300 ${
                      isDarkMode ? 'border-gray-600' : 'border-[#d6e2e0]'
                    }`}>
                      <CardContent className="p-0 flex flex-col items-center gap-6">
                        <div className="inline-flex flex-col max-w-[480px] items-center gap-2 relative flex-[0_0_auto]">
                          <FileText className={`w-12 h-12 mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#5b8984]'}`} />
                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <h4 className={`relative self-stretch mt-[-1.00px] font-bold text-lg text-center tracking-[0] leading-[23px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                              Configurez vos paramètres de présentation
                            </h4>
                          </div>

                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <p className={`relative self-stretch mt-[-1.00px] font-normal text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#111616]'}`}>
                              Définissez les critères de génération de présentation
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                              : 'bg-[#eaf2ef] border-[#d6e2e0] text-[#111616] hover:bg-[#d8e8e3]'
                          }`}
                        >
                          Commencer la génération de présentation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action button */}
                  <div className="flex items-start justify-end px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
                    <Button className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-[#a0ddd8] text-[#111616] hover:bg-[#8accc7]'
                    }`}>
                      Générer la présentation
                    </Button>
                  </div>

                  {/* Results section title */}
                  <div className="flex flex-col items-start pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
                    <h3 className={`relative self-stretch mt-[-1.00px] font-bold text-lg tracking-[0] leading-[23px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                      Résultats de Présentation
                    </h3>
                  </div>

                  {/* Results section */}
                  <div className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className={`flex flex-col items-center gap-6 px-6 py-14 relative self-stretch w-full flex-[0_0_auto] rounded-xl border-2 border-dashed bg-transparent transition-colors duration-300 ${
                      isDarkMode ? 'border-gray-600' : 'border-[#d6e2e0]'
                    }`}>
                      <CardContent className="p-0 flex flex-col items-center gap-6">
                        <div className="inline-flex flex-col max-w-[480px] items-center gap-2 relative flex-[0_0_auto]">
                          <Download className={`w-12 h-12 mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#5b8984]'}`} />
                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <h4 className={`relative self-stretch mt-[-1.00px] font-bold text-lg text-center tracking-[0] leading-[23px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#111616]'}`}>
                              Aperçu non disponible
                            </h4>
                          </div>

                          <div className="inline-flex flex-col max-w-[480px] items-center relative flex-[0_0_auto]">
                            <p className={`relative self-stretch mt-[-1.00px] font-normal text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#111616]'}`}>
                              Vérifiez et téléchargez le résultat de la présentation
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className={`min-w-[84px] max-w-[480px] h-10 px-4 py-0 rounded-xl font-bold transition-colors duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                              : 'bg-[#eaf2ef] border-[#d6e2e0] text-[#111616] hover:bg-[#d8e8e3]'
                          }`}
                        >
                          Vérifiez et téléchargez le résultat
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </aside>
        </div>
      </div>
    </div>
  );
}; 
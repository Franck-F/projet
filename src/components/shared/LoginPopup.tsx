import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X } from "lucide-react";

interface LoginPopupProps {
  onClose: () => void;
  targetUrl: string;
}

export const LoginPopup = ({ onClose, targetUrl }: LoginPopupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.endsWith("@bert-consultant.fr") && password === "@jrbc-#assistant") {
      if (targetUrl.startsWith("http")) {
        window.location.href = targetUrl;
      } else {
        navigate(targetUrl);
      }
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Card className="w-full max-w-md bg-gray-900 text-white border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Connexion
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded bg-gray-800 border border-gray-700" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 rounded bg-gray-800 border border-gray-700" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-500">Se connecter</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

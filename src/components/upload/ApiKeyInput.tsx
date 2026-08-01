
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Unlock, Save, Trash, CheckCircle } from "lucide-react";
import { 
  setApiKey, 
  getApiKey, 
  hasSavedApiKey, 
  loadSavedApiKey, 
  clearSavedApiKey 
} from "@/utils/apiKeyManager";

const ApiKeyInput = () => {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [passphraseInput, setPassphraseInput] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [rememberKey, setRememberKey] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [hasEnvApiKey, setHasEnvApiKey] = useState(false);

  useEffect(() => {
    // Check if there's a saved API key
    const savedKeyExists = hasSavedApiKey();
    setHasStoredKey(savedKeyExists);
    
    // Check if environment variable is set
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    setHasEnvApiKey(!!envApiKey);
    
    // If no saved key, load from memory if available
    if (!savedKeyExists) {
      const memoryKey = getApiKey();
      if (memoryKey) {
        setApiKeyInput(memoryKey);
      }
    }
  }, []);

  const saveApiKey = () => {
    if (!apiKeyInput.trim()) {
      toast.error("Please enter your OpenAI API key");
      return;
    }
    
    if (rememberKey && !passphraseInput.trim()) {
      toast.error("Please enter a passphrase to securely store your API key");
      return;
    }
    
    setApiKey(apiKeyInput, rememberKey, passphraseInput);
    toast.success(rememberKey ? "API key securely saved" : "API key temporarily saved");
    
    // Update the stored key status after saving
    setHasStoredKey(rememberKey);
  };

  const loadApiKey = () => {
    if (!passphraseInput.trim()) {
      toast.error("Please enter your passphrase");
      return;
    }
    
    setIsUnlocking(true);
    
    try {
      const key = loadSavedApiKey(passphraseInput);
      if (key) {
        setApiKeyInput(key);
        toast.success("API key loaded successfully");
      } else {
        toast.error("Incorrect passphrase or corrupted stored key");
      }
    } catch (error) {
      toast.error("Failed to load API key");
    } finally {
      setIsUnlocking(false);
    }
  };

  const clearApiKey = () => {
    clearSavedApiKey();
    setApiKeyInput("");
    setPassphraseInput("");
    setHasStoredKey(false);
    toast.success("Saved API key removed");
  };

  const toggleShowApiKey = () => setShowApiKey(!showApiKey);
  const toggleShowPassphrase = () => setShowPassphrase(!showPassphrase);

  return (
    <div className="mb-6 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <div className="flex items-center gap-2">
            {hasEnvApiKey && (
              <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Environment key active
              </span>
            )}
            {hasStoredKey && !apiKeyInput && (
              <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Lock className="h-3 w-3" /> Encrypted key saved
              </span>
            )}
          </div>
        </div>
        
        {hasEnvApiKey && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="h-4 w-4 inline mr-2" />
              API key configured via environment variable. You can optionally provide your own key below to override it.
            </p>
          </div>
        )}
        
        <div className="flex gap-2 relative">
          <Input
            id="api-key"
            type={showApiKey ? "text" : "password"}
            placeholder={hasEnvApiKey ? "Optional: Override environment key" : "Enter your OpenAI API key"}
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            className="flex-1 pr-10"
          />
          <button 
            type="button"
            onClick={toggleShowApiKey}
            className="absolute right-[90px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label={showApiKey ? "Hide API key" : "Show API key"}
          >
            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <Button onClick={saveApiKey} disabled={!apiKeyInput.trim()}>
            <Save className="h-4 w-4 mr-2" /> {hasEnvApiKey ? "Override" : "Save Key"}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember-key" 
            checked={rememberKey} 
            onCheckedChange={(checked) => 
              setRememberKey(checked === true)
            } 
          />
          <label
            htmlFor="remember-key"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember API key securely
          </label>
        </div>
        
        {(rememberKey || hasStoredKey) && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <Label htmlFor="passphrase" className="mb-2 block">
              Passphrase {hasStoredKey && !apiKeyInput ? "(to unlock saved key)" : "(to encrypt your key)"}
            </Label>
            <div className="flex gap-2 relative mb-2">
              <Input
                id="passphrase"
                type={showPassphrase ? "text" : "password"}
                placeholder="Enter passphrase"
                value={passphraseInput}
                onChange={(e) => setPassphraseInput(e.target.value)}
                className="flex-1 pr-10"
              />
              <button 
                type="button"
                onClick={toggleShowPassphrase}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label={showPassphrase ? "Hide passphrase" : "Show passphrase"}
              >
                {showPassphrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {hasStoredKey && !apiKeyInput && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={loadApiKey} 
                  disabled={!passphraseInput.trim() || isUnlocking}
                  className="flex-1"
                >
                  <Unlock className="h-4 w-4 mr-2" /> Unlock Saved Key
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={clearApiKey}
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          Your API key is used only for image processing. 
          {hasEnvApiKey 
            ? "An environment key is active. Manual input will override it temporarily." 
            : rememberKey 
              ? "It will be stored encrypted in your browser using your passphrase." 
              : "It will not be stored between sessions."
          }
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput;

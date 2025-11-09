import { useEffect } from "react";

// Declaração de tipos para o VLibras
declare global {
  interface Window {
    VLibras: {
      Widget: new (url: string) => void;
    };
  }
}

const VLibras = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };
    document.body.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.querySelector('script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div data-vw="true" className="enabled">
      <div data-vw-access-button="true"></div>
      <div data-vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
};

export default VLibras;

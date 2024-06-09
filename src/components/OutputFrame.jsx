import React, { useEffect, useRef } from "react";

const OutputFrame = ({ html, css, js, onConsoleOutput }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const handleConsoleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      const { type, message } = event.data;
      if (type && message) {
        onConsoleOutput({ type, message });
      }
    };

    window.addEventListener("message", handleConsoleMessage);

    const doc = iframeRef.current.contentDocument;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
      <script>
      (function() {
        if (window.customConsoleInjected) return;
        window.customConsoleInjected = true;

        const originalLog = console.log;
        const originalError = console.error;

        console.log = function(...args) {
          window.parent.postMessage({ type: 'log', message: args.join(' ') }, '*');
          originalLog.apply(console, args);
        };

        console.error = function(...args) {
          window.parent.postMessage({ type: 'error', message: args.join(' ') }, '*');
          originalError.apply(console, args);
        };

        try {
          ${js}
        } catch (error) {
          console.error('Error executing script:', error);
        }
      })();
    </script>
      </html>
    `);
    doc.close();

    return () => {
      window.removeEventListener("message", handleConsoleMessage);
    };
  }, [html, css, js, onConsoleOutput]);

  return (
    <iframe ref={iframeRef} title="output" className="w-full h-full border" />
  );
};

export default OutputFrame;

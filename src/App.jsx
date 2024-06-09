import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import CodeEditor from "./components/CodeEditor";
import OutputFrame from "./components/OutputFrame";
import "./index.css";

const socket = io("http://localhost:5000");

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [showHtmlEditor, setShowHtmlEditor] = useState(true);
  const [showCssEditor, setShowCssEditor] = useState(true);
  const [showJsEditor, setShowJsEditor] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [runJs, setRunJs] = useState(0);

  useEffect(() => {
    socket.on("codeUpdate", (data) => {
      if (data.type === "html") setHtml(data.code);
      if (data.type === "css") setCss(data.code);
      if (data.type === "js") setJs(data.code);
    });
  }, []);

  const handleHtmlChange = (code) => {
    setHtml(code);
    debounceUpdateHtml(code);
  };

  const debounceUpdateHtml = useCallback(
    debounce((code) => {
      socket.emit("codeChange", { type: "html", code });
    }, 300),
    []
  );

  const handleCssChange = (code) => {
    setCss(code);
    socket.emit("codeChange", { type: "css", code });
  };

  const handleJsChange = (code) => {
    setJs(code);
    socket.emit("codeChange", { type: "js", code });
  };

  const toggleHtmlEditor = () => setShowHtmlEditor(!showHtmlEditor);
  const toggleCssEditor = () => setShowCssEditor(!showCssEditor);
  const toggleJsEditor = () => setShowJsEditor(!showJsEditor);

  const handleConsoleOutput = (output) => {
    setConsoleOutput((prevOutput) => [...prevOutput, output]);
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const runJavaScript = () => {
    setRunJs((prevRunJs) => prevRunJs + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex justify-between items-center bg-[#EDEDED] p-2 shadow-sm">
        <div className="flex space-x-6">
          <img
            className="w-[20px]"
            src="https://static.jsbin.com/images/dave.min.svg"
            alt="Logo"
          />
          <p>File</p>
          <p>Add library</p>
        </div>
        <div className="flex space-x-2">
          <button
            className="btn text-xs px-2 py-1 bg-gray-200"
            onClick={toggleHtmlEditor}
          >
            HTML
          </button>
          <button
            className="btn text-xs px-2 py-1 bg-gray-200"
            onClick={toggleCssEditor}
          >
            CSS
          </button>
          <button
            className="btn text-xs px-2 py-1 bg-gray-200"
            onClick={toggleJsEditor}
          >
            JavaScript
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="btn text-xs px-2 py-1 bg-gray-200">
            Login or Register
          </button>
          <button className="btn text-xs px-2 py-1 bg-gray-200">Blog</button>
          <button className="btn text-xs px-2 py-1 bg-gray-200">Help</button>
        </div>
      </div>
      <div className="flex-grow grid grid-cols-5">
        {showHtmlEditor && (
          <div className="col-span-1 bg-white border rounded flex flex-col">
            <div className="flex justify-between items-center p-2 border-b">
              <h3 className=" text-xs">HTML</h3>
            </div>
            <div className="flex-grow flex flex-col">
              <CodeEditor
                language="html"
                value={html}
                onChange={handleHtmlChange}
              />
            </div>
          </div>
        )}
        {showCssEditor && (
          <div className="col-span-1 bg-white border rounded flex flex-col">
            <div className="flex justify-between items-center p-2 border-b">
              <h3 className="text-xs">CSS</h3>
            </div>
            <div className="flex-grow flex flex-col">
              <CodeEditor
                language="css"
                value={css}
                onChange={handleCssChange}
              />
            </div>
          </div>
        )}
        {showJsEditor && (
          <div className="col-span-1 bg-white border rounded flex flex-col">
            <div className="flex justify-between items-center p-2 border-b">
              <h3 className="text-xs">JavaScript</h3>
            </div>
            <div className="flex-grow flex flex-col">
              <CodeEditor
                language="javascript"
                value={js}
                onChange={handleJsChange}
              />
            </div>
          </div>
        )}
        <div className="col-span-1 bg-white border rounded flex flex-col">
          <div className="flex justify-between items-center p-2 border-b">
            <h3 className="text-xs">Console</h3>
            <button
              className="text-xs hover:bg-gray-200 px-1"
              onClick={clearConsole}
            >
              Clear
            </button>
            <button
              className="text-xs hover:bg-gray-200 px-1"
              onClick={runJavaScript}
            >
              Run
            </button>
          </div>
          <div className="bg-white border p-4 h-full overflow-y-auto flex-grow">
            {consoleOutput.map((output, index) => (
              <div
                key={index}
                className={`text-xs ${
                  output.type === "error" ? "text-red-500" : "text-black"
                }`}
              >
                {output.message}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 bg-white border rounded flex flex-col">
          <div className="flex justify-between items-center p-2 border-b">
            <h3 className="text-xs">Output</h3>
          </div>
          <div className="flex-grow flex flex-col">
            <OutputFrame
              html={html}
              css={css}
              js={js}
              onConsoleOutput={handleConsoleOutput}
              key={runJs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

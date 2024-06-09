<!DOCTYPE html>
<html lang="en">

<body>

  <h1>Code Editor</h1>
  <p>
    This project is a collaborative code editor and output viewer built using React, Socket.IO, and Monaco Editor. It allows multiple users to edit HTML, CSS, and JavaScript code in real-time and see the results immediately in an embedded iframe.
  </p>

  <h2>Features</h2>
  <ul>
    <li><strong>Real-time Collaboration:</strong> Multiple users can edit code simultaneously.</li>
    <li><strong>Code Editors:</strong> Separate editors for HTML, CSS, and JavaScript with Monaco Editor.</li>
    <li><strong>Live Preview:</strong> Real-time preview of the code output.</li>
    <li><strong>Console Output:</strong> Logs and errors from the JavaScript execution are displayed.</li>
    <li><strong>Responsive Design:</strong> Adjusts to different screen sizes for a better user experience.</li>
  </ul>

  <h2>Technologies Used</h2>
  <ul>
    <li>React</li>
    <li>Socket.IO</li>
    <li>Monaco Editor</li>
    <li>Tailwind CSS</li>
  </ul>

  <h2>Project Structure</h2>
  <div class="project-structure">
    ├── public<br>
    │   └── index.html<br>
    ├── src<br>
    │   ├── components<br>
    │   │   ├── CodeEditor.js<br>
    │   │   └── OutputFrame.js<br>
    │   ├── App.js<br>
    │   ├── index.css<br>
    │   ├── index.js<br>
    │   └── server.js<br>
    └── package.json
  </div>

  <h2>Acknowledgments</h2>
  <ul>
    <li>Inspired by <a href="https://jsbin.com/" target="_blank">JSBin</a>.</li>
    <li>Uses <a href="https://microsoft.github.io/monaco-editor/" target="_blank">Monaco Editor</a>.</li>
  </ul>

  <h2>Contact</h2>
  <p>
    For any questions or suggestions, please contact <a href="mailto:paul.lakandri50@gmail.com">paul.lakandri50@gmail.com</a>.
  </p>

</body>
</html>

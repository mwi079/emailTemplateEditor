import React, { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import SavedTemplates from "./components/savedTemplates";

function App() {
  const emailEditorRef = useRef(null);

  const [templates, setTemplates] = useState([]);

  const saveTemplate = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.saveDesign((template) => {
      setTemplates([...templates, template]);
    });
  };
  const exportHTML = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.exportHtml((data) => {
      console.log("send html to email provider", data);
    });
  };

  const onSelectTemplate = (id) => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.loadDesign(templates[id]);
  };

  return (
    <center>
      <h1>Create Email Template</h1>
      <EmailEditor ref={emailEditorRef} />
      <div>
        <button onClick={exportHTML}>Exports HTML</button>
        <button onClick={saveTemplate}>Save Template</button>
      </div>
      <SavedTemplates
        templates={templates}
        onSelectTemplate={onSelectTemplate}
      />
    </center>
  );
}

export default App;

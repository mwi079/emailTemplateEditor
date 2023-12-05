import React, { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import SavedTemplates from "./components/savedTemplates";

function App() {
  const emailEditorRef = useRef(null);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const saveTemplate = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.saveDesign((template) => {
      if (selectedTemplate) {
        const templateCopy = [...templates];
        templateCopy[selectedTemplate] = template;
        setTemplates(templateCopy);
      } else {
        setTemplates([...templates, template]);
      }
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
    setSelectedTemplate(id);
  };
  const newEmail = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.loadBlank();
    setSelectedTemplate(null);
    //! can check if user wants to save here
  };

  return (
    <center>
      <h1>Create Email Template</h1>
      <EmailEditor ref={emailEditorRef} />
      <div>
        <button onClick={newEmail}>New Email</button>
        <button onClick={exportHTML}>Export HTML</button>
        <button onClick={saveTemplate}>
          {selectedTemplate !== null
            ? "Update Template"
            : "Save as new template"}
        </button>
      </div>
      <SavedTemplates
        templates={templates}
        onSelectTemplate={onSelectTemplate}
      />
    </center>
  );
}

export default App;

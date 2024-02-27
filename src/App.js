import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import SavedTemplates from "./components/savedTemplates";
import { getTemplates, postNewTemplate, updateTemplate } from "./api";

function App() {
  const emailEditorRef = useRef(null);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    getAllTemplates();
  }, []);

  async function getAllTemplates() {
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.log(error);
    }
  }

  const saveTemplate = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.saveDesign((template) => {
      if (selectedTemplate) {
        const templateCopy = [...templates];
        templateCopy[selectedTemplate] = template;
        setTemplates(templateCopy);
        updateTemplate(selectedTemplate, template);
      } else {
        setTemplates([...templates, template]);
        postNewTemplate(template);
      }
    });
    getAllTemplates();
  };
  const exportHTML = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.exportHtml((data) => {
      console.log("send html to email provider", data);
    });
  };

  const onSelectTemplate = (id) => {
    const unlayer = emailEditorRef.current.editor;
    console.log(templates, id);
    const selectedTemplate = templates.find((x) => x._id === id);
    unlayer.loadDesign(selectedTemplate);
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

import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import SavedTemplates from "./components/savedTemplates";
import { getTemplates, postNewTemplate, updateTemplate } from "./api";

function App() {
  const emailEditorRef = useRef(null);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showHTML, setShowHTML] = useState(false);
  const [previewHTML, setPreviewHTML] = useState(undefined);

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
      setPreviewHTML(setDynamicContent(data.html));
    });
    setShowHTML(!showHTML);
  };

  const onSelectTemplate = (id) => {
    const unlayer = emailEditorRef.current.editor;
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

  const setDynamicContent = (html) => {
    const dynamicContent = { first_name: "Rob", last_name: "Moody" };

    Object.keys(dynamicContent).forEach((tag) => {
      const regex = new RegExp(`{{${tag}}}`, "g");
      html = html.replace(regex, dynamicContent[tag]);
    });
    return html;
  };

  return (
    <center>
      <h1>Create Email Template</h1>
      <EmailEditor
        ref={emailEditorRef}
        options={{
          mergeTags: {
            first_name: {
              name: "First Name",
              value: "{{first_name}}",
              sample: "John",
            },
            last_name: {
              name: "Last Name",
              value: "{{last_name}}",
              sample: "Doe",
            },
          },
        }}
      />
      <div style={{ marginTop: "100px" }}>
        <button onClick={newEmail}>New Email</button>
        <button onClick={exportHTML}>
          {showHTML ? "Hide Preview" : "Show Preview"}
        </button>
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
      {showHTML && (
        <div
          style={{ marginTop: "100px" }}
          dangerouslySetInnerHTML={{ __html: previewHTML }}
        />
      )}
    </center>
  );
}

export default App;

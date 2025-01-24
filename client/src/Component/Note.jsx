import React, { useState, useRef } from 'react';
import JoditEditor from 'react-jodit-editor';

const Note = () => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const config = {
    readonly: false,
    height: 400,
    toolbarSticky: true,
    toolbarButtonSize: "large",
    theme: "default",
    spellcheck: true,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-text rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-highlight text-center mb-6">
        📝 Create a Note
      </h1>
      <div className="border border-secondary rounded-md bg-card overflow-hidden mb-4">
        <JoditEditor
          ref={editorRef}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {
            if (editorRef.current) {
              setContent(newContent);
            }
          }}
        />
      </div>
      <button
        className="w-full py-3 bg-accent text-white font-semibold text-lg rounded-md hover:bg-blue-700 transition duration-200"
        onClick={() => console.log(content)}
      >
        Save Note
      </button>
    </div>
  );
};

export default Note;

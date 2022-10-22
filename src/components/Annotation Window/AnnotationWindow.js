import { useState } from "react";
import Highlighter from "react-highlight-words";

const AnnotationWindow = ({ content, addAnnotation, annotations }) => {
  const [category, setCategory] = useState(null);

  const selectTextHandler = () => {
    const selectedObj = window.getSelection && window.getSelection();
    if (category === null || selectedObj.toString().length === 0) return;
    addAnnotation(category, selectedObj.toString());
  };

  const highlightTag = ({ children, highlightIndex }) => (
    <span className='bg-highlight'>
      <span>{children}</span>
      <span className='uppercase text-[purple] text-[12px] font-bold ml-2'>
        {annotations[highlightIndex].category}
      </span>
    </span>
  );

  return (
    <div className='flex-[2] border border-solid border-black mx-[6px]'>
      <div className='text-center bg-[purple] text-white py-[6px] font-bold'>
        <div className='flex items-start'>
          <div
            className='border border-solid border-white py-1 px-2 mx-1 cursor-pointer'
            style={
              category === "Person"
                ? { background: "white", color: "purple" }
                : {}
            }
            onClick={() => setCategory("Person")}
          >
            PERSON
          </div>
          <div
            className='border border-solid border-white py-1 px-2 cursor-pointer'
            style={
              category === "Org" ? { background: "white", color: "purple" } : {}
            }
            onClick={() => setCategory("Org")}
          >
            ORG
          </div>
        </div>
      </div>
      <Highlighter
        searchWords={
          annotations ? annotations.map((annotation) => annotation.text) : []
        }
        autoEscape={true}
        textToHighlight={content}
        onMouseUp={selectTextHandler}
        highlightTag={highlightTag}
        caseSensitive={true}
      />
    </div>
  );
};

export default AnnotationWindow;

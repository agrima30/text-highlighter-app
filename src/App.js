import Records from "./components/Records/Records";
import AnnotationWindow from "./components/Annotation Window/AnnotationWindow";
import AnnotationList from "./components/Annotation List/AnnotationList";
import { data } from "./dummy-record";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [selectedRecord, setSelectedRecord] = useState(0);
  const [annotations, setAnnotations] = useState(
    localStorage.getItem("annotations") === null
      ? new Map()
      : new Map(JSON.parse(localStorage.annotations))
  );
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("annotations", JSON.stringify([...annotations]));
  }, [annotations]);

  const addAnnotation = (category, text) => {
    const arr = annotations.get(selectedRecord)
      ? annotations.get(selectedRecord)
      : [];
    arr.push({ category: category, text: text });
    // annotations[selectedRecord] = arr;
    setAnnotations(new Map(annotations.set(selectedRecord, arr)));
    console.log(annotations.get(selectedRecord));
  };

  const deleteAnnotation = (index) => {
    setShowModal(true);
    setDeleteIndex(index);
  };

  const deleteHandler = () => {
    if (deleteIndex === null) return;
    const arr = annotations.get(selectedRecord);
    arr.splice(deleteIndex, 1);
    setAnnotations(new Map(annotations.set(selectedRecord, arr)));
    setShowModal(false);
  };

  return (
    <div className='App flex justify-center p-2'>
      <Records
        data={data}
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
      />
      <AnnotationWindow
        content={data[selectedRecord]}
        addAnnotation={addAnnotation}
        annotations={annotations.get(selectedRecord)}
      />
      <AnnotationList
        annotations={annotations.get(selectedRecord)}
        deleteAnnotation={deleteAnnotation}
      />
      {showModal && (
        <div class='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
          <div class='bg-white px-16 py-14 rounded-md text-center'>
            <h1 class='text-xl mb-4 font-bold text-slate-500'>
              Are you sure you want to delete ?
            </h1>
            <button
              class='bg-slate-900 px-4 py-2 rounded-md text-md text-white'
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              class='bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold'
              onClick={() => deleteHandler()}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

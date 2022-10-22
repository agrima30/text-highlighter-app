import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const AnnotationList = ({ annotations, deleteAnnotation }) => {
  console.log(annotations);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className='border border-solid border-black h-full'
      style={isCollapsed ? { flex: "0" } : { flex: "1" }}
    >
      <div className='text-center bg-[purple] text-white py-[6px] font-bold flex'>
        {!isCollapsed && <p className='flex-[2]'>Annotations</p>}
        <GiHamburgerMenu
          className='cursor-pointer mr-2'
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        />
      </div>
      {!isCollapsed && annotations && annotations.length > 0 && (
        <div>
          {annotations.map((annotation,index) => (
            <div className='flex justify-around items-center'>
              <p>{annotation.text}</p>
              <p>{annotation.category}</p>
              <MdClose
                className='cursor-pointer'
                onClick={() => deleteAnnotation(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnotationList;

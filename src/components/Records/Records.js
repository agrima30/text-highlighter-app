import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Records = ({ data, selectedRecord, setSelectedRecord }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  //   const [selectedRecord, setSelectedRecord] = useState(0);
  return (
    <div
      className='flex-1 border-t border-l border-r border-solid border-black h-full'
      style={isCollapsed ? { flex: "0" } : { flex: "1" }}
    >
      <div className='text-center bg-[purple] text-white py-[6px] font-bold flex justify-center items-center'>
        {!isCollapsed && <p className='flex-[2]'>Records</p>}
        <GiHamburgerMenu
          className='cursor-pointer mr-2'
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        />
      </div>
      {!isCollapsed && (
        <div>
          {data.map((record, idx) => {
            return (
              <div
                className='border-b border-solid border-black cursor-pointer'
                key={idx}
                style={
                  selectedRecord === idx
                    ? { background: "white" }
                    : { background: "#e3e3e3" }
                }
                onClick={() => setSelectedRecord(idx)}
              >
                {record.substring(0, 40) + "...."}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Records;

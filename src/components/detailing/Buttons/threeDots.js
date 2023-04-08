import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from 'react-modal';
import { HiInformationCircle } from 'react-icons/hi';
// import ShareButton from "./share";

import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiShare2 } from 'react-icons/fi';
// import { QRCode } from 'react-qrcode-logo';
import { useLocation } from 'react-router-dom';

//custom style for modal

const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '0.5rem',
      padding: '2rem',
      border: 'none',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxWidth: '1000px',
      width: '100%',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
  };

const MoreFactsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  // For More Facts

   const [modalIsOpen, setModalIsOpen] = useState(false);

   function validateAndReturnImages(images){
     console.log('records', images)
     if (images == null) {
       return [];
     }
     else if (images == "undefined") {
       console.log('condiotion2')
       return [];
     }
     else if (images == undefined) {
       console.log('condiotion2')
       return [];
     }
     else{
       console.log('condiotion3')
       return JSON.parse(window.sessionStorage.getItem("subImages"));
     }
    }
 
   let Records =validateAndReturnImages(window.sessionStorage.getItem("subImages"))
     
 
    console.log('records', Records)
 
   
  
   
   const handleButtonClick = () => {
     setModalIsOpen(true);
   };


   // For Share Button
   const [showOptions, setShowOptions] = useState(false);
   const location = useLocation();
 
   const handleShareClick = () => {
     setShowOptions(!showOptions);
   };
 
   const handleWhatsAppClick = () => {
     const url = `whatsapp://send?text=${encodeURIComponent(location.href)}`;
     window.location.href = url;
   };
 
   const handleEmailClick = () => {
     const subject = 'Check out this link';
     const body = `Hey,\n\nI thought you might be interested in this:\n\n${location.href}`;
     window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
   };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        onClick={toggleOpen}
      >
        <BsThreeDotsVertical size={24} />
      </button>

      

      {isOpen && (
        <div className="absolute bottom-14 right-0 flex flex-col space-y-2 bg-white shadow-lg p-2 rounded-md">
        <button className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none">

           {/* Share Button */}

        {showOptions && (
        <div className="absolute z-10 right-16 bottom-20 flex flex-col items-center justify-center bg-white rounded-md shadow-md p-4">
          <div className="mb-4">
            {/* <QRCode
              value={location.href}
              size={128}
              bgColor="#FFFFFF"
              fgColor="#000000"
            //   logoImage={logoImage}
              logoWidth={48}
              logoHeight={48}
            /> */}
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <button onClick={handleWhatsAppClick} className="px-4 py-2 mb-2 text-sm font-medium text-white bg-green-500 rounded-md">
              <FaWhatsapp size={20} className="mr-2" />
              
            </button>
            <button onClick={handleEmailClick} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md">
              <FiMail size={20} className="mr-2" />
              
            </button>
          </div> */}
        </div>
      )}
      {/* <button onClick={handleShareClick} className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <FiShare2 size={30} />
      </button> */}

          </button>

{/* More Facts Button */}
          <button
        onClick={handleButtonClick}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full py-4 px-6  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <HiInformationCircle size={30}/>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLabel="More Facts Modal"
      >
        <div className="text-center ">
          <h2 className="text-2xl font-bold mb-4">More Facts</h2>
         <div className=' flex gap-x-2 '>
          {Records.followImage &&
            Records.followImage.map((record) => {
                return (
          <img src={record.image} alt=""  className="h-80 w-75 border-double border-4 border-pink" />
                );
        })}
        </div>
          <button
            onClick={() => setModalIsOpen(false)}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
          >
            Close
          </button>
        </div>
      </Modal>
        </div>
      )}
    </div>
  );
};

export default MoreFactsButton;

import React, { useState } from 'react';
import Modal from 'react-modal';
import { HiInformationCircle } from 'react-icons/hi';

// Define the custom styles for the modal
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
  // Define a state variable to track whether the modal is open
  const [modalIsOpen, setModalIsOpen] = useState(false);


 let Records = window.sessionStorage.getItem("subImages") == null ? [] :JSON.parse(window.sessionStorage.getItem("subImages"));
    console.log('sub',Records.followImage);
  // Define a function to handle clicking the "More Facts" button
  const handleButtonClick = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleButtonClick}
        className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <HiInformationCircle size={40} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLabel="More Facts Modal"
      >
        <div className="text-center ">
          <h2 className="text-2xl font-bold mb-4">More Facts</h2>
         <div className=' flex flex-row gap-x-2 '>
          {Records.followImage &&
            Records.followImage.map((record) => {
                return (
          <img src={record.image} alt=""  className="h-60 w-90 border-double border-4 border-pink" />
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
  );
};

export default MoreFactsButton;

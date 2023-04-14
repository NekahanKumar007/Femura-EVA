/** @format */

import React, { useState, useEffect } from "react";
import Records from "../detailing/records.json";
// import Sidebar from "../detailing/Sidebar";
import Sidebar1 from "./Sidebar1";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// import axios from "axios";
// import Select from 'react-select'
// import classNames from 'classnames';
const Detailing = () => {
  let uniqueType = [...new Set(Records.map((item) => item.type))];
  let productType = uniqueType.map((name) => ({ value: name, label: name }));
  const [selectedOption, setSelectedOption] = useState("");
  const [products, setProducts] = useState(Records);
  const [groupedImages, setGroupedImages] = useState([]);
  const [switchState, setSwitchState] = useState(false);

  let id = 0;
  function selectOption(e) {
    setSelectedOption(e.target.src);
    var keys = [];
    for (var k in selectedOption) keys.push(selectedOption[k].value);
    // console.log("filteredOptions", keys);
    // .filter(([key, value]) => selectedOption.includes(key))

    let filteredProducts = [];
    for (let i = 0; i < Records.length; i++) {
      if (keys.includes(Records[i].type)) {
        filteredProducts.push(Records[i]);
        // console.log('Key exists in object:', Records[i]);
      } else {
        // console.log('Key does not exist in object:', jsonArray[i]);
      }
    }

    console.log("filteredProducts", filteredProducts);
    if (filteredProducts.length === 0) {
      setProducts(Records);
    } else {
      setProducts(filteredProducts);
    }
  }

  function productTypeSelect(e) {
    // console.log(e.target.innerText);

    let filteredProducts = Records.filter((o) => o.type === e.target.innerText);

    if (e.target.innerText == "All") {
      setProducts(Records);
    } else {
      setProducts(filteredProducts);
    }
  }

  const [highlighted, setHighlighted] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);

  const [transferSelectedImages, setTransferImages] = useState([]);

  const handleImageSelect = (event) => {
    setHighlighted(!highlighted);
    const selectedImage = event.target.src;
    if (selectedImages.length >= 10) {
      return false;
    }

    if (selectedImages.includes(selectedImage)) {
      setSelectedImages(
        selectedImages.filter((image) => image !== selectedImage)
      );
    } else {
      setSelectedImages([...selectedImages, selectedImage]);
    }

    if (transferSelectedImages.some((obj) => obj.product == event.target.alt)) {
      let filtered = transferSelectedImages.filter(
        (image) => image.product != event.target.alt
      );

      // console.log(filtered);

      if (switchState) {
        //remove all other images grouped with the clicked image
        let image = Records.find((o) => o.id == event.target.id);
        // console.log("image to be removed", image);
        const filteredArray = Records.filter(
          (item) => item.group == image.group && item.id != image.id
        );
        // console.log("images to be removed", filteredArray);
        // console.log("remove", filteredArray);
        for (let data of filteredArray) {
          filtered = filtered.filter((image) => image.product != data.product);
        }
      }
      setTransferImages(filtered);
      window.sessionStorage.setItem("selectedImages", JSON.stringify(filtered));
      // console.log("filter", filtered);
    } else {
      console.log("productname", event.target.id);
      transferSelectedImages.push({
        product: event.target.alt,
        image: selectedImage,
        id: event.target.id,
        type: "test",
      });

      //add all other images grouped with the clicked image
      // console.log('switchState',switchState)
      // find the images grouped with the selected image

      if (switchState) {
        let image = Records.find((o) => o.id == event.target.id);

        const filteredArray = Records.filter(
          (item) => item.group == image.group && item.id != image.id
        );

        // console.log("grouped", filteredArray);

        for (let data of filteredArray) {
          transferSelectedImages.push({
            product: data.product,
            image: data.image,
            id: image.id,
            type: data.type,
          });
        }
      }

      setTransferImages(transferSelectedImages);

      window.sessionStorage.setItem(
        "selectedImages",
        JSON.stringify(transferSelectedImages)
      );
      // console.log("added", transferSelectedImages);
    }
  };

  function checkImages() {
    if (selectedImages.length === 0) {
      return false;
    }
  }

  const handleSwitchChange = () => {
    //  console.log(products)

    //clear all selected images

    setSelectedImages([]);
    setTransferImages([]);
    window.sessionStorage.removeItem("selectedImages");

    setSwitchState(!switchState);
    if (switchState) {
      setProducts(Records);
      alert("All Products");
    } else {
      alert("Grouped and Ungrouped");
      //filter the array where group is not empty
      let filteredArray = products.filter((obj) => {
        return obj.group.trim() !== "";
      });

      // group the filterd array by the key --group
      let groupedObject = filteredArray.reduce((result, obj) => {
        let key = obj.group;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(obj);
        return result;
      }, {});

      // console.log(groupedObject);

      //read the first element from each group

      let firstImageInGroup = [];
      for (let x in groupedObject) {
        firstImageInGroup.push(groupedObject[x][0]);
        console.log(firstImageInGroup);
      }

      if (firstImageInGroup) setGroupedImages(firstImageInGroup);

      let filteredArray2 = products.filter((obj) => {
        return obj.group.trim() == "";
      });

      let final;
      if (filteredArray2) {
        final = filteredArray2.concat(firstImageInGroup);
      }

      if (firstImageInGroup) {
        final = firstImageInGroup.concat(filteredArray2);
      }

      setProducts(final);
    }
  };

  return (
    <div className="flex fixed">
      <Sidebar1 />

      <div className="content">
        <div className="flex flex-grow bg-light-white">
          <div className="px-4 py-4 origin-left font-medium text-3xl ">
            <h4 className="text-black">
              Femura Digital Detailing - Products Catalogue
            </h4>

            <hr className="color-dark-purple" />

            <div className="flex ">
              {/* <h6 className='text-black position bg-skin w-full py-2'>Select product for detailing</h6> */}
            </div>
            <ul className="pt-1 inline-flex gap-x-4">
              <li className="text-white rounded-md mt-2 cursor-pointer">
                <span
                  className="bg-dark-blue hover:bg-pink hover:text-black rounded-md py-2 focus:outline-none text-base p-12 font-medium flex-1"
                  onClick={productTypeSelect}>
                  All
                </span>
              </li>
              {productType &&
                productType.map((record) => {
                  return (
                    <li className="text-white rounded-md mt-2 cursor-pointer">
                      <span
                        className="bg-dark-blue hover:bg-pink hover:text-black rounded-md py-2 focus:outline-none text-base p-12 font-medium flex-1"
                        value={record.value}
                        onClick={productTypeSelect}>
                        {record.value}
                      </span>
                    </li>
                  );
                })}

              <label
                htmlFor="switch"
                className="flex items-center cursor-pointer text-sm mt-4 ml-[200px]">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="switch"
                    className="sr-only "
                    onChange={handleSwitchChange}
                  />
                  <div className="block bg-gray-500 w-12 h-6 rounded-full"></div>
                  <div
                    className={`${
                      switchState
                        ? "translate-x-6 bg-sky-blue"
                        : "translate-x-0 bg-white"
                    } absolute left-0 top-0 bottom-0 w-6 h-6 rounded-full transition-transform`}></div>
                </div>
                <div className="ml-3 text-lg font bold text-gray-700">
                  By Group
                </div>
              </label>
            </ul>

            <div className="flex h-screen ">
              <ul className="grid grid-cols-5 gap-x-4 pt-3 mt-4 h-[500px] pb-20 rounded-md cursor-pointer overflow-x-hidden">
                {products &&
                  products.map((record) => {
                    return (
                      <li
                        className="text-black font-medium text-sm pt-4 "
                        key={record.id}>
                        <img
                          src={record.image}
                          value={record.product}
                          alt={record.product}
                          className={`${
                            selectedImages?.id === record.image
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                          id={record.id}
                          onClick={handleImageSelect}
                        />
                        {record.product}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <footer className="fixed bg-gray-500 bottom-0 w-full flex flex-nowrap">
            {/* bg-gray-400 text-black py-1 fixed bottom-0 w-full  */}
            <p className="text-white text-align-right px-4 pt-6 text-black ">
              Selected Items
            </p>
            <div>
              <ul className="">
                {/* inline-flex gap-x-4 px-6 */}
                {selectedImages.map((image) => (
                  <li className="text-black font-medium text-sm pt-4 inline-block mr-2">
                    <img
                      src={image}
                      alt="Selected Image"
                      className="h-10 w-16"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <NavLink to={"/sidebar"} className="link" activeclassName="active">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-3 p-10 rounded-md pb-2 fixed  right-4"
                onClick={checkImages}
                disabled={true ? selectedImages.length == 0 : false}>
                Start Detailing
              </button>
            </NavLink>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Detailing;

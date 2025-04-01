import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Context from "../context";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayINRCurrency from "../helper/displayCurrency";
import addToCart from "../helper/addToCart";
import { MdTitle } from "react-icons/md";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setLoading(false);
      setData(categoryProduct?.data || []);
    };
    fetchData();
  }, [category]);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      {/* Ensure heading has valid content */}
      <h2 className="text-2xl font-semibold py-4">{heading || "Products"}</h2>

      <div className="relative">
        {/* Add aria-label for accessibility */}
        <button
          aria-label="Scroll left"
          className="bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 -translate-y-1/2 text-lg hidden md:flex items-center"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          aria-label="Scroll right"
          className="bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 -translate-y-1/2 text-lg hidden md:flex items-center"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        <div
          className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg bg-slate-200 animate-pulse p-1 rounded-full">
                      {MdTitle || "Default Title"}
                    </h2>
                    <p className="capitalize text-slate-500 bg-slate-200 animate-pulse p-1 rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium bg-slate-200 animate-pulse p-1 rounded-full w-full"></p>
                      <p className="text-slate-500 line-through bg-slate-200 animate-pulse p-1 rounded-full w-full"></p>
                    </div>
                    <button className="text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse">
                      {MdTitle || "Default Title"}
                    </button>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <Link
                  key={product._id}
                  to={"product/" + product._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all"
                      alt={product?.productName}
                    />
                  </div>
                  <div className="p-4 grid">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;

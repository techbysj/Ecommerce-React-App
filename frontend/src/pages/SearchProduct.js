import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading ...</p>}

      <p className="text-lg font-semibold my-3">
        Search Results : {data.length}
      </p>

      {!loading && data.length === 0 && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {!loading && data.length !== 0 && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;

"use client";
import { ProductTY } from "@/components/categories/phone";
/* eslint-disable */ 

import Container from "@/components/Container";
import axiosClient from "@/components/GlobalApi";
import ListProduct from "@/components/ListProduct";
import Product from "@/components/Product";
import ProductSlider from "@/components/sliderProduct";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";

function Shope() {
  const [showGrid, setShowGrid] = useState(true);
  const [showList, setShowList] = useState(false);

  const { data } = useQuery<ProductTY[]>({
    queryKey : ["allProducts"], 
    queryFn :() => {
    return axiosClient.get("/products" ).then((res) => res.data )
},
  refetchOnWindowFocus: true,   
  refetchInterval: 10000,     

  }
 );
  return (
    <Container>
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-2xl text-primeColor font-bold ">All Products</h2>
        <div className="flex items-center gap-4">
          <span
            onClick={() => {
              setShowGrid(false);
              setShowList(true);
            }}
            className={`
          ${showGrid
                ? "bg-primeColor text-white"
                : "border-[1px] border-gray-300 text-[#737373]"
              }
           w-8 h-8 text-lg flex items-center justify-center cursor-pointer `}
          >
            <BsGridFill />
          </span>
          <span
            onClick={() => {
              setShowGrid(true);
              setShowList(false);
            }}
            className={`
          ${showList
                ? "bg-primeColor text-white"
                : "border-[1px] border-gray-300 text-[#737373]"
              }
           w-8 h-8 text-lg flex items-center justify-center cursor-pointer `}
          >
            <ImList />
          </span>
        </div>
      </div>
      {showGrid ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {data &&
            data?.map((item) => <ProductSlider key={item?.id} product={item} />)}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-5">
          {data?.map((item: ProductTY) => (
            <ListProduct key={item?.id} product={item} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default Shope;

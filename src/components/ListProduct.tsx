import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowsFullscreen } from 'react-icons/bs';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import  { Toaster } from "react-hot-toast";
import { addToCart } from '@/app/redux/cartSlice';
import { ProductTY } from './categories/phone';

interface Props {
    product: ProductTY;
    bg?: string;
  }
function ListProduct({ product, bg }: Props) {
  const dispatch = useDispatch();

    return (
        <div className="w-full relative group flex items-center border-[1px] hover:shadow-lg duration-200 shadow-gray-500 rounded-md overflow-hidden group">
            <div className="max-w-80 max-h-80 flex">
                <div
                    className={`w-full h-80 flex items-center justify-center ${bg ? `bg-[${bg}]` : "bg-white"
                        }`}
                >
                    <Link
                        href={{
                            pathname: `/product/${product?.id}`,
                        }}
                    >
                        <Image src={product?.image} height={500} width={500} alt='img-product'
                            className='w-72 h-72 object-contain' />
                    </Link>
                </div>
                {product?.isnew && (
                    <div className="absolute top-2 right-2 z-50">
                        <p className="bg-primeColor px-4 py-1 text-white flex justify-center items-center text-sm font-semibold hover:bg-black duration-300 cursor-pointer rounded-md">
                            New
                        </p>
                    </div>
                )}
            </div>
            <div className="py-6 flex flex-col gap-5 px-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg text-primeColor font-bold">
                        {product?.title}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[#767676] text-xs line-through">
                        ${product?.rowprice}
                    </p>
                    <p className="font-semibold">${product?.price}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[#767676] text-[14px]">
                        a product by{" "}
                        <span className="font-semibold text-primeColor">
                            {product?.brand}
                        </span>
                    </p>
                    <div className="flex items-center gap-1">
                        <MdOutlineStarPurple500 className="text-lg text-yellow-500" />{" "}
                        <span className="font-medium text-sm">{product?.rating}</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 duration-300">
                    <button   onClick={() => {
                dispatch(addToCart(product));
               
              }}  className="bg-gray-800 text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-950 hover:text-white duration-200">
                        <span className="text-sm mb-1">
                            <AiOutlineShopping />
                        </span>{" "}
                        Add to bag
                    </button>
                    <Link
                        href={{
                            pathname: `/product/${product?.id}`,
                        }}
                        className="bg-gray-800 text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-950 hover:text-white duration-200"
                    >
                        <span className="text-xs mb-1">
                            <BsArrowsFullscreen />
                        </span>{" "}
                        Quick view
                    </Link>
                </div>
            </div>
            <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
        </div>
    )
}

export default ListProduct

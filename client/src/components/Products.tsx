"use client";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";

const Products = () => {
  const [{ products, user }] = useStateProvider();

  const [prodIdList, setProdIdList] = useState([]);

  useEffect(() => {
    const getProdIds = async () => {
      const response = await axios.get(
        `http://localhost:5000/get-prod-ids?username=${user?.username}`
      );
      console.log(response.data.product_ids);
      setProdIdList(response.data.product_ids);
    };

    getProdIds();
  }, []);

  return (
    <div className="flex  mt-5">
      <div className="p-2 mt-5 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-max-7xl h-full">
        <div className="text-center mt-5 pl-10">
          <h1 className="text-center text-3xl font-bold">Products</h1>
        </div>

        <BentoGrid className=" mx-auto">
          {products.map((item: any) => (
            <BentoGridItem
              key={item.id}
              isPresent={prodIdList.includes(item.id)}
              id={item.id}
              title={item.name}
              desc={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default Products;

const Skeleton = ({ image }: { image: string }) => (
  <div className="h-[8rem] w-full flex">
    <Image
      src={image}
      className="w-full rounded-md"
      alt="Cotton T-shirt"
      height={50}
      width={30}
    />
  </div>
);

"use client";
import React from "react";
import Buy from "../../../../../../components/product/Buy";
import { useParams } from "next/navigation";
import Rent from "../../../../../../components/product/Rent";

const ProductActionPage = () => {
  const { slug, action } = useParams();

  return (
    <div>
      {action === "buy" ? <Buy /> : action === "rent" ? <Rent /> : <></>}
    </div>
  );
};

export default ProductActionPage;

"use client";
import React, { act, useState } from "react";
import ProductDetailPage from "../../../../../components/product/ProductDetailPage";
import ProtectedRoutes from "../../../../../components/auth/ProtectedRoutes";

const ProductDetail = () => {
  return (
    <div>
      <ProductDetailPage />
    </div>
  );
};

export default ProductDetail;

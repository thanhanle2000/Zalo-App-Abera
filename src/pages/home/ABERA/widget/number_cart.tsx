import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getItemCart } from "../../../../core/hook/state_home";
import { ItemCartsModels } from "../../../../core/model/home/item_cart";

const NumberCart = () => {
  // lấy giá trị data từ local
  const [dataListItem, SetDataListItem] = useState<ItemCartsModels[]>(() => {
    const storedTodos = localStorage.getItem("cartItems");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const lstCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
  // sum
  let sum = dataListItem.reduce(function (
    prev: number,
    current: { qty: string | number }
  ) {
    return prev + +current.qty;
  },
  0);
  // get data recoil
  const data = useRecoilValue(getItemCart);
  // useEffect
  useEffect(() => {
    SetDataListItem(lstCart);
  }, [data]);
  return (
    <div className="position-fixed pos-right-number-cart z-index-10">{sum}</div>
  );
};

export default NumberCart;

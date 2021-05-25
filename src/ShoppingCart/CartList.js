import React, { useEffect, useState } from "react";
import cartData from "./components/CartData.json";
import style from "./CartList.module.css";

export const CartList = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (items.length) {
      return;
    }
    let total = 0;
    cartData.map((data) => {
      data.discountNo = ((data.mrp * data.discount) / 100).toFixed();
      data.total = data.mrp - data.discountNo;
      total += data.total;
    });
    setTotalPrice(total);
    setItems([...cartData]);
  });

  const handleQtyChange = (value, item) => {
    const data = [...items];
    let total = totalPrice;
    data.forEach((itm) => {
      if (itm.id === item.id) {
        itm.mrp = (itm.mrp / itm.qty) * value.target.value;
        itm.qty = value.target.value;
        itm.discountNo = ((itm.mrp * itm.discount) / 100).toFixed();
        total -= itm.total;
        itm.total = itm.mrp - itm.discountNo;
        total += itm.total;
      }
    });
    setTotalPrice(total);
    setItems([...data]);
  };

  const handleDeleteItem = (item) => {
    const data = [...items];
    let total = totalPrice;
    const cartitem = data.find((a) => a.id === item.id);
    total -= cartitem.total;
    data.splice(
      data.findIndex((a) => a.id === item.id),
      1
    );
    setTotalPrice(total);
    setItems([...data]);
  };

  return (
    <>
      <span
        className={style.itemInfo}
      >{`You currently have ${items.length} items(s) in your cart`}</span>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>
              MRP<sub>(per Unit)</sub>
            </th>
            <th>Discount</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>
                <div className={style.productDisplay}>
                  <div>
                    <img className={style.mattress} src={item.thumbnail} />
                  </div>
                  <div className={style.productInfo}>
                    <div>{item.title}</div>
                    <div
                      className={style.subText}
                    >{`${item.skucode} - ${item.name}`}</div>
                  </div>
                </div>
              </td>
              <td>
                <select
                  name="qty"
                  id="qty"
                  className={style.quantity}
                  onChange={(value) => handleQtyChange(value, item)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </td>
              <td>&#8377; {item.mrp}</td>
              <td>
                <div>&#8377; {item.discountNo}</div>
                <div className={style.subText}>{`(${item.discount}%)`}</div>
              </td>
              <td>&#8377; {item.total}</td>
              <td>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDeleteItem(item)}
                >
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className={style.totalCount}>Total &#8377; {`${totalPrice}`}</h3>
    </>
  );
};

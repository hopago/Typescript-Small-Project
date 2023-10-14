import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import { ReactElement, ChangeEvent, memo } from 'react';

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {

    const img: string = new URL(`../images/${item.sku}.jpg`,
    import.meta.url).href;

    const lineTotal: number = (item.quantity * item.price);

    const highestQty: number = 20 > item.quantity ? 20 : item.quantity

    const optionsValues: number[] = [...Array(highestQty).keys()].map(i => i + 1);

    const options: ReactElement[] = optionsValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    });

    const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, quantity: Number(e.target.value) }
        });
    };

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item
    });

    const content = (
      <li>
        <img src={img} alt={item.name} className="cart_img" />
        <div aria-label="Item Name">{item.name}</div>
        <div aria-label="Item Price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(item.price)}
        </div>
        <label htmlFor="itemQuantity">Item Quantity</label>
        <select
          name="itemQuantity"
          id="itemQuantity"
          value={item.quantity}
          aria-label="Item Quantity"
          onChange={onChangeQuantity}
        >
          {options}
        </select>

        <div className="cart__item-subtotal">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(lineTotal)}
        </div>

        <button onClick={onRemoveFromCart}>
            X
        </button>
      </li>
    );

  return content;
}

function areItemsEqual({ item: prevItem }: PropsType, { item: nextItem }: PropsType) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  });
};

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual);

export default MemoizedCartLineItem;

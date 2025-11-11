import { useSelector, useDispatch } from "react-redux";
import { updateItemFromSelect, deleteFromCart } from "../features/cart";

export default function Cart({ onClose }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-slate-700/75 flex justify-center items-center z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-20 relative bg-slate-300 text-slate-900 min-w[400px] md:min-w-[700px] px-10 pt-10 pb-6 rounded border border-slate-600 mb-[10vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
        >
          X
        </button>
        <h2 className="text-2xl mb-6">Your Cart</h2>
        <ul>
          {cart.cartItems.length > 0
            ? cart.cartItems.map((item) => (
                <li className="flex items-center mb-4" key={item.id}>
                  <img
                    className="w-10 h-10 rounded"
                    src={`./images/${item.img}.png`}
                    //src={`${BASE_URL}images/${item.img}.png`}
                    alt=""
                  />
                  <p className="mr-auto ml-2 text-lg font-semibold">
                    {item.title}
                  </p>
                  <select
                    onChange={(e) =>
                      dispatch(
                        updateItemFromSelect({
                          value: e.target.value,
                          id: item.id,
                        })
                      )
                    }
                    value={item.quantity}
                    name="quantity"
                    className="w-16 h-8 rounded mr-2"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <button
                    onClick={() => dispatch(deleteFromCart(item))}
                    className="bg-slate-900 text-slate-200 inline-flex items-center justify-center p-2 rounded"
                  >
                    Remove from cart
                  </button>
                </li>
              ))
            : "Add items to your cart!"}
        </ul>
        <p className="pb-4">
          Your total:{" "}
          <span className="font-semibold">
            £
            {cart.cartItems
              .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
              .toFixed(2)}
          </span>
        </p>
        <button className="mx-auto block bg-slate-800 text-slate-200 py-2 px-4 rounded mt-7">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

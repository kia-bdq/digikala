import "./shoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increment ,decrement } from "../../redux/cartSlice";
import { FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";

const ShoppingCart = ({handleVisibility, show}) => {
    
    const cartData = useSelector(state => state.cart.cartArray);
    const sum= useSelector(state => state.cart.sum);
    const dispatch = useDispatch();
    console.log(show);


    return ( 
        <div className={show ? "modalBg showModal" : "modalBg hideModal"} onClick={handleVisibility}>
            <div className="modalDiv" onClick={e => e.stopPropagation()}>
                {sum === 0 && <div className="empty">سبد خرید شما خالی است.</div>}
                {sum > 0 && 
                    <div className="innerDiv">
                        <h2>سبد خرید</h2> 
                        <div className="modalContainer">
                        <ul>
                            {cartData.map( product => 
                                <li key={cartData.indexOf(product)}>
                                    <div className="commodityContainer">
                                        <div className="right">
                                            <Link to={"/Timche/commodity/"+product.id}>
                                                <img src={product.picture} alt={product.name}/>
                                            </Link>
                                        </div>

                                        <div className="middleRight">
                                            <p className="name">{product.name}</p>
                                        </div>

                                        <div className="middleLeft">                                       
                                            <div className="count"> 
                                                <p className="plus" onClick={()=> dispatch(increment(cartData.indexOf(product)))}>+</p>
                                                <p>{product.count}</p>
                                                <p className={product.count>1? "minus":"minus deactive"}  
                                                    onClick={product.count >1 ? 
                                                        () => dispatch(decrement(cartData.indexOf(product))): undefined}>
                                                -
                                                </p>
                                            </div>
                                            <FaTrashAlt className="trash" onClick={() => 
                                                dispatch(removeFromCart(cartData.indexOf(product)))}/>
                                        </div>
                                        <div className="left">
                                            <p>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</p>
                                        </div>
                                    </div>
                                </li>
                                ) //end of map function
                            }
                        </ul>
                        <div className="sum">
                            <p>مجموع</p>
                            {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان
                        </div>
                        </div>
                    </div>
                }
            </div>
        </div>
     );
}
 
export default ShoppingCart;
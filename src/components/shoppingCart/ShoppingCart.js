import "./shoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increment ,decrement } from "../../redux/cartSlice";
import { FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";

const ShoppingCart = ({handleVisibility, show}) => {
    
    const cartData = useSelector(state => state.cart.cartArray);
    const sum= useSelector(state => state.cart.sum);
    const dispatch = useDispatch();

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
                                    <div className="pContainer">
                                        <div className="right">
                                            <Link to={"/product/"+product.id}>
                                                <img src={product.picture} alt={product.name}/>
                                            </Link>
                                        </div>
                                        <div className="left">
                                            <div className="details">
                                                <p className="name">{product.name}</p>
                                                <p className="price">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</p>
                                            </div>
                                            <div className="options">
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
                                        </div>
                                    </div>
                                </li>
                                ) //end of map function
                            }
                        </ul>
                        
                        </div>
                        <div className="sum">
                            <p className="sumTitle">قابل پرداخت: </p>
                            <p className="sumAmount">{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</p>
                        </div>
                    </div>
                }
            </div>
        </div>
     );
}
 
export default ShoppingCart;
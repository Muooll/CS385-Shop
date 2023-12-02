// This is the Basket component.
// This component deals with the display of the current
// shopping basket.
import basketPicture from "../../images/basket.png";
function Basket(props) {
  // create a call back for the reduce function
  // note how we access the price of each object.
  function getBasketTotal(acc, obj) {
    return acc + obj.plant.price;
  }

  return (
    <>
      <div class="alert alert-secondary" role="alert">
        <h3>Your shopping basket</h3>
        <img alt="shopping basket" class="img-fluid" src={basketPicture} />
        <p>
          Your basket has <b>{props.basket.length}</b> items
        </p>
        <p>
          <b>Total cost: €{props.basket.reduce(getBasketTotal, 0)}</b>
        </p>
        {props.basket.sort(props.sorting).map((p, index) => (
          <p key={index}>
            {p.plant.name},€{p.plant.price.toFixed(2)}{" "}
            <button
              class="btn btn-info"
              onClick={() => props.removeItemFromBasket(p)}
            >
              Remove
            </button>
          </p>
        ))}
      </div>
    </>
  );
}

export default Basket;

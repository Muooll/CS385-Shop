import React, { useState } from "react";

// for simplicity we use a static array for our shop inventory
// The data for your inventory could be replaced by an API.
import { inventory } from "./inventory";

import logoBanner from "./images/banner2.png";

import Basket from "./components/basket/Basket";
import ShowProductsComponent from "./components/products/Products";

function App() {
  // productChoice is a state variable - initially null
  const [productChoice, setProductChoice] = useState(null);
  // This is our shopping basket array - initially an empty array.
  const [basket, setBasket] = useState([]);

  // compare product items based on their price.
  // we want ASCENDING ORDER
  function comparePriceAsc(objA, objB) {
    let comparison = 0;
    if (objA.plant.price > objB.plant.price) comparison = 1;
    else if (objA.plant.price < objB.plant.price) comparison = -1;
    else comparison = 0;

    return comparison;
  }

  // compare function for the NAMES of plants
  // ascending - alphabetical order.
  // Javascript will figure out the alphabetical ordering in the event
  // of a tie or equal letters.
  function compareName(objA, objB) {
    let comparison = 0;
    let objAStr = objA.plant.name.toLowerCase();
    let objBStr = objB.plant.name.toLowerCase();

    if (objAStr > objBStr) comparison = 1;
    else if (objAStr < objBStr) comparison = -1;
    else comparison = 0;

    return comparison;
  }

  // Allow for switching between different product categories
  function changeProductCategory(pc) {
    setProductChoice(pc);
  }

  // add an item (object) to the shopping basket array
  function addItemToBasket(item) {
    // we use the Javascript SPREAD operator
    setBasket([...basket, item]);
  }

  // remove all items from the current basket
  // This just requires resetting the basket to
  // an empty basket
  function emptyBasket() {
    setBasket([]);
  }

  // This is used by findIndex - it simply checks if the
  // current object in the array (haystack) has the same pid as the
  // object passed (needle)
  function findObjectIndex(needle) {
    return function (haystack) {
      return haystack.pid === needle.pid;
    };
  }
  // This is used by the filter approach to object removal
  // This tries to find objects in the array (haystack)
  // that DO NOT have the same pid as the object being searched (needle)
  function findObjectFilterRemove(needle) {
    return function (haystack) {
      return haystack.pid !== needle.pid;
    };
  }

  // This removes an item (object) from the basket in state
  // we take great care not to mutate state.
  function removeItemFromBasket(item) {
    let n = basket.findIndex(findObjectIndex(item));
    setBasket([...basket.slice(0, n), ...basket.slice(n + 1, basket.length)]);
    //setBasket(basket.filter(findObjectFilterRemove(item)));
  }

  return (
    <>
      <div class="container-fluid">
        <img src={logoBanner} class="img-fluid" alt="CS385 branding" />
        <div class="alert alert-secondary" role="alert">
          <h2>We have {inventory.length} items for sale, right now!</h2>
          <p class="lead">
            Welcome to our own online shop at CS385. You can browse our products
            with the buttons below. Happy Shopping!{" "}
          </p>
          <button
            class="btn btn-primary"
            onClick={() => changeProductCategory("Vegetables")}
          >
            Vegetables
          </button>
          &nbsp;
          <button
            class="btn btn-primary"
            onClick={() => changeProductCategory("Flowers")}
          >
            Flowers
          </button>
          &nbsp;
          <button
            class="btn btn-primary"
            onClick={() => changeProductCategory("Fruits")}
          >
            Fruits
          </button>
          &nbsp;
          <button
            class="btn btn-primary"
            onClick={() => changeProductCategory(null)}
          >
            Reset Choice
          </button>
          &nbsp;
          {basket.length > 0 && (
            <>
              <button class="btn btn-primary" onClick={emptyBasket}>
                Empty Basket
              </button>
            </>
          )}
        </div>
        {productChoice && (
          <ShowProductsComponent
            inventory={inventory}
            choice={productChoice}
            addItemToBasket={addItemToBasket}
            sorting={compareName}
          />
        )}
        {basket.length > 0 && (
          <>
            <Basket
              basket={basket}
              removeItemFromBasket={removeItemFromBasket}
              sorting={comparePriceAsc}
            />
          </>
        )}

        <img src={logoBanner} class="img-fluid" alt="CS385 branding" />
      </div>
    </>
  );
}

export default App;

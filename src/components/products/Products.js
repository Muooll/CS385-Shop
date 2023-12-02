/* This is the ShowProductsComponent 
It is primarily used to allow us to display products
and encapsulate this code away from the parent App component */
function ShowProductsComponent(props) {
  // a filter function for productCategory
  function productFilter(prod) {
    return function (productsObject) {
      return productsObject.productCategory === prod;
    };
  }
  // use filter to find the number of items for this product
  let n = props.inventory.filter(productFilter(props.choice));

  return (
    <>
      <div class="alert alert-secondary" role="alert">
        <h3>
          Our {props.choice} products ({n.length} items)
        </h3>
        <div class="table-responsive">
          <table class="table table-hover table-bordered border-primary table-sm">
            <tbody>
              {props.inventory
                .filter(productFilter(props.choice))
                .sort(props.sorting)
                .map((p, index) => (
                  <tr key={index}>
                    <td>{p.plant.name}</td>
                    <td>€{p.plant.price.toFixed(2)}</td>
                    <td>
                      <button
                        class="btn btn-warning"
                        onClick={() => props.addItemToBasket(p)}
                      >
                        Add to basket
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
} // end of ShowProductsComponent

export default ShowProductsComponent;

class ProductService {
  constructor() {

  // .catch( alert );

  this.products = [
      {
            "name": "Cappuccino",
            "id": 1
        },
        {
            "name": "Americano",
            "id": 2
        },
        {
            "name": "Espresso",
            "id": 3
        },
        {
            "name": "Lungo",
            "id": 4
        },
        {
            "name": "Ristretto",
            "id": 5
        },
        {
            "name": "Doppio",
            "id": 6
        }
    ];

    
  }
  // state = {
  //   products: []
  // }
  // conponentDidMount() {
  // fetch('http://159.89.106.160/products')
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(resp){
  //   // this.products = resp.data;
  //   this.setState({ products: resp.data })
  // })
  // }

  getProducts(){
    return this.products;
  }
}

const productList = new ProductService().getProducts();

export default productList;
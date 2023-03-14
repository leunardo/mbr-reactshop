import './App.css';
import ProductsJson from './products.json'

import Filters from './components/Filters';
import Products from './components/Products';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';


function App() {
  const [visibleProducts, setVisibleProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchedTerm, setSearchedTerm] = useState("")

  useEffect(() => {
    setVisibleProducts(ProductsJson)
  }, [])

  useEffect(() => {
    let products = filteredProducts;
    if (searchedTerm) {
      products = products.filter(p => p.name.toLowerCase().includes(searchedTerm) || p.description.toLowerCase().includes(searchedTerm))
    }

    setVisibleProducts(products);
  }, [filteredProducts, searchedTerm])

  return (
    <div className="App">
      <header>
        <Navbar onSearchChanged={(term) => setSearchedTerm(term)} />
      </header>
      <div className="content">
        <aside>
          <Filters products={ProductsJson} onProductsFiltered={(i) => setFilteredProducts(i)} />
        </aside>
        <main>
          <Products products={visibleProducts} />
        </main>
      </div>
    </div>
  );
}

export default App;

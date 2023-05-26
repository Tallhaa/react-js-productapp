import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(8);
  const [showLoadMore, setShowLoadMore] = useState(false)
  const getData = async () => {
    let data = await fetch("https://dummyjson.com/products");
    data = await data.json();
    console.log(data.products)
    setProducts(data.products)
  }
  const loadMore = () => {
    setCount(count + 8)

  }
  useEffect(() => {
    getData()
    setInterval(() => {
      setShowLoadMore(true)
    }, 2000);
  }, [])
  return (
    <>
      <h1>Product List</h1>
      <div style={{ textAlign: 'center' }} className='container'>
        {
          products.slice(0, count).map((item) =>
            <div className='sub-container' key={item.id}>
              <div className='sub-container-img'>
                <img className='product-img' src={item.thumbnail} alt="Avatar" />
              </div>
              <div class="body-container">
                <h4>{item.title}</h4>
                <p>{item.price}</p>
                <p>{item.id}</p>
              </div>
            </div>
          )
        }
      </div>
      {
        showLoadMore && (
          <div className='pagination'>
            <button className='pagination-btn' onClick={loadMore}>Load More</button>
          </div>
        )
      }
    </>
  )
}

export default App;

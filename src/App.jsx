import './App.css'
import Products from './features/Products'
import AddCategory from './features/category/AddCategory'
import { Toaster } from 'react-hot-toast'
import CategoryContext from './context/CategoryContext'
import ProductsContext from './context/ProductsContext'
import ProductList from './features/ProductList'


function App() {
  return (
    <div className='m-5'>
      <ProductsContext>
        <CategoryContext>
          <Toaster />
          <AddCategory />
          <hr />
          <Products />
          <ProductList />
        </CategoryContext>
      </ProductsContext>
    </div>
  )
}

export default App

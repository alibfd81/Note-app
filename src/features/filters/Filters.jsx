import { useState } from "react";
import { useCategories } from "../../context/CategoryContext";
import { useProducts } from "../../context/ProductsContext";

function Filters() {
  const { selectCategory } = useCategories();
  const { products, getProductsId, getProducts,getProductsCategory } = useProducts()
  // const categories = selectCategory ? selectCategory : [];
  const [search, setSearch] = useState("")
  const handleFilterDate = (e) => {
    const a = e.target.value

    let filteredProducts = [...products];

    if (a === "Latest") {
      filteredProducts.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
      // setFilterProducts(a)
    } else if (a === "Earliset") {
      filteredProducts.sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
      // setFilterProducts(b)

    }
    // setFilterProducts(filteredProducts)
    // getProducts(filteredProducts)
  }

  const handleFilterCategory = (e) => {
    const title = e.target.value;
    // getProductsId(title)

      if (title === "All") {
        getProducts()
      } 
      else {
        getProductsCategory(title)
        // const b = products.filter((item) => {
        //   return item.category ===title
        // })
    }
  }


  const handleSearch = (e) => {
    // setSearch(e.target.value);
    const title = e.target.value;
    setSearch(title);
    getProductsId(title)
    // const filteredBySearch = products.filter((item) =>
    //   item.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );
  }
  // if (!categories.length) return <p>there is no selectCategory</p>;
  return (
    <div>
      <div className="mt-10 flex flex-col w-1/3">
        <h1>Filters</h1>
        <div className="flex justify-between">
          <h1>search</h1>
          <input type="text" placeholder="چیزی تایپ کنید" className="border border-red-500 rounded-lg px-2" dir="rtl" value={search} onChange={handleSearch} />
        </div>
        <div className="flex justify-between">
          <h1>sort</h1>
          <select name="" id="" onChange={handleFilterDate}>
            <option value="All">All</option>
            <option value="Latest">latest</option>
            <option value="Earliset">earliest</option>
          </select>
        </div>
        <div className="flex justify-between">
          <h1>category</h1>
          <select name="" id="" onChange={handleFilterCategory}>
            <option value="All">All</option>
            {
              selectCategory.map((item) => {
                return <option key={item.id} value={item.title}>{item.title}</option>
              })
            }

          </select>
        </div>
      </div>
    </div>
  )
}


export default Filters

/* eslint-disable react/prop-types */
import { HiArrowSmDown } from "react-icons/hi"
import { useEffect, useState } from "react"
import OpenCategory from "./category/OpenCategory";
import { useProducts } from "../context/ProductsContext";
import { useForm } from "react-hook-form";


function Products() {
    const { register, handleSubmit,setError } = useForm();
    const [selectCategory, setSelectCategory] = useState("");
    const { postProducts } = useProducts()
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault()
        if (!title && !quantity) return
        const newProduct = {
            title,
            quantity,
            category: selectCategory,
            id: Date.now(),
            createAt: new Date().toISOString()
        }
        setProducts((products) => [...products, newProduct])
        // setProducts(newProduct)
        setTitle("")
        setQuantity(0)
    }

    useEffect(() => {
        if (!products.length) return
        const newProducts = products[products.length - 1]
        postProducts(newProducts)
        // axios.post("http://localhost:4000/products", newProducts)
    }, [products])
    return (
        <form className="flex flex-col" onSubmit={handleSubmit(handleUpdate)}>
            <label htmlFor="">title</label>
            <input type="text" className="border" {...register("title",{ required: true, maxLength: 5 })} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="">quantity</label>
            <input type="number" className="border" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <span>category</span>
            <div className="flex items-center justify-between border p-1 relative" onClick={() => setOpen(!open)}>
                <span>select category</span>
                <HiArrowSmDown />
                <div className="absolute left-0 top-7 w-full">
                    <OpenCategory open={open} setSelectCategory={setSelectCategory} />
                </div>
            </div>
            <button className="border px-10 py-0.5 mt-10" type="submit">
                Add new Product
            </button>
        </form>
    )
}

export default Products

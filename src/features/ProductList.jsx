import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import Filters from "./filters/Filters";

function ProductList() {
    const { products,getProducts } = useProducts()
    useEffect(() => {
        // setGivenProducts(products)
        getProducts()
    }, [])
    return (
        <div className="mt-7">
            {
                products.map((item) => {
                    return (

                        <div key={item.id} className="flex justify-between">
                            <span>{item.title}</span>
                            <div className="flex gap-x-3">
                                <span>{item.category}</span>
                                <span>{item.quantity}</span>
                                <span>{item.createAt}</span>
                                <button className="border">delete</button>
                            </div>
                        </div>
                    )
                })
            }
            <Filters/>
        </div >
    )
}

export default ProductList

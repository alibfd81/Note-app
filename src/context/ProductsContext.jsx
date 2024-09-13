import axios from "axios"
import { createContext, useContext, useEffect, useReducer } from "react"

const initialState = {
    isLoading: false,
    products: [],
}

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            }
        case "get/products":
            return {
                ...state,
                isLoading: false,
                products: action.payload
            }
        case "create/products":
            return {
                ...state,
                isLoading: false,
                products: [...state.products, action.payload]
            }
        case "getProductsTitle":
            return {
                ...state,
                isLoading: false,
                products: action.payload
            }

        default:
            break;
    }
}
const ProductProvider = createContext()

function ProductsContext({ children }) {
    const [{ isLoading, products }, dispatch] = useReducer(reducer, initialState)

    async function getProducts() {
        try {
            const { data } = await axios.get("http://localhost:4000/products")
            dispatch({ type: "get/products", payload: data })
        } catch (error) {
            console.log(error)
        }
    }

    async function postProducts(newProducts) {
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.post("http://localhost:4000/products", newProducts)
            dispatch({ type: "create/products", payload: data })
        } catch (error) {
            console.log(error)
        }
    }
    async function getProductsId(title) {
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.get(`http://localhost:4000/products?title_like=${title}`)
            dispatch({ type: "getProductsTitle", payload: data })
        } catch (error) {
            console.log(error)
        }
    }
    async function getProductsCategory(title) {
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.get(`http://localhost:4000/products?category_like=${title}`)
            dispatch({ type: "getProductsTitle", payload: data })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductProvider.Provider value={{ isLoading, products, postProducts, getProductsId, getProducts,getProductsCategory }}>
            {children}
        </ProductProvider.Provider>
    )
}

export default ProductsContext

export function useProducts() {
    return useContext(ProductProvider)
}

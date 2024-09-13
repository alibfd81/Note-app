import axios from "axios";
import { useEffect, useState } from "react"
import { useCategories } from "../../context/CategoryContext";

function AddCategory() {
    const { postCategory } = useCategories()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState([]);
    useEffect(() => {
        if (!category.length) return
        const lastCategory = category[category.length - 1]
        postCategory(lastCategory)
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            title,
            id: Date.now()
        }
        setCategory((prevCategory) => [...prevCategory, newCategory])
        // setCategory([newCategory])
        setTitle("")
        setDescription("")
    }
    return (
        <form className="" onSubmit={handleSubmit}>
            <label htmlFor="">title</label>
            <input type="text" className="border" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="">description</label>
            <input type="text" className="border" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="flex gap-x-10 mt-3">
                <button>Cancle</button>
                <button type="submit">Add Category</button>
            </div>
        </form>

    )
}

export default AddCategory

import React, { useState } from "react";
import { Head, router } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";

export default function Homepage(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = () => {
        const data = {
            id: props.news.id, title, description, category
        }
        router.post('/news/update', data)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    return (
        <div className="min-h-screen bg-blend-darken">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full bg-base-100 shadow-xl m-2">
                <div className="font-semibold text-2xl text-white p-4">Edit News</div>
                <div className="card-body">
                    <input type="text" placeholder="Title" className="input input-bordered w-full m-2" onChange={(title) => setTitle(title.target.value)} defaultValue={props.news.title} />
                    <textarea type="text" placeholder="Description" className="input input-bordered w-full m-2" onChange={(description) => setDescription(description.target.value)} defaultValue={props.news.description} rows={10}></textarea>
                    <input type="text" placeholder="Category" className="input input-bordered w-full m-2" onChange={(category) => setCategory(category.target.value)} defaultValue={props.news.category} />
                    <button className="btn btn-outline m-2" onClick={() => handleSubmit()}>Update</button>
                </div>
            </div>

        </div>
    )
}
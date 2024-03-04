import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function Dashboard({ auth, mynews }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const { flash } = usePage().props

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        router.post('/news', data)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        if (!mynews) {
            router.get('/news')
        }
        return;
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">My News</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 text-white">
                        {flash.message && (
                            <div role="alert" className="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{flash.message}</span>
                            </div>
                        )}
                        <input type="text" placeholder="Title" className="input input-bordered w-full m-2" onChange={(title) => setTitle(title.target.value)} value={title} />
                        <textarea type="text" placeholder="Description" className="input input-bordered w-full m-2" onChange={(description) => setDescription(description.target.value)} value={description} rows={10}></textarea>
                        <input type="text" placeholder="Category" className="input input-bordered w-full m-2" onChange={(category) => setCategory(category.target.value)} value={category} />
                        <button className="btn btn-outline m-2" onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
                <div className='p-8'>
                    {mynews && mynews.length > 0 ? mynews.map((news, i) => {
                        return (
                            <div key={i} className="card w-full bg-base-100 shadow-xl m-2">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{news.category}</div>
                                        <div className="badge badge-outline">
                                            <Link href={route('edit.news')} method='get' data={{ id: news.id }} as='button'>Edit</Link>
                                        </div>
                                        <div className="badge badge-outline">
                                            <Link href={route('delete.news')} method='post' data={{ id: news.id }} as='button'>Delete</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>You don't have new post news</p>

                    }

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

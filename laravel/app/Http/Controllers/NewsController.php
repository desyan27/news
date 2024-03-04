<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollect;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollect(News::OrderByDesc('id')->paginate(6));
        return Inertia::render('Homepage',[
            'title'=>'News Update Website',
            'description'=>'Welcome to News Update Homepage',
            'news'=> $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->save();
        return redirect()->back()->with('message','your news has success maked');

    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $mynews = $news::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard',[
            'mynews'=> $mynews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {
           return Inertia::render('EditNews', [
                'news' => $news->find($request->id)
           ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        News::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
    ]);
    return to_route('dashboard')->with('message', 'Update your post news has been success');
    
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $newsDelete = News::find($request->id);
        $newsDelete->delete();
        return redirect()->back()->with('message', 'your news has been succeed delete');
    }
}

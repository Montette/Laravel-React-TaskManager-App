<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
      $users = User::orderBy('created_at', 'desc')
                          ->withCount(['tasks' => function ($query) {
                            $query->where('is_completed', false);
                          }])
                          ->with(['tasks'])
                          ->get();

      return $users->toJson();
    }

    public function show($id)
    {
      // $project = Project::with(['tasks' => function ($query) {
      //   $query->where('is_completed', false);
      // }])->find($id);
      $user = User::with(['tasks'])->find($id);

      return $user->toJson();
    }

}

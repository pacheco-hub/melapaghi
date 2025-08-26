<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contatto;

class ContattiController extends Controller
{
    public function index()
    {
        return view('contatti.contatti');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|min:2',
            'email'   => 'required|email',
            'phone'   => 'nullable|string|max:50',
            'message' => 'required|string',
        ]);

        Contatto::create($data);

        return response()->json(['ok' => true]);
    }
}
?>
<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Initializer\Traits\ControllerTrait;
use Modules\Product\Entities\Tnved;

class TnvedController extends Controller
{
  use ControllerTrait;

  public $model;

  public function __construct()
  {
    $this->model = new Tnved();
  }

  /**
   * Show the form for creating a new resource.
   * @return Response
   */
  public function create()
  {
    return view('product::create');
  }

  /**
   * Store a newly created resource in storage.
   * @param  Request $request
   * @return Response
   */
  public function store(Request $request)
  {
  }

  /**
   * Show the specified resource.
   * @return Response
   */
  public function show()
  {
    return view('product::show');
  }

  /**
   * Show the form for editing the specified resource.
   * @return Response
   */
  public function edit()
  {
    return view('product::edit');
  }

  /**
   * Update the specified resource in storage.
   * @param  Request $request
   * @return Response
   */
  public function update(Request $request)
  {
  }

  /**
   * Remove the specified resource from storage.
   * @return Response
   */
  public function destroy()
  {
  }
}

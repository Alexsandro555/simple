<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Initializer\Traits\RelationTrait;
use Modules\Initializer\Traits\TableColumnsTrait;

class Producer extends Model
{
  use SoftDeletes, RelationTrait, TableColumnsTrait;

  public $form = [
    'id' => [
      'enabled' => true
    ],
    'title' => [
      'enabled' => true,
      'validations' => [
        'required' => true,
        'max' => 255
      ]
    ]
  ];

  protected $guarded = [];

  protected $dates = ['deleted_at'];

  public function line_products() {
    return $this->belongsToMany(LineProduct::class);
  }
}

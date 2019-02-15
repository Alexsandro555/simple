<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Initializer\Traits\TableColumnsTrait;
use Modules\Initializer\Traits\RelationTrait;
use Modules\Initializer\Traits\ClearCacheTrait;

class ProductCategory extends Model
{
  use SoftDeletes, TableColumnsTrait, RelationTrait, ClearCacheTrait;

  protected $dates = ['deleted_at'];

  protected $guarded = [];

  public $cacheModule = 'product';

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
    ],
    'description' => [
      'enabled' => true
    ]
  ];

  protected $table = 'product_categories';

  public function typeProducts() {
    return $this->hasMany(TypeProduct::class);
  }

  public function attributes() {
    return $this->morphToMany('Modules\Product\Entities\Attribute', 'attributable');
  }

  public function products() {
    return $this->hasMany(Product::class);
  }
}

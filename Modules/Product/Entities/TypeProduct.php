<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Files\Entities\File;
use Modules\Initializer\Traits\TableColumnsTrait;
use Modules\Initializer\Traits\RelationTrait;
use Modules\Initializer\Traits\ClearCacheTrait;

class TypeProduct extends Model
{
  use SoftDeletes, TableColumnsTrait, RelationTrait, ClearCacheTrait;

  protected $dates = ['deleted_at'];

  protected $guarded = [];

  public $cacheModule = 'product';

  protected $table = 'type_products';

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
    ],
    'product_category' => [
      'enabled' => true,
    ],
    'tnved' => [
      'enabled' => true,
    ]
  ];

  public function tnved() {
    return $this->belongsTo(Tnved::class);
  }

  public function product_category() {
    return $this->belongsTo(ProductCategory::class);
  }

  public function products() {
    return $this->hasMany(Product::class);
  }

  public function lineProducts() {
    return $this->hasMany(LineProduct::class);
  }

  public function files() {
    return $this->morphMany(File::class, 'fileable');
  }

  public function attributes() {
    return $this->morphToMany(Attribute::class, 'attributable');
  }
}

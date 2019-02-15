<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Files\Entities\File;
use Modules\Initializer\Traits\TableColumnsTrait;
use Modules\Initializer\Traits\RelationTrait;
use Modules\Initializer\Traits\ClearCacheTrait;

class LineProduct extends Model
{
  use SoftDeletes, TableColumnsTrait, RelationTrait, ClearCacheTrait;

  protected $dates = ['deleted_at'];

  protected $guarded = [];

  public $cacheModule = 'product';

  protected $table = 'line_products';

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
    'price_amount' => [
      'enabled' => true,
    ],
    'type_product' => [
      'enabled' => true,
    ]
  ];

  public function type_product() {
    return $this->belongsTo(TypeProduct::class);
  }

  public function producers() {
    return $this->belongsToMany(Producer::class);
  }

  public function products() {
    return $this->hasMany(Product::class);
  }

  public function files() {
    return $this->morphMany(File::class, 'fileable');
  }

  public function attributes() {
    return $this->morphToMany(Attribute::class, 'attributable');
  }
}

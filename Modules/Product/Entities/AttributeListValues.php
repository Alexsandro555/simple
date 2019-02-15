<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AttributeListValues extends Model
{
  use SoftDeletes;

  protected $guarded = [];

  public function attributes() {
    return $this->bolongsTo(Attribute::class);
  }
}

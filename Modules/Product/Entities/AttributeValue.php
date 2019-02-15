<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    protected $guarded = [];

    public function product() {
      $this->belongsTo(Product::class);
    }

    public function attribute() {
      return $this->belongsTo(Attribute::class);
    }

    public function getValueAttribute() {
      $attributeTypeId = $this->attribute->attribute_type_id;
      switch ($attributeTypeId) {
        case 1:
          return $this->attributes['boolean_value'];
        case 2:
          return $this->attributes['string_value'];
        case 3:
          return $this->attributes['date_value'];
        case 4:
          return $this->attributes['integer_value'];
        case 5:
          return $this->attributes['decimal_value'];
        case 6:
          return $this->attributes['list_value'];
      }
    }

    public function setValueAttribute($value) {
      $attributeTypeId = $this->attribute->attribute_type_id;
      switch ($attributeTypeId) {
        case 1:
          $this->attributes['boolean_value'] = $value;
          break;
        case 2:
          $this->attributes['string_value'] = $value;
          break;
        case 3:
          $this->attributes['date_value'] = $value;
          break;
        case 4:
          $this->attributes['integer_value'] = $value;
          break;
        case 5:
          $this->attributes['decimal_value'] = $value;
          break;
        case 6:
          $this->attributes['list_value'] = $value;
          break;
      }
    }
    protected $appends = ['value'];
}

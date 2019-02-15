<?php

namespace Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AttributeTypeTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Model::unguard();
    DB::table('attribute_types')->insert([
      [
        'title' => 'Выбор галочкой',
        'sort' => 1
      ],
      [
        'title' => 'Строковый',
        'sort' => 2
      ],
      [
        'title' => 'Дата',
        'sort' => 3
      ],
      [
        'title' => 'Текстовый',
        'sort' => 4
      ],
      [
        'title' => 'Денежный',
        'sort' => 5
      ],
      [
        'title' => 'Списковый',
        'sort' => 4
      ]
    ]);
    // $this->call("OthersTableSeeder");
  }
}

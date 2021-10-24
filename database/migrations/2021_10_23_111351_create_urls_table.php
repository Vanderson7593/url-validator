<?php

use App\Constants\Url;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUrlsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create(Url::TABLE_NAME, function (Blueprint $table) {
      $table->id();
      $table->string(Url::LABEL);
      $table->string(Url::URL);
      $table->string(Url::STATUS)->nullable();
      $table->text(Url::HTML)->nullable();
      $table->dateTime(Url::PROCESSED_AT)->nullable();
      $table->timestamps();

      $table->foreignId(Url::USER_ID)
        ->constrained()
        ->onUpdate('cascade')
        ->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists(Url::TABLE_NAME);
  }
}

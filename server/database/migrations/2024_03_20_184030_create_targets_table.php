<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id');
            $table->decimal('january');
            $table->decimal('february');
            $table->decimal('march');
            $table->decimal('april');
            $table->decimal('may');
            $table->decimal('june');
            $table->decimal('july');
            $table->decimal('august');
            $table->decimal('september');
            $table->decimal('october');
            $table->decimal('november');
            $table->decimal('december');
            $table->decimal('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('targets');
    }
};

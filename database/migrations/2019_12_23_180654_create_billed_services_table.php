<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Esta tabla contiene los servicios contratados por un cliente a lo largo de
// de su estancia.
class CreateBilledServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billed_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('reservation_id');
            $table->unsignedBigInteger('service_id');
            // Fecha en la que se contrata el servicio
            $table->dateTime('billed_on');
            // Determina si los gastos han sido incluidos ya en una factura
            $table->foreign('reservation_id')->references('id')->on('reservations');
            $table->foreign('service_id')->references('id')->on('services');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('billed_services');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Service;
use App\Services\HotelServicesService;
use App\Http\Requests\ServiceRequest;

class ServiceController extends Controller
{
    public function __construct(HotelServicesService $hotelService)
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
        $this->hotelService = $hotelService;
    }

    public function store(ServiceRequest $request)
    {
        $service = $this->hotelService->storeService($request);

        if (!$service) {
            return response()->json([
                "error" => "Service cannot be created."
            ], 500);
        }

        return response()->json(['service' => $service], 200);
    }

    public function update(ServiceRequest $request, $serviceId)
    {
        $service = $this->hotelService->updateService($request, $serviceId);

        if (!$service) {
            return response()->json([
                "error" => "Service cannot be updated."
            ], 500);
        }

        // Devolvemos el json con el perfil y codigo 200
        return response()->json(['service' => $service], 200);
    }

    public function destroy($id)
    {
        //
    }
}

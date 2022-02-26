<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;

class WebAdminMasters extends ApiController
{
	public function __construct()
    {
        parent::__construct($skip_authentication=true);
    }
}

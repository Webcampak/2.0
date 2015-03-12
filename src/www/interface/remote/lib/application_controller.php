<?php
/*
Copyright 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
This file is part of the Webcampak project.
Webcampak is free software: you can redistribute it and/or modify it 
under the terms of the GNU General Public License as published by 
the Free Software Foundation, either version 3 of the License, 
or (at your option) any later version.

Webcampak is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Webcampak. 
If not, see http://www.gnu.org/licenses/.
*/
/**
 * @class ApplicationController
 */
class ApplicationController {
    public $request, $id, $params;

    /**
     * dispatch
     * Dispatch request to appropriate controller-action by convention according to the HTTP method.
     */
	public function dispatch($request) {
		Log::debug("Log: /remote/lib/application_controller.php - dispatch()");	
		$this->request = $request;
		$this->id = $request->id;
		$this->params = $request->params;

		if ($request->isRestful()) {
			return $this->dispatchRestful();
		}
		if ($request->action) {
			return $this->{$request->action}();
		}
	}

	protected function dispatchRestful() {
		Log::debug("Log: /remote/lib/application_controller.php - dispatchRestful()");
		switch ($this->request->method) {
			case 'GET':
				Log::debug("Log: /remote/lib/application_controller.php - dispatchRestful() - GET");	
				return $this->view();
				break;
			case 'POST':
				Log::debug("Log: /remote/lib/application_controller.php - dispatchRestful() - POST");	
				return $this->create();
				break;
			case 'PUT':
				Log::debug("Log: /remote/lib/application_controller.php - dispatchRestful() - PUT");
				return $this->update();
				break;
			case 'DELETE':
				Log::debug("Log: /remote/lib/application_controller.php - dispatchRestful() - DELETE");	
				return $this->destroy();
				break;
		}
	}
}


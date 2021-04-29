<?php
class SearchController extends AppController {

	public $uses = array('User', 'Token', 'Company', 'ComercialZone', 'CompanyZone','CompanyKeyword','Keyword');

	public function search() {
        $response['estado']=0;
        $response['toast'] = 'Error en Buscador';
        $search = $this->request->data['search'];
        $kw = $this->Keyword->search($search);
        $r;
        if ($kw) {
            $r= $this->Company->search($search,$kw);
        }else{
            $r= $this->Company->search($search);
        }
        if ($r) {
            $response['estado'] = 1;
            $response['toast'] = 'Exito';
            $response['data'] = $r;
        }
        return json_encode($response, true);
	}
    public function searchZona() {
        $response['estado']=0;
        $response['toast'] = 'Error en Buscador';
        $search = $this->request->data['search'];
        $zona = $this->request->data['zona'];
        $kw = $this->Keyword->search($search);
        $r;
        if ($kw) {
            $r= $this->Company->searchZona($search,$zona,$kw);
        }else{
            $r= $this->Company->searchZona($search,$zona);
        }
        if ($r) {
            $response['estado'] = 1;
            $response['toast'] = 'Exito';
            $response['data'] = $r;
        }
        return json_encode($response, true);
    }
    public function searchSoloZona() {
        $response['estado']=0;
        $response['toast'] = 'Error en Buscador';
        $zona = $this->request->data['zona'];
        $r= $this->Company->searchSoloZona($zona);
        if ($r) {
            $response['estado'] = 1;
            $response['toast'] = 'Exito';
            $response['data'] = $r;
        }
        return json_encode($response, true);
    }
      public function findAll() {
        $response['estado']=0;
        $response['toast'] = 'Error en Buscador';
        $r= $this->Company->find('all');
        if ($r) {
            $response['estado'] = 1;
            $response['toast'] = 'Exito';
            $response['data'] = $r;
        }
        return json_encode($response, true);
    }
    
}
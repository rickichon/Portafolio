<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
	$dataWarehouse = [];

    // echo '<pre>'; var_dump($params); echo '</pre>';

    require('conexion.php');

    class Result {}
    
    
    $sql = mysqli_query($con, "SELECT * FROM almacen ORDER BY nombre ASC");
    while($row = mysqli_fetch_assoc($sql)){
        array_push($dataWarehouse, array_map('utf8_encode', $row));
    }

    // echo '<pre>'; var_dump($dataWarehouse); echo '</pre>';

    if ($dataWarehouse) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $dataWarehouse;

        echo json_encode($resp);
        // echo json_encode(array_map('utf8_encode', $resp));
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }

    // echo '<pre>'; var_dump($result); echo '</pre>';
?>
<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $students = [];
    $resultvale = json_decode($json);
    $resultvale = new Result(); 
    $resultvale-> tipo_vale = 2;
	$resultvale -> estado = 4;
    require('conexion.php');

    class Result {}
    
    $sqlVale = mysqli_query($con, "SELECT a.nombre AS nombreAsignatura, CONCAT(p.Nombre_per, ' ', p.apellido_pat, ' ', p.apellido_mat) nombreDocente, CONCAT(e.nombres, ' ', e.apellido_pat, ' ', e.apellido_mat) nombreEstudiante, CONCAT(e.grado, e.grupo) grupo, e.id_registro, v.nombre_lab, v.fecha, v.hora_entrada, v.hora_salida, v.plantel, v.tipo_vale, v.firma, esp.carrera, v.estado FROM paquete_asignatura AS pq INNER JOIN asignatura AS a INNER JOIN vales AS v INNER JOIN estudiantes AS e INNER JOIN personal AS p INNER JOIN especialidad AS esp ON pq.id_vale = v.id_vale AND pq.id_asignatura = a.id_asignatura AND v.id_registro = e.id_registro AND v.id_nomina = p.id_nomina AND esp.id_division = e.id_division WHERE v.tipo_vale = 2 AND v.estado = 4 AND  ");
    $resultVale = mysqli_fetch_assoc($sqlVale);

    if ($resultVale) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data[] = array_map('utf8_encode', $resultVale);

        echo json_encode($resp);
        // echo json_encode(array_map('utf8_encode', $resp));
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>
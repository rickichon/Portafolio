<?php
   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   header('Content-Type: application/json, charset=utf-8');

   $json = file_get_contents('php://input');
   $params = $json; 
   
   require('conexion.php');
   
   class Result {}  
   
   // echo "<pre>"; var_dump($params); echo "</pre>";
   
   if ($params == "0") {
      $sql = mysqli_query($con, "SELECT a.nombre AS nombreAsignatura, CONCAT(p.Nombre_per, ' ', p.apellido_pat, ' ', p.apellido_mat) nombreDocente, CONCAT(e.grado, e.grupo) grupo, e.id_registro, v.nombre_lab, v.fecha, v.hora_entrada, v.hora_salida, v.plantel, v.tipo_vale, v.firma, esp.carrera, v.estado FROM paquete_asignatura AS pq INNER JOIN asignatura AS a INNER JOIN vales AS v INNER JOIN estudiantes AS e INNER JOIN personal AS p INNER JOIN especialidad AS esp ON pq.id_vale = v.id_vale AND pq.id_asignatura = a.id_asignatura AND v.id_registro = e.id_registro AND v.id_nomina = p.id_nomina AND esp.id_division = e.id_division WHERE v.tipo_vale = 2 AND v.estado = 4");
   
      $debtsTeach = mysqli_fetch_assoc($sql);

      if($debtsTeach) {
         $resp = new Result();
         $resp->status = 'OK';
         $resp->data[] = array_map('utf8_encode', $debtsTeach);
         
         echo json_encode($resp, true);
      } else {
         $resp = new Result();
         $resp->status = 'ERROR';
         $resp->msg = 'No se han encontrado adeudos de docentes pendientes';
         
         echo json_encode($resp, true);
      }
   } else {
      $sql = mysqli_query($con, "SELECT a.nombre AS nombreAsignatura, CONCAT(p.Nombre_per, ' ', p.apellido_pat, ' ', p.apellido_mat) nombreDocente, CONCAT(e.nombres, ' ', e.apellido_pat, ' ', e.apellido_mat) nombreEstudiante, CONCAT(e.grado, e.grupo) grupo, e.id_registro, v.nombre_lab, v.fecha, v.hora_entrada, v.hora_salida, v.plantel, v.tipo_vale, v.firma, esp.carrera FROM paquete_asignatura AS pq INNER JOIN asignatura AS a INNER JOIN vales AS v INNER JOIN estudiantes AS e INNER JOIN personal AS p INNER JOIN especialidad AS esp ON pq.id_vale = v.id_vale AND pq.id_asignatura = a.id_asignatura AND v.id_registro = e.id_registro AND v.id_nomina = p.id_nomina AND esp.id_division = e.id_division WHERE v.tipo_vale = 2 AND v.estado = 4");

      $debtsStudent = mysqli_fetch_assoc($sql);

      if ($debtsStudent) {
         $resp = new Result();
         $resp->status = 'OK';
         $resp->data[] = array_map('utf8_encode', $debtsStudent);
   
         echo json_encode($resp, true);
      } else {
         $resp = new Result();
         $resp->status = 'ERROR';
         $resp->msg = 'No se han encontrado adeudos de docentes pendientes';
   
         echo json_encode($resp, true);
      }
   }
?>
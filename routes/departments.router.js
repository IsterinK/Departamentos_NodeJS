const express = require('express');
const router = express.Router();
const departmentsJSON = require('../json/departments.json');

/* Request http API RESTFUL */

/* Endpoint: http://localhost:4000/api/v1/departments */
router.get('/', (req, res) => {
  res.json(departmentsJSON);
});

/* Filtar por número de departamento */
/* Endpoint: http://localhost:4000/api/v1/departments/5 */
router.get('/:departmentId', (req,res) => {
  const {departmentId} = req.params
  const departments_municipalities = departmentsJSON.filter(
    (department)=>
      department['c_digo_dane_del_departamento'] === departmentId
  );
  res.json(departments_municipalities);
})

/* Consultar departamentos con nombre de más de 8 carácteres */
/* Endpoint: http://localhost:4000/api/v1/departments/name */
router.get('/name', (req,res) => {
  const departments = departmentsJSON.filter(
    (department) =>
      department["departamento"].length > 8
    );
  res.json(departmentsJSON);
})

/* 1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
/* EndPoint :  http://localhost:4000/api/v1/departments/point/1 */
router.get('/point/1', (req,res)=>{
    const departments = departmentsJSON.filter(
      (department) => Number.parseInt(department['c_digo_dane_del_departamento']) > 15 && Number.parseInt(department['c_digo_dane_del_departamento']) < 20
    );
    res.json(departments);
});

/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON*/
/*  EndPoint :  http://localhost:4000/api/v1/departments/point/2/5  */
router.get('/point/2/:departmentCode?', (req,res)=>{
    const departmentCode = req.params.departmentCode;
    if(departmentCode){
      const department_municipalities = departmentsJSON.filter(
        (department)=>
          department['c_digo_dane_del_departamento'] === departmentCode
      );
      res.json(department_municipalities);
    }else{
      res.json(departmentsJSON);
    }
});

/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas */
/* EndPoint :  http://localhost:4000/api/v1/departments/point/3/name */
router.get('/point/3/:departmentName?', (req,res)=>{
  const departmentName = req.params.departmentName;
  if(departmentName){
    const department_municipalities = departmentsJSON.filter(
      (department)=>
        department['departamento'] === departmentName
    );
    res.json(department_municipalities);
  }else{
    const departments = departmentsJSON.filter(
      (department)=>
        department['departamento'] === "Caldas"
    );
    res.json(departments);
  }
});

/* 4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */
/* EndPoint :  http://localhost:4000/api/v1/departments/point/4 */
router.get('/point/4', (req,res)=>{
  const departments = departmentsJSON.filter(
    (department)=>
      department['departamento'].charAt(0) === "C" || department['departamento'].charAt(0) === "c"
  );
  res.json(departments);
});

module.exports = router
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';

export default function ListadoEmpleados() {

    const urlBase = 'http://localhost:8081/recursoshumanos-app/empleados';

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, []);
    const cargarEmpleados = async () => {
        try {
            const resultado = await axios.get(urlBase);
            console.log("Resultado cargar empleados", resultado.data);
            setEmpleados(resultado.data);
        } catch (error) {
            console.error("Error al cargar empleados:", error.message);
        }
    };
    

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3> sistema de  recursos humanos </h3>
            </div>
            <table className="table table-striped table-hover aligin-middle">
                <thead className='table-dark' >
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Sueldo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //iterammos el arreglo de empleados
                        empleados.map((empleado, indice) => (
                            <tr key={indice}>
                                <th scope="row">{empleado.idEmpleado}</th>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.departamento}</td>
                                <td><NumericFormat value={empleado.sueldo}
                                    displayType={'text'}
                                    thousandSeparator=',' prefix={'$'}
                                    decimalScale={2} fixedDecimalScale/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

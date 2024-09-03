cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    
}

mostrarCuentas=function(){
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
        let cmpTabla=document.getElementById("tablaCuentas");
        let cuenta;
        let contenidoTabla="<table><tr><th>Nº CUENTA</th><th>NOMBRE</th><th>SALDO</th></tr>"
        for(let i=0;i<cuentas.length;i++){
            cuenta=cuentas[i];
            contenidoTabla+=
            "<td>"+cuenta.numeroCuenta+"</td>"+
            "<td>"+cuenta.nombre+" "+cuenta.apellido+"</td>"+
            "<td>"+cuenta.saldo+"</td></tr>";
        }
        contenidoTabla+="</table>";
        cmpTabla.innerHTML=contenidoTabla;
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    let cuenta;
    let cuentaEncontrada=null;
    for(i=0;i<cuentas.length;i++){
        cuenta=cuentas[i];
        if(numeroCuenta==cuenta.numeroCuenta){
            cuentaEncontrada=cuenta;
            break;
        }
    }
    return cuentaEncontrada;
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta=function(cuenta){
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
    let cuentaEncontrada=buscarCuenta(cuenta.numeroCuenta);
    if(cuentaEncontrada==null){
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA");
    }
    else{
        alert("CUENTA EXISTENTE");
    }
}

agregar=function(){
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas
    let numeroCuenta=recuperarTexto("txtNumeroCuenta");
    let cedula=recuperarTexto("txtCedula");
    let nombre=recuperarTexto("txtNombre");
    let apellido=recuperarTexto("txtApellido");
    let cuenta={};
    cuenta.numeroCuenta=numeroCuenta;
    cuenta.cedula=cedula;
    cuenta.nombre=nombre;
    cuenta.apellido=apellido;
    cuenta.saldo=0.0;
    agregarCuenta(cuenta);
    mostrarCuentas();
}

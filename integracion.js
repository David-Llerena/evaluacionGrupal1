let cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

let movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos


cargarInicioCuentas=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();
}

cargarInicioTransacciones=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
}

cargarInicioMovimientos=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

///////////////////////////////////////
////////CUENTAS

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


/////////////////////////////////////////////////////////////////////
/////////////TRANSACCIONES

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let numeroCuenta=recuperarTexto("txtNumeroCuentaTransaccion");
    let cuentaEncontrada=buscarCuenta(numeroCuenta);
    if(cuentaEncontrada==null){
        alert("CUENTA INEXISTENTE");
    }
    else{
        mostrarTexto("lbCedula", cuentaEncontrada.cedula);
        mostrarTexto("lbNombreApellido", cuentaEncontrada.nombre+" "+cuentaEncontrada.apellido);
        mostrarTexto("lbSaldo", cuentaEncontrada.saldo);
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
    }
}



ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    let numeroCuenta=recuperarTexto("txtNumeroCuentaTransaccion");
    let monto=recuperarTexto("txtMonto");
    depositar(numeroCuenta, monto);
    alert("TRANSACCION EXITOSA");
    let cuenta=buscarCuenta(numeroCuenta);
    mostrarTexto("lbSaldo", cuenta.saldo);

}

ejecutarRetiro=function(){
    let numeroCuenta=recuperarTexto("txtNumeroCuentaTransaccion");
    let monto=recuperarTexto("txtMonto");
    retirar(numeroCuenta, monto);
}


depositar=function(numeroCuenta, monto){
    let cuentaAfectada;
    let movimiento={};
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada=buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo+=parseFloat(monto);
    movimiento.numeroCuenta=numeroCuenta;
    movimiento.monto=monto;
    movimiento.tipo="C";
    movimientos.push(movimiento);

}

retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    let movimiento={};
    cuentaAfectada=buscarCuenta(numeroCuenta);
    if(cuentaAfectada.saldo>=monto ){
        cuentaAfectada.saldo-=parseFloat(monto);
        alert("TRANSACCION EXITOSA");
        mostrarTexto("lbSaldo", cuentaAfectada.saldo);
        movimiento.numeroCuenta=numeroCuenta;
        movimiento.monto=monto;
        movimiento.tipo="D";
        movimientos.push(movimiento);
    }
    else{
        alert("SALDO INSUFICIENTE");
    }
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
}


/////////////////////////////////////////////////////////////////
///////////////////MOVIMIENTOS

filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    let cuentaRecuperada;
    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    for(let i=0;i<movimientos.length;i++){
        cuentaRecuperada=movimientos[i];
        if(cuentaRecuperada.numeroCuenta==numeroCuenta){
            movimientosCuenta.push(cuentaRecuperada);
        }
    }
    mostrarMovimientos(movimientosCuenta);
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
    let cmpTabla=document.getElementById("tablaMovimientos");
        let movimiento;
        let monto;
        let contenidoTabla="<table><tr><th>Nº CUENTA</th><th>MONTO</th><th>TIPO</th></tr>"
        for(let i=0;i<misMovimientos.length;i++){
            movimiento=misMovimientos[i];
            if(movimiento.tipo=="D"){
                monto=-movimiento.monto;
            }
            else{
                monto=movimiento.monto;
            }
            contenidoTabla+=
            "<td>"+movimiento.numeroCuenta+"</td>"+
            "<td>"+monto+"</td>"+
            "<td>"+movimiento.tipo+"</td></tr>";
        }
        contenidoTabla+="</table>";
        cmpTabla.innerHTML=contenidoTabla;
}

ejecutarMostrarMovimientos=function(){
    let numeroCuenta=recuperarTexto("txtNumeroCuentaMovimientos");
    filtrarMovimientos(numeroCuenta);
}


cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
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

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let numeroCuenta=recuperarTexto("txtNumeroCuenta");
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
    let numeroCuenta=recuperarTexto("txtNumeroCuenta");
    let monto=recuperarTexto("txtMonto");
    depositar(numeroCuenta, monto);
    alert("TRANSACCION EXTIOSA");
    let cuenta=buscarCuenta(numeroCuenta);
    mostrarTexto("lbSaldo", cuenta.saldo);
}

ejecutarRetiro=function(){
    let numeroCuenta=recuperarTexto("txtNumeroCuenta");
    let monto=recuperarTexto("txtMonto");
    retirar(numeroCuenta, monto);
}

depositar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada=buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo+=parseFloat(monto);
}

retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
    cuentaAfectada=buscarCuenta(numeroCuenta);
    if(cuentaAfectada.saldo>=monto ){
        cuentaAfectada.saldo-=parseFloat(monto);
        alert("TRANSACCION EXITOSA");
        mostrarTexto("lbSaldo", cuentaAfectada.saldo);
    }
    else{
        alert("SALDO INSUFICIENTE");
    }

}
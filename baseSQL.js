var mysql = require('mysql')


//conexcion SQL
var conexion = mysql.createConnection({
    host:'127.0.0.1',
    database:'fevaData',
    user:'root',
    port:'3306',
    

});
conexion.connect(function(error){
    if(error){
        
        throw error;
    }else{
        console.log('Conexion MySql OK')
    }
});

module.exports = conexion 
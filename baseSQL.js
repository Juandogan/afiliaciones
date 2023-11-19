var mysql = require('mysql')


//conexcion SQL
var conexion = mysql.createConnection({
    host:'159.65.226.14',
    database:'sistemaf_feva',
    password:'UNdianuevo.12',
    user:'afiliaciones',
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
const router = require('express').Router()
const conexion = require('../baseSQL')

//GET A TODOS LOS JUGADORES
router.get('/', (req,res)=>{
    let sql = 'select * from juagadores'
    conexion.query(sql,(err,rows, fields)=>{
    if(err) throw err;
    else{res.json(rows)}
    })
});

//GET A 1 JUGADORES
router.get('/:id', (req,res)=>{
    const {id} = req.params
    let sql = 'select * from juagadores where idjuagadores = ?'
    conexion.query(sql,[id],(err,rows, fields)=>{
    if(err) throw err;
    else{res.json(rows)}
    })
} )

//agregar Usuario
router.post('/', (req, res)=>{
const {Nombre, dni} = req.body
let sql = `insert into juagadores(nombre,dni) values ('${Nombre}','${dni}')`
conexion.query(sql, (err,rows, fields)=>{
    if(err) throw err;
    else{res.json({'status':'Guardado'})}
    })

});

// eliminar Usuario
router.delete('/:id', (req,res)=>{
    const {id} = req.params
    let sql = `delete from juagadores where idjuagadores = '${id}'`
    conexion.query(sql,[id],(err,rows, fields)=>{
    if(err) throw err;
    else{res.json({'status':'eliminado'})}
    })
} )

// Modiicar Usuario
router.put('/:id', (req,res)=>{
    const {id} = req.params
    const {Nombre, dni} = req.body
    let sql = `update juagadores set 
    Nombre = '${Nombre}',
    dni = '${dni}' where idjuagadores = '${id}'`
    conexion.query(sql,(err,rows, fields)=>{
    if(err) throw err;
    else{res.json({'status':'Usuario Modificado'})}
    })
} )




module.exports = router
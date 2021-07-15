const { response, request } = require('express');
const {Pool}= require('pg');
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5067',
    port:5432
})


const getHorrorById = (request, response) => {
    const id = parseInt(request.params.id);
        pool.query('select * FROM gis_osm_roads_free_1 WHERE gid = $1', [id], (error, results) => {
            response.status(200).json(results.rows);
            
        });
    
};
const getHorrorById2 = (request, response) => {
    const id = parseInt(request.params.id);
        pool.query('select row_to_json(fc) as geojson from (select \'FeatureCollection\' as type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:3857\')) as crs,array_to_json(array_agg(f)) as features from (select \'Feature\' as type, st_asGeoJson(ST_Transform(st_setsrid(ST_Collect(geom::geometry),4326),3857),0)::json as geometry from gis_osm_natural_a_free_1 WHERE gid =$1 ) as f) as fc ', [id], (error, results) => {
            response.status(200).json(results.rows);
            
        });
        
    
};
const getHorrorByAll = (request, response) => {
        pool.query('SELECT * FROM gis_osm_roads_free_1 ',(error, results) => {
            response.status(200).json(results.rows);
        });
    
};
const save=(request,response)=>{
    var id =request.body; 
    pool.query('INSERT INTO squregrid (info) VALUES ($1)',[id],(error, results) => {
        response.status(200).json(results.rows);
        
    });

}
const squareGrid=(request,response)=>{
    pool.query('SELECT info FROM squregrid ',(error, results) =>{
        response.status(200).json(results.rows);
    });
}
const save2=(request,response)=>{
    var id = request.body;
    var dd=Object.keys(id);
        id=dd[0];
    //console.log(id);
    pool.query('INSERT INTO squregrid2 (info) VALUES (st_asbinary(st_geomfromtext($1,4326)))',[id],(error, results) => {
        
        
    });
}
const loding=(request,response) =>{
    pool.query('select row_to_json(fc) as squareGrid from (select \'FeatureCollection\' AS type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:3857\')) as crs, array_to_json(array_agg(f)) as features from (select \'Feature\' as type,  st_asGeoJson(ST_Transform(st_setsrid((info::geometry),4326),4326),0)::json as geometry from squregrid2 ) as f) as fc ',(error, results) =>{
        response.status(200).json(results.rows);
    });
} 

module.exports ={
    getHorrorById,
    getHorrorById2,
    getHorrorByAll,
    save,
    squareGrid,
    save2,
    loding
};
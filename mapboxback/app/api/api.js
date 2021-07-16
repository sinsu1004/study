const { response, request } = require('express');
const {Pool}= require('pg');
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5067',
    port:5432
})



const roder =(request,response) => {
    pool.query('select row_to_json(fc) as test2 from (select \'FeatureCollection\' AS type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:4326\')) as crs, array_to_json(array_agg(f)) as features from (select \'Feature\' as type,  st_asGeoJson(st_setsrid((geom::geometry),4326),100)::json as geometry , id AS ID from test2 ) as f) as fc ',(error, results) =>{
        response.status(200).json(results.rows);
    });
}
const test = (request, response) => {
        
        pool.query('select st_astext((st_dump(geom)).geom) AS geom FROM gis_osm_natural_a_free_1', (error, results) => {
            response.status(200).json(results.rows);
            var save=results.rows;
            var real;
            console.log(save[0]["geom"]);
            console.log(save.length);
            for(let i=0;i<save.length;i++){
                real=save[i]["geom"];
                pool.query('INSERT INTO test2 (geom) VALUES (st_asbinary(st_geomfromtext($1,4326)))',[real],(error, results) => {
                console.log(i)

                });
            }
        });
        
    
};
const getHorrorById2 = (request, response) => {
    
        pool.query('select row_to_json(fc) as geojson from (select \'FeatureCollection\' as type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:4326\')) as crs,array_to_json(array_agg(f)) as features from (select \'Feature\' as type, st_asGeoJson(st_setsrid((geom::geometry),4326),100)::json as geometry from gis_osm_natural_a_free_1  ) as f) as fc  ', (error, results) => {
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

var idx = 0;

const save2=(request,response)=>{
    var id = request.body;
    var dd=Object.keys(id);
        id=dd[0];
    
    //pool.query('INSERT INTO squregrid2 (info) VALUES (st_asbinary(st_geomfromtext($1,4326)))',[id],(error, results) => {
    pool.query('INSERT INTO squregrid2 (info) VALUES (st_asbinary(st_geomfromtext($1,4326)))',[id],(error, results) => {
    
        
    });
 
    
}
const loding=(request,response) =>{
    pool.query('select row_to_json(fc) as squareGrid from (select \'FeatureCollection\' AS type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:3857\')) as crs, array_to_json(array_agg(f)) as features from (select \'Feature\' as type,  st_asGeoJson(st_setsrid((info::geometry),4326),100)::json as geometry , id AS ID from squregrid2 ) as f) as fc ',(error, results) =>{
        response.status(200).json(results.rows);
    });
} 

module.exports ={
    test,
    getHorrorById2,
    getHorrorByAll,
    save,
    squareGrid,
    save2,
    loding,
    roder
};
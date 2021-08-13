const { polygon } = require('@turf/turf');
const { response, request } = require('express');
const {Pool}= require('pg');
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5067',
    port:5432
})
const buydata=(request,response)=>{
    var data=request.body;
    var td=data["data"];

    pool.query('select username from aa2 where pagename=$1',[td],(error, results) => {
    
        if(results.rows!=''){
                var ho=results.rows[0]["username"];
                pool.query('select pagename,gid,username,country from aa2 where username=$1',[ho],(error,results)=>{
                    response.status(200).json(results.rows);
                });
            
        }
        else{
            
            response.status(200).json(results.rows);
        }
        });
}

const tiledata =(request,response)=>{
    var data=request.body;
    var test=data["data"];
    var test2=data["pn"];
    
    for(let i=0;i<test.length;i++){
        // pool.query('update aa set pagenumber=$1,buy=TRUE where pagename=$2',[test2,test[i]], (error, results) => {
        //     response.status(200)

        //     });
        pool.query('update aa set buy=TRUE where pagename=$1',[test[i]],(error,results)=>{
            
        });
        pool.query('select gid,pagename,pagenumber,geom from aa where pagename=$1',[test[i]],(error,results) =>{
            pool.query('insert into aa2 (gid,pagename,pagenumber,geom,username) values ($1,$2,$3,$4,$5)',[results.rows[0]["gid"],results.rows[0]["pagename"],results.rows[0]["pagenumber"],results.rows[0]["geom"],test2],(error,results)=>{

            });
        
        });
    }
    
}

const datatest =(request,response) =>{
    var data=request.body;
    var id=Object.values(data);
    pool.query('select row_to_json(fc) as db from (select \'FeatureCollection\' AS type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:4326\')) as crs, array_to_json(array_agg(f)) as features from (select \'Feature\' as type,  st_asGeoJson(st_setsrid(((st_dump(geom)).geom::geometry),4326),100)::json as geometry ,row_to_json((gid, pagename,buy)) AS properties,gid AS ID  from aa where geom && ST_MakeEnvelope( $1, $2, $3 ,$4 , 4326)) as f) as fc',[id[0],id[1],id[2],id[3]],(error, results) =>{
        response.status(200).json(results.rows);
    });
}

const userdata =(request,response) =>{
    var data=request.body;
    var id=Object.values(data);
    
    pool.query('select row_to_json(fc) as db from (select \'FeatureCollection\' AS type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:4326\')) as crs, array_to_json(array_agg(f)) as features from (select \'Feature\' as type,  st_asGeoJson(st_setsrid(((st_dump(geom)).geom::geometry),4326),100)::json as geometry ,row_to_json((gid, pagename,country)) AS properties,gid AS ID  from aa2 where geom && ST_MakeEnvelope( $1, $2, $3 ,$4 , 4326)) as f) as fc',[id[0],id[1],id[2],id[3]],(error, results) =>{
        response.status(200).json(results.rows);
    });
}


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
    roder,
    datatest,
    tiledata,
    buydata,
    userdata,
    

    
};
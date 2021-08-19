const { polygon } = require('@turf/turf');
const { response, request } = require('express');
const {Pool}= require('pg');
const pool=new Pool({
    user: 'postgres',
    host: '192.168.219.9',
    database: 'postgres',
    password: 'elqpffhr1!',
    port:5432
})
// pool.connect((err)=>{
//     if(err){
//         console.log("연결실패");
//         console.log(err);
//     }
//     if(!err){
//         console.log("연결성공");
//     }
// })

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
    pool.query('select row_to_json(fc) as db from (select \'FeatureCollection\' AS type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:4326\')) as crs, array_to_json(array_agg(f)) as features from (select \'Feature\' as type,  st_asGeoJson(st_setsrid(((st_dump(geom)).geom::geometry),4326),100)::json as geometry ,row_to_json((gid, pagename)) AS properties,gid AS ID  from zq_world.data_1 where geom && ST_MakeEnvelope( $1, $2, $3 ,$4 , 4326)) as f) as fc',[id[0],id[1],id[2],id[3]],(error, results) =>{
        response.status(200).json(results.rows);
        
    });
    
}

const userdata =(request,response) =>{
    var data=request.body;
    var id=Object.values(data);
    
    pool.query('select row_to_json(fc) as db from (select \'FeatureCollection\' AS type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:4326\')) as crs, array_to_json(array_agg(f)) as features from (select \'Feature\' as type,  st_asGeoJson(st_setsrid(((st_dump(geom)).geom::geometry),4326),100)::json as geometry ,row_to_json((gid, pagename)) AS properties,gid AS ID  from zq_world.data_2 where geom && ST_MakeEnvelope( $1, $2, $3 ,$4 , 4326)) as f) as fc',[id[0],id[1],id[2],id[3]],(error, results) =>{
        response.status(200).json(results.rows);
    });
}

 

module.exports ={
   
    datatest,
    tiledata,
    buydata,
    userdata,
  
};
const Pool= require('pg').Pool;
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5067',
    port:5432
})
pool.connect();

const getHorrorById = (request, response) => {
    const id = parseInt(request.params.id);
        pool.query('select * FROM gis_osm_roads_free_1 WHERE gid = $1', [id], (error, results) => {
            results;
        });
    
}

const getHorrorById2 = (request, response) => {
    const id = parseInt(request.params.id);
        pool.query('select row_to_json(fc) as geojson from (select \'FeatureCollection\' as type, json_build_object(\'type\',\'name\',\'properties\', json_build_object(\'name\',\'EPSG:3857\')) as crs,array_to_json(array_agg(f)) as features from (select \'Feature\' as type, st_asGeoJson(ST_Transform(st_setsrid(ST_Collect(geom::geometry),4326),3857),0)::json as geometry from gis_osm_natural_a_free_1 WHERE gid =$1 ) as f) as fc ', [id], (error, results) => {
            results;
        });
        
    
};

const getHorrorByAll = (request, response) => {
        pool.query('SELECT * FROM gis_osm_roads_free_1 ',(error, results) => {
            results;
        });
    
};
const save=(request,response)=>{
    const id = parseInt(request.params.id);
    pool.query('INSERT INTO squregrid (info) VALUES ($1)',[id])
}

module.exports ={
    getHorrorById,
    getHorrorById2,
    getHorrorByAll,
    save
};
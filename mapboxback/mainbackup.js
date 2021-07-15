mapboxgl.accessToken =
"pk.eyJ1Ijoic2hpbnNldW5naHVuIiwiYSI6ImNrcWhkemdndjAxdGUycG5xcjB2bGc5aWQifQ.0z7oaAfK7ZTR87eXB5Fb2g";
//토큰 부분

var map = new mapboxgl.Map({
container: "map", // container id
style: "mapbox://styles/shinseunghun/ckqk701521far18myv7jfw6on", // style URL
center: [126.98885600860226, 37.56229581976776], // starting position [lng, lat]
zoom:7, // starting zoom
});


var hoveredStateId = null;
//map 불러오는 부분
//map.showTileBoundaries = true;
var bbox = [126.3, 34.7 ,129.5, 38.3];
var cellSide = 50;
var options = 'kilometers';
var squareGrid = turf.squareGrid(bbox, cellSide, options);
for(let i=0;i<squareGrid.features.length;i++){
  
  squareGrid["features"][i].id=i;
  $.ajax({
    url:'http://localhost:5000/test/save',
    data:squareGrid["features"][i],
    type:'POST',
  })
}

var size=new Array();

document.getElementById('zoom').addEventListener('click',function(){

  size.forEach(item=>{
    map.setFeatureState(
      { source: 'grid', id: item },
      { hover: false }
      );
  });
  size.length=0;

});

document.getElementById('zoom2').addEventListener('click',function(){
  $.ajax({
    url:'http://localhost:5000/test/t/25',
    type:'GET',
    success:function(tr){
      alert(tr[0].geojson.features[0].geometry.type);
    }
  })


});



map.on('load', function() {
  map.addSource('grid', {
      'type': "geojson",
      'data': squareGrid
  });
 

  map.addLayer({
      'id': 'grid',
      'type': 'line',
      'source': 'grid',
      'paint': {
          'line-color': 'gray',
      }
  });

  map.addLayer({
    'id': 'grid-fill',
    'type': 'fill',
    'source': 'grid',
    'layout': {},
    'paint': {
    'fill-color': '#627BC1',
    'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    1,
    0.5
    ]
    }
  });
  


  map.on('click','grid-fill',function(e){
      
    
    hoveredStateId = e.features[0].id;
    size.push(hoveredStateId);
    map.setFeatureState(
    { source: 'grid', id: hoveredStateId },
    { hover: true }
    );


  });


   
  });



var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
});
// 검색창 생성





document.getElementById("geocoder").appendChild(geocoder.onAdd(map)); // 검색창 넣기

map.addControl(new mapboxgl.NavigationControl()); //지도 탐색 컨트롤 표시




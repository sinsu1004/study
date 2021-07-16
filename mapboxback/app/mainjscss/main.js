

mapboxgl.accessToken =
"pk.eyJ1Ijoic2hpbnNldW5naHVuIiwiYSI6ImNrcWhkemdndjAxdGUycG5xcjB2bGc5aWQifQ.0z7oaAfK7ZTR87eXB5Fb2g";
//토큰 부분
var squareGrid;
var map = new mapboxgl.Map({
container: "map", // container id
style: "mapbox://styles/shinseunghun/ckqqa24e22qdh17q0k9fh7bnj", // style URL
center: [126.98885600860226, 37.56229581976776], // starting position [lng, lat]
zoom:7, // starting zoom
});
var road;
var test;
var hoveredStateId = null;

//map 불러오는 부분
//map.showTileBoundaries = true;


// 데이터 베이스에서 네모 호출

$.ajax({
  url:'http://localhost:5000/test/loding',
  type:'POST',
  datatype:'json',
  async:false,
  success:function(tr){
    squareGrid=tr;
  }
})
squareGrid=squareGrid[0];
squareGrid=squareGrid["squaregrid"];

$.ajax({
  url:'http://localhost:5000/test/loder',
  type:'POST',
  datatype:'json',
  async:false,
  success:function(a){
    test=a;
  }
})
test=test[0];
test=test["test2"];




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
  size.forEach(item=>{
    map.setFeatureState(
      { source: 'test', id: item },
      { hover: false }
      );
  });
  size.length=0;
});
function pluselayer(data,sourcename,lineid,linecolor,fillid,fillcolor){
  map.addSource(sourcename, {
    'type': "geojson",
    'data':data
  });
  map.addLayer({
      'id': lineid,
      'type': 'line',
      'source': sourcename,
      'paint': {
          'line-color': linecolor,
      }});
  map.addLayer({
    'id': fillid,
    'type': 'fill',
    'source': sourcename,
    'layout': {},
    'paint': {
    'fill-color': fillcolor,
    'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    1,
    0.5
    ]
    }
  });
};
function clickevent(layerid,sources){
  map.on('click',layerid,function(e){
    
  
    hoveredStateId = e.features[0].id;
    size.push(hoveredStateId);
    map.setFeatureState(
    { source: sources, id: hoveredStateId },
    { hover: true }
    ); 
  });
  
  };





map.on('load', function() {
  pluselayer(test,'test','test','red','test-fill','red');
  clickevent('test-fill','test');

  pluselayer(squareGrid,'grid','grid','gray','grid-fill','#627BC1');
  clickevent('grid-fill','grid');
});

  
var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
});
// 검색창 생성





document.getElementById("geocoder").appendChild(geocoder.onAdd(map)); // 검색창 넣기

map.addControl(new mapboxgl.NavigationControl()); //지도 탐색 컨트롤 표시




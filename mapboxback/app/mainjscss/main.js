

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


var hoveredStateId = null;

//map 불러오는 부분
//map.showTileBoundaries = true;


// 데이터 베이스에서 네모 호출
/*
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

*/

var bbox = [126.3, 34.7 ,129.5, 38.3];
var cellSide = 50;
var options = 'kilometers';
var squareGrid = turf.squareGrid(bbox, cellSide, options);
let a=[];
for(let i=0;i<squareGrid.features.length;i++){
  
  squareGrid["features"][i].id=i;

 var s=squareGrid["features"][i].geometry.type;
 s+="((";
 for(let l=0;l<5;l++){
 for(let k=0; k<2;k++){
 s+=squareGrid["features"][i].geometry.coordinates[0][l][k];
 if(k!=1){
  s+=" ";
 }
}
  if(l!=4){
  s+=",";
  }
}
s+="))";
a.push(s);
 
}

for(let i=0;i<a.length;i++){
  $.ajax({
    url:'http://localhost:5000/test/ss',
    data:a[i],
    //async:false,
    type:'POST',
  })
  console.log(i);
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
      var road=tr;

    }
  })


});



map.on('load', function() {
  map.addSource('grid', {
      'type': "geojson",
      'data':squareGrid
  });
 

  // map.addLayer({
  //     'id': 'grid',
  //     'type': 'line',
  //     'source': 'grid',
  //     'paint': {
  //         'line-color': 'gray',
  //     }
  // });

  // map.addLayer({
  //   'id': 'grid-fill',
  //   'type': 'fill',
  //   'source': 'grid',
  //   'layout': {},
  //   'paint': {
  //   'fill-color': '#627BC1',
  //   'fill-opacity': [
  //   'case',
  //   ['boolean', ['feature-state', 'hover'], false],
  //   1,
  //   0.5
  //   ]
  //   }
  // });
  


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




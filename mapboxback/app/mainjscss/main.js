


mapboxgl.accessToken =
"pk.eyJ1Ijoic2hpbnNldW5naHVuIiwiYSI6ImNrcWhkemdndjAxdGUycG5xcjB2bGc5aWQifQ.0z7oaAfK7ZTR87eXB5Fb2g";
//토큰 부분
var squareGrid;
var map = new mapboxgl.Map({
container: "map", // container id
style: "mapbox://styles/shinseunghun/ckqqa24e22qdh17q0k9fh7bnj", // style URL
center: [127.0206028067314, 37.50301483475639], // starting position [lng, lat]
zoom:15, // starting zoom
});
var road;
var test;
var db;
var db2;
var dbtest;
var hoveredStateId = null;
var gridname;
var test2=new Array();
var connect;

//random
var randomNum;
var randomNumFloor;

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

$.ajax({
  url:'http://localhost:5000/test/data',
  type:'POST',
  datatype:'json',
  async:false,
  success:function(a){
    
    db=a;
  }
})
db=db[0];
db=db["db"];

$.ajax({
  url:'http://localhost:5000/test/data2',
  type:'POST',
  datatype:'json',
  async:false,
  success:function(a){
    db2=a;
  }
})
db2=db2[0];
db2=db2["db"];







var size=new Array();

document.getElementById('zoom').addEventListener('click',function(){

  size.forEach(item=>{
    map.setFeatureState(
      { source: 'db', id: item },
      { hover: false }
      );
  });
  size.length=0;
  test2=[];
  note.innerHTML="";
  document.getElementById('pn').value="";
  
});
document.getElementById('zoom2').addEventListener('click',function(){
  var pns=document.getElementById('pn').value;
  
  $.ajax({
    url: "http://localhost:5000/test/dd",
    type:'POST',
    traditional:true,
    data:{
      data:test2,
      pn:pns
    },


    


  });

  alert("저장되었습니다.");
});
var note=document.getElementById('note');
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
    'layout': {

    },
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
    
    gridname = e.features[0].properties.f2;
    hoveredStateId = e.features[0].id;

    $.ajax({
    url: "http://localhost:5000/test/dd2",
    type:'POST',
    traditional:true,
    
    
    data:{
      data:gridname
    },
    success:function(a){
       connect=a;
       if(connect!=null){
        for(let i=0;i<connect.length;i++){
          map.setFeatureState(
            { source: sources, id: connect[i]["gid"] },
            { hover: true }
            ); 
            size.push(connect[i]["gid"]);
          note.innerHTML+=connect[i]["pagename"];
          note.innerHTML+=", ";
          }
          document.getElementById('pn').value=connect[0]["username"];
          connect=null;
         
       }
       else{ 
       
        connect=null;

        }

    },
  });
  


    
    size.push(hoveredStateId);
    map.setFeatureState(
    { source: sources, id: hoveredStateId },
    { hover: true }
    ); 
    test2.push(e.features[0].properties.f2);
    note.innerHTML +=e.features[0].properties.f2;
    note.innerHTML+=", ";
    

  });
  
  
  
  };
  




map.on('load', function() {

  
  pluselayer(test,'test','test','red','test-fill','red');
  clickevent('test-fill','test');

  pluselayer(squareGrid,'grid','grid','gray','grid-fill','#627BC1');
  clickevent('grid-fill','grid');

  pluselayer(db,'db','db','gray','db-fill','gray');
  clickevent('db-fill','db');
  

  
 map.addSource('db2', {
    'type': "geojson",
    'data':db2
  });
  map.addLayer({
      'id': 'db2',
      'type': 'line',
      'source': 'db2',
      'paint': {
          'line-color': 'red',
      }});
  map.addLayer({
    'id': 'db2-fill',
    'type': 'fill',
    'source': 'db2',
    'layout': {

    },
    'paint': {
    'fill-color': 'red',
    'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], true],
    0.5,
    0.5
    ]
    }
  });


 
  

  

 
  

  map.loadImage(
    'https://docs.mapbox.com/mapbox-gl-js/assets/colorado_flag.png',
    function (err, image) {
      // Throw an error if something goes wrong.
      if (err) throw err;

      // Add the image to the map style.
      map.addImage("pattern", image);

      // Create a new layer and style it using `fill-pattern`.
      map.addLayer({
        'id': "pattern-layer",
        'minzoom':19,
        'type': "symbol",
        'source': "db",
        'layout': {
          "icon-allow-overlap": !0,
          "icon-image": "pattern", // reference the image
          "icon-size": {
            stops: [
              [16, 0.2],
              [20, 1],
            ],
          },
        },
        'paint': {
          'icon-opacity': [
          'case',
          ['boolean', ['feature-state', 'hovera'], false],
          0.5,
          0
          ]
          }
        
      });
      map.addLayer({
        'filter': ["all", ["==", "$type", "Polygon"]],
        'id': 'aa',
        'minzoom':19,
        'type': 'symbol',
        'source': "db",
        'layout': {
            "text-field": ['get', 'f2'],
            "text-size":10
        },
        'paint': {
        'text-color':"#fff"
        }
      });
    }
    
  );

  for(let i=0;i<10000;i++){
    randomNum=Math.random()*90601;
    randomNumFloor=Math.floor(randomNum);

  map.setFeatureState(
    { source: 'db', id:randomNumFloor },
    { hovera: true }
    ); 
  }
  
 





  

});

  
var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
});
// 검색창 생성




document.getElementById("geocoder").appendChild(geocoder.onAdd(map)); // 검색창 넣기

map.addControl(new mapboxgl.NavigationControl()); //지도 탐색 컨트롤 표시




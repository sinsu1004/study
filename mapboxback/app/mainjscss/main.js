


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
var select=0;

//random
var randomNum;
var randomNumFloor;

var images = {
  "popup": "https://docs.mapbox.com/mapbox-gl-js/assets/popup.png",
  "korea":
    "data:image/png;base64,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",
  "china":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAAgVBMVEXuHCX//wD2hhT//QDzWRv1fxX+9AL3jhLvKCP4pA/vLCL5rQ3/+wHvMCL/+QH+9gHzYxn7wwr96QT6vgv4nRDzXhr70AjxSR7+8ALwOyDyUhz0cRf5swz6uAz95wT81gf4qA73lRH83Qb7ygn1eRb80wfxQx/0ahj1gBX7ywj94AV8jcCbAAADPElEQVR4nO3baVfqMBAGYCKlpECBLnSxgIJFrvz/H3i7orLYiXRJ6vt88HiOjWfGpklmioMBAAAA1GvZdQBNW3ldR9AYbcSTr77udB1IczzdeDe3bNp1HM3xh4wFjO26jqNBBkutJ13H0ZzJPEtxYbx3HcnvHCuvGLPSVMX7yG1ecUWUZ/fiHsNWIqrbklVs5dqM6Vay2JjtxFO/acU2YBqxny02LcVTv4DphKsmQdB4JA1ZJU/YinBdvG88lIa8Jhm+Ui5UdsO3kwxJE7BqxZWVlm0EmtCYUKlVNT+QGUJjwpdi31fittpZhrbYoPkhTVFzVDjgPBensWehUXv2wZcee2ooqFq5RYau0KgNY3py45WYpNsiw63QqHU2Jm4oplr556LBpw+K9nktJeUt1J6+c84ZOhc/ubt/FPmlQ9qMnGw8ZCR3n0v+HLtWkF+0bjNyMs0m5BdUHVSTmn/j6ZL2pkynMkGr8syyZ2/J13ApaVdjNPsxv9m4+lc4ghto2/zTDwmeKLG7cq4yn/j0boK0lmEssLl0JNJv5rcY0YZLuRVeCD9uJHhQs5d2z/XWKHY4VcDh8g52HVDdzKtJ2q85Ohj8u8qQuMwo4+0qw7euQ6qXeX0GHyrVYaoU39gt6DWtCp9asMq0PM0rv7XIozdi/ccuTMrjd7oJllsjfZrqchZOXxXvBO28Eiyrxog4WpO0h/FVXiWeK8GiaqSWDG7xx5C4YcrTSfqtEsyqxll1yE/GepO2MXQ7GC6qX5B3Jp2kF5WgvydNU747bzMnSUv8zCapBC+fJG4wtiGM1Yomq9RNfb7Qb92tYzCnLCA8ayiKNZHbdvRun7LDD9KTlZfPUtf593sxlC6NllRa0x6Wk59cNuWD1VbwlZxKXrIyixuUDzgoiZcPYL9KkT+h97fM7+/amR8CzG1/M4yc9BhgMcIbG1VZzN69MjU+evE7oS7YxVHPKMtw7khcDj7InBcV4XYnc8X0gKIvpztx3xr/BVesTaWeiJ2MpceYzD2Lh/AonZrv8969mro0Vve/EagO0veAHyV1WwYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFTyH3WiHVN8niUxAAAAAElFTkSuQmCC",
  "germany":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAFVBMVEUAAAD/7QDiABr/8wCiABPlABvujhOLwiLrAAAA+0lEQVR4nO3QRw3AAAwAsXTyh9xfdBQq2RA8AwAAAAAAAAAAAAAAAAAAAMDf3Kx5WHOyZISMkBEyQkbICBkhI2SEjJARMkJGyAgZISNkhIyQETJCRsgIGSEjZISMkBEyQkbICBkhI2SEjJARMkJGyAgZISNkhIyQETJCRsgIGSEjZISMkBEyQkbICBkhI2SEjJiXNRdrDpaMkBEyQkbICBkhI2SEjJARMkJGyAgZISNkhIyQETJCRsgIGSEjZISMkBEyQkbICBkhI2SEjJARMkJGyAgZISNkhIyQETJCRsgIGSEjZISMkBEyQkbICBkhI2SEjJARMkJGyIgP5PXPScb8NLAAAAAASUVORK5CYII=",
};

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
    map.setFeatureState(
        { source: 'db2', id: item },
        { hovera: false }
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
function loadImages(urls, callback) {
  var results = {};
  for (var name in urls) {
    map.loadImage(urls[name], makeCallback(name));
  }

  function makeCallback(name) {
    return function (err, image) {
      results[name] = err ? null : image;

      // if all images are loaded, call the callback
      if (Object.keys(results).length === Object.keys(urls).length) {
        callback(results);
      }
    };
  }
}
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
    0
    ]
    }
  });
};
// function clickevent(layerid,sources){
//   map.on('click',layerid,function(e){
    
//     gridname = e.features[0].properties.f2;
//     hoveredStateId = e.features[0].id;
//     $.ajax({
//     url: "http://localhost:5000/test/dd2",
//     type:'POST',
//     traditional:true,
//     data:{
//       data:gridname
//     },
//     success:function(a){
//        connect=a;
//        if((connect!='')&& (size.length==1) ){
//         for(let i=0;i<connect.length;i++){
//           map.setFeatureState(
//             { source: sources, id: connect[i]["gid"] },
//             { hover: true }
//             ); 
//             size.push(connect[i]["gid"]);
//           note.innerHTML+=connect[i]["pagename"];
//           note.innerHTML+=", ";
//           }
//           document.getElementById('pn').value=connect[0]["username"];
//           connect=null;
         
//        }
//        else{ 
//         connect=null;
        
//         }
//     },
//   });

//     size.push(hoveredStateId);
//     map.setFeatureState(
//     { source: sources, id: hoveredStateId },
//     { hover: true }
//     ); 
//     test2.push(e.features[0].properties.f2);
//     note.innerHTML +=e.features[0].properties.f2;
//     note.innerHTML+=", ";
    

//   });
  
  
  
//   };
  




map.on('load', function() {

  
  // pluselayer(test,'test','test','red','test-fill','red');
  // clickevent('test-fill','test');

  // pluselayer(squareGrid,'grid','grid','gray','grid-fill','#627BC1');
  // clickevent('grid-fill','grid');

  pluselayer(db,'db','db','gray','db-fill','gray');
  //
  map.on('click','db-fill',function(e){
    if(select==1){
       size.forEach(item=>{
      map.setFeatureState(
          { source: 'db2', id: item },
          { hovera: false }
          );
      map.setFeatureState(
            { source: 'db2', id: item },
            { hoveraa: false }
            );
    });
    size.length=0;
    test2=[];
    note.innerHTML="";
    document.getElementById('pn').value="";
    select=0;

    }
    
    gridname = e.features[0].properties.f2;
    hoveredStateId = e.features[0].id;
    $.ajax({
    url: "http://localhost:5000/test/dd2",
    type:'POST',
    async:false,
    traditional:true,
    data:{
      data:gridname
    },
    success:function(a){
       connect=a;
       if(connect!=''){
         
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
        
        if(connect[0]["country"]==null){
          for(let i=0;i<connect.length;i++){
            map.setFeatureState(
              { source: 'db2', id: connect[i]["gid"] },
              { hoveraa: true }
              ); 
              size.push(connect[i]["gid"]);
            note.innerHTML+=connect[i]["pagename"];
            note.innerHTML+=", ";
            }
            document.getElementById('pn').value=connect[0]["username"];
            connect=null;
            select=1;
        }
        else{
        for(let i=0;i<connect.length;i++){
          map.setFeatureState(
            { source: 'db2', id: connect[i]["gid"] },
            { hovera: true }
            ); 
            size.push(connect[i]["gid"]);
          note.innerHTML+=connect[i]["pagename"];
          note.innerHTML+=", ";
          }
          document.getElementById('pn').value=connect[0]["username"];
          connect=null;
          select=1;
         
       }
      }
       else{ 
        connect=null;
        size.push(hoveredStateId);
        map.setFeatureState(
        { source: 'db', id: hoveredStateId },
        { hover: true }
        ); 
        test2.push(e.features[0].properties.f2);
        note.innerHTML +=e.features[0].properties.f2;
        note.innerHTML+=", ";
        }
    },
  });


    

  });
  
  
  

  
 map.addSource('db2', {
    'type': "geojson",
    'data':db2
  });
  map.addLayer({
    'id': 'db2',
    'type': 'line',
    'source': 'db2',
    'paint': {
        'line-color': 'gray',
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
    0
    ]
    }
  });
  map.addLayer({
    'id': 'db2-fill2',
    'type': 'fill',
    'source': 'db2',
    'layout': {

    },
    'paint': {
    'fill-color': '#00FF00',
    'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hoveraa'], false],
    5,
    0
    ]
    }
  });
  map.addLayer({
    'filter': ["all", ["==", "$type", "Polygon"]],
    'id': 'aa2',
    'minzoom':19,
    'type': 'symbol',
    'source': "db2",
    'layout': {
        "text-field": ['get', 'f2'],
        "text-size":10
    },
    'paint': {
    'text-color':"#fff"
    }
  });


 
  

  

 
  


    

  loadImages(images, function (loadedImages) {
      map.addImage("korea", loadedImages["korea"]);
      map.addImage("china",loadedImages["china"]);
      map.addImage("germany",loadedImages["germany"]);
      map.addLayer({
        'id': "pattern-layer",
        'minzoom':19,
        'type': "symbol",
        'source': "db2",
        'layout': {
          "icon-allow-overlap": !0,
          "icon-image": ['get', 'f3'], // reference the image
          "icon-size": {
            stops: [
              [18, 0.2],
              [20, 0.3],
            ],
          },
        },
        'paint': {
          'icon-opacity': [
          'case',
          ['boolean', ['feature-state', 'hovera'], false],
          1,
          0.5
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
    
    
    
    });


  

  
for(let i=0;i<db2["features"].length;i++){
  if(db2["features"][i]["properties"].f3!=null){
    num=db2["features"][i].id;
  map.setFeatureState(
    { source: 'db2', id:num },
    { hover: false }
    ); 
  }
}
  
 





  

});

  
var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
});
// 검색창 생성




document.getElementById("geocoder").appendChild(geocoder.onAdd(map)); // 검색창 넣기

map.addControl(new mapboxgl.NavigationControl()); //지도 탐색 컨트롤 표시




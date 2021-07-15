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

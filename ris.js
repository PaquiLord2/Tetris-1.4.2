let cuad = document.getElementById("tetris");
let ctx = cuad.getContext("2d");
let cuad2 = document.getElementById("tetris2");
let ctx2 = cuad2.getContext("2d");
let cuad3 = document.getElementById("tetris3");
let ctx3 = cuad3.getContext("2d")
let cuad4 = document.getElementById("tetris4");
let ctx4 = cuad4.getContext("2d")
let cuad5 = document.getElementById("tetris5");
let ctx5 = cuad5.getContext("2d")

let $nivel = document.getElementById("niv")
let $lineas = document.getElementById("lin")
let nivel = 1;
let lineas = 0;
let tiempo = 500;

let idIntervalo = setInterval(teclado,100);
let idIntervalo2 = setInterval(bajar,tiempo);
let idIntervalo3 = setInterval(movvv,20);
let idIntervaloR = setInterval(bajarRapido,0)
let idIntervaloGuard = setInterval(guardar,10)
let idsalida = setInterval(salir,1)


let guarddp = 0

let giro=1;
let una_vez = 0;
let idIntervalo6 = setInterval(cuadrado,1)
let idIntervaloi = setInterval(cuadrado2,1)
let idIntervaloC = setInterval(cuadrado3,1)
let idIntervaloC2 = setInterval(cuadrado4,1)
let idIntervaloC3 = setInterval(cuadrado5,1)
let inicio
function cuadrado(){
    for(let x = 1;x<=10;x++){
        ctx.fillStyle = "Grey"
    ctx.fillRect(20*x,0,1,400)
}
for(let x = 1;x<=20;x++){
    ctx.fillStyle = "Grey"
    ctx.fillRect(0,20*x,200,1)
}
}
function cuadrado2(){
    for(let x = 1;x<=4;x++){
        ctx2.fillStyle = "Grey"
    ctx2.fillRect(30*x,0,1,120)
}
for(let x = 1;x<=4;x++){
    ctx2.fillStyle = "Grey"
    ctx2.fillRect(0,30*x,120,1)
}
}
function cuadrado3(){
    for(let x = 1;x<=3;x++){
        ctx3.fillStyle = "Grey"
    ctx3.fillRect(20*x,0,1,60)
}
for(let x = 1;x<=4;x++){
    ctx3.fillStyle = "Grey"
    ctx3.fillRect(0,20*x,80,1)
}   
}

function cuadrado4(){
    for(let x = 1;x<=3;x++){
        ctx4.fillStyle = "Grey"
    ctx4.fillRect(20*x,0,1,60)
}
for(let x = 1;x<=4;x++){
    ctx4.fillStyle = "Grey"
    ctx4.fillRect(0,20*x,80,1)
}   
}

function cuadrado5(){
    for(let x = 1;x<=3;x++){
        ctx5.fillStyle = "Grey"
    ctx5.fillRect(20*x,0,1,60)
}
for(let x = 1;x<=4;x++){
    ctx5.fillStyle = "Grey"
    ctx5.fillRect(0,20*x,80,1)
}   
}

const dr2 = ["","","","",
             "","","","",
             "","","","",
             "","","",""]

let dr3 = ["","","","",
             "","","","",
             "","","",""]
let dr4 = ["","","","",
             "","","","",
             "","","",""]
let dr5 = ["","","","",
             "","","","",
             "","","",""]

const dr = ["","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","","",
            "","","","","","","","","",""]


class Bloque{
    constructor(){
        this.x = null;
        this.y = null;
        this.xf = null;
        this.yf = null;
        this.color = null;
        this.pos = null;
        this.estado=null;
        this.nombre = null;
        this.sombra= 0;
        this.sactualizado = 0;
        this.xsombra = null;
        this.ysombra = null;
    }

    colocar(x,y,xf,yf,pos,color,estado,nombre){
       this.x = x;
       this.y = y;
       this.xf = xf;
       this.yf = yf;
       this.pos = pos;
       this.color = color;
       this.estado = estado;
       this.nombre = nombre;
       this.xsombra = this.x;
       this.ysombra = this.y;
    }
    dibujar(contexto){
        contexto.fillStyle = this.color;
        contexto.border = "black"
        
        contexto.fillRect(this.x,this.y,this.xf,this.yf);
       
    }
    eliminar(contexto){
        contexto.clearRect(this.x,this.y,this.xf,this.yf);
    }
    mover(direccion){
       this.eliminar(ctx);
        if(direccion ==="d"){
            this.x = this.x + 20;
        }
        if(direccion ==="a"){
            this.x = this.x - 20;
        }
        if(direccion === "abajo"){
            this.y = this.y + 20;
        }
     
    }
    colisiones(coli1=null,coli2=null,direccion=null){
        let salida = false
        if(this.x>180){
              
              salida = true;              
        }
        if(this.x<0){
            
            salida = true;              
      }
      if(this.y>380){
        
        salida = true;
      }
      if(coli1 != null && coli2 !=null){
      if(direccion==="abajo" && coli2.sombra!==1){
        if(coli1.y === coli2.y){
        salida = true
      }
    }

      if(direccion!=null){
      
       if((coli1.x === coli2.x) && direccion==="d"){
        
        salida = true
      }
      if((coli1.x === coli2.x) && direccion==="a"){
        
        salida = true
      }
      }
      if(direccion===null){
        if(coli1.y===coli2.y){
            salida=true;
        }
      }
    }
    
      return salida
    }
}
function minoT(){
    const bl = new Bloque();
    bl.colocar(60,20,20,20,1,"Purple",true,"T")
    bl.dibujar(ctx)
    dr[13] = bl
    const bl2 = new Bloque();
    bl2.colocar(80,20,20,20,2,"Purple",true,"T")
    bl2.dibujar(ctx)
    dr[14] = bl2
    const bl3 = new Bloque();
    bl3.colocar(100,20,20,20,4,"Purple",true,"T")
    bl3.dibujar(ctx)
    dr[15] = bl3
    const bl4 = new Bloque();
    bl4.colocar(80,0,20,20,3,"Purple",true,"T")
    bl4.dibujar(ctx)
    dr[4] = bl4
}

function minoL(){
    const bl = new Bloque();
    bl.colocar(60,20,20,20,1,"Orange",true,"L")
    bl.dibujar(ctx)
    dr[13] = bl
    const bl2 = new Bloque();
    bl2.colocar(80,20,20,20,2,"Orange",true,"L")
    bl2.dibujar(ctx)
    dr[14] = bl2
    const bl3 = new Bloque();
    bl3.colocar(100,20,20,20,3,"Orange",true,"L")
    bl3.dibujar(ctx)
    dr[15] = bl3
    const bl4 = new Bloque();
    bl4.colocar(100,0,20,20,4,"Orange",true,"L")
    bl4.dibujar(ctx)
    dr[5] = bl4
}
function minoLarg(){
    const bl = new Bloque();
    bl.colocar(60,20,20,20,1,"Turquoise",true,"I")
    bl.dibujar(ctx)
    dr[13] = bl
    const bl2 = new Bloque();
    bl2.colocar(80,20,20,20,2,"Turquoise",true,"I")
    bl2.dibujar(ctx)
    dr[14] = bl2
    const bl3 = new Bloque();
    bl3.colocar(100,20,20,20,3,"Turquoise",true,"I")
    bl3.dibujar(ctx)
    dr[15] = bl3
    const bl4 = new Bloque();
    bl4.colocar(120,20,20,20,4,"Turquoise",true,"I")
    bl4.dibujar(ctx)
    dr[16] = bl4
}
function minoJ2(){
    const bl = new Bloque();
    bl.colocar(60,20,20,20,1,"Blue",true,"J")
    bl.dibujar(ctx)
    dr[13] = bl
    const bl2 = new Bloque();
    bl2.colocar(80,20,20,20,2,"Blue",true,"J")
    bl2.dibujar(ctx)
    dr[14] = bl2
    const bl3 = new Bloque();
    bl3.colocar(100,20,20,20,4,"Blue",true,"J")
    bl3.dibujar(ctx)
    dr[15] = bl3
    const bl4 = new Bloque();
    bl4.colocar(60,0,20,20,3,"Blue",true,"J")
    bl4.dibujar(ctx)
    dr[3] = bl4
}
function minoS(){
    const bl = new Bloque();
    bl.colocar(60,20,20,20,1,"Green",true,"S")
    bl.dibujar(ctx)
    dr[13] = bl
    const bl2 = new Bloque();
    bl2.colocar(80,20,20,20,2,"Green",true,"S")
    bl2.dibujar(ctx)
    dr[14] = bl2
    const bl3 = new Bloque();
    bl3.colocar(80,0,20,20,3,"Green",true,"S")
    bl3.dibujar(ctx)
    dr[4] = bl3
    const bl4 = new Bloque();
    bl4.colocar(100,0,20,20,4,"Green",true,"S")
    bl4.dibujar(ctx)
    dr[5] = bl4
}

function minoZ(){
    const bl = new Bloque();
    bl.colocar(60,0,20,20,4,"Red",true,"Z")
    bl.dibujar(ctx)
    dr[3] = bl
    const bl2 = new Bloque();
    bl2.colocar(80,0,20,20,3,"Red",true,"Z")
    bl2.dibujar(ctx)
    dr[4] = bl2
    const bl3 = new Bloque();
    bl3.colocar(80,20,20,20,2,"Red",true,"Z")
    bl3.dibujar(ctx)
    dr[14] = bl3
    const bl4 = new Bloque();
    bl4.colocar(100,20,20,20,1,"Red",true,"Z")
    bl4.dibujar(ctx)
    dr[15] = bl4
}
function minoO(){
    const bl = new Bloque();
    bl.colocar(80,20,20,20,1,"Yellow",true,"O")
    bl.dibujar(ctx)
    dr[14] = bl
    const bl2 = new Bloque();
    bl2.colocar(100,20,20,20,2,"Yellow",true,"O")
    bl2.dibujar(ctx)
    dr[15] = bl2
    const bl3 = new Bloque();
    bl3.colocar(80,0,20,20,3,"Yellow",true,"O")
    bl3.dibujar(ctx)
    dr[4] = bl3
    const bl4 = new Bloque();
    bl4.colocar(100,0,20,20,4,"Yellow",true,"O")
    bl4.dibujar(ctx)
    dr[5] = bl4
}

let vec = []
let vec2 = []
let ind = 0,h=0;
let ty = 0
function generarAleatorio(){
let yy = ["","","","","","",""];
h=0
    while(h<7){
    ind = Math.floor(Math.random()*7);
    if (yy.indexOf(ind)!==-1){
        ind = Math.floor(Math.random()*7);
      }else{
        yy[h]=ind;
        h++;
      }
}
return yy;
}
vec = generarAleatorio();
vec2 = generarAleatorio();

function eliminarSiguiente(drrr,ctxx){
    for(let u = drrr.length-1; u>=0;u--  ){
        if(drrr[u]){
        drrr[u].eliminar(ctxx);
        drrr[u] = ""
    }
}
return drrr
}

function dibujarSiguinte(contextt,vecky,pieza){
   if (pieza === 0){
    const bl = new Bloque();
    bl.colocar(0,20,20,20,1,"Orange",true,"L")
    bl.dibujar(contextt)
    vecky[4] = bl
    const bl2 = new Bloque();
    bl2.colocar(20,20,20,20,2,"Orange",true,"L")
    bl2.dibujar(contextt)
    vecky[5] = bl2
    const bl3 = new Bloque();
    bl3.colocar(40,20,20,20,3,"Orange",true,"L")
    bl3.dibujar(contextt)
    vecky[6] = bl3
    const bl4 = new Bloque();
    bl4.colocar(40,0,20,20,4,"Orange",true,"L")
    bl4.dibujar(contextt)
    vecky[2] = bl4
   }
   if (pieza === 1){
    const bl = new Bloque();
    bl.colocar(0,20,20,20,1,"Turquoise",true,"L")
    bl.dibujar(contextt)
    vecky[4] = bl
    const bl2 = new Bloque();
    bl2.colocar(20,20,20,20,2,"Turquoise",true,"L")
    bl2.dibujar(contextt)
    vecky[5] = bl2
    const bl3 = new Bloque();
    bl3.colocar(40,20,20,20,3,"Turquoise",true,"L")
    bl3.dibujar(contextt)
    vecky[6] = bl3
    const bl4 = new Bloque();
    bl4.colocar(60,20,20,20,4,"Turquoise",true,"L")
    bl4.dibujar(contextt)
    vecky[7] = bl4
   }
   if (pieza === 2){
    const bl = new Bloque();
    bl.colocar(0,20,20,20,1,"Blue",true,"L")
    bl.dibujar(contextt)
    vecky[4] = bl
    const bl2 = new Bloque();
    bl2.colocar(20,20,20,20,2,"Blue",true,"L")
    bl2.dibujar(contextt)
    vecky[5] = bl2
    const bl3 = new Bloque();
    bl3.colocar(40,20,20,20,3,"Blue",true,"L")
    bl3.dibujar(contextt)
    vecky[6] = bl3
    const bl4 = new Bloque();
    bl4.colocar(40,40,20,20,4,"Blue",true,"L")
    bl4.dibujar(contextt)
    vecky[10] = bl4
   }
   if (pieza === 3){
    const bl = new Bloque();
    bl.colocar(0,20,20,20,1,"Green",true,"L")
    bl.dibujar(contextt)
    vecky[4] = bl
    const bl2 = new Bloque();
    bl2.colocar(20,20,20,20,2,"Green",true,"L")
    bl2.dibujar(contextt)
    vecky[5] = bl2
    const bl3 = new Bloque();
    bl3.colocar(20,0,20,20,3,"Green",true,"L")
    bl3.dibujar(contextt)
    vecky[1] = bl3
    const bl4 = new Bloque();
    bl4.colocar(40,0,20,20,4,"Green",true,"L")
    bl4.dibujar(contextt)
    vecky[2] = bl4
   }
   
   if (pieza === 4){
    const bl = new Bloque();
    bl.colocar(0,0,20,20,1,"Red",true,"L")
    bl.dibujar(contextt)
    vecky[0] = bl
    const bl2 = new Bloque();
    bl2.colocar(20,0,20,20,2,"Red",true,"L")
    bl2.dibujar(contextt)
    vecky[1] = bl2
    const bl3 = new Bloque();
    bl3.colocar(20,20,20,20,3,"Red",true,"L")
    bl3.dibujar(contextt)
    vecky[5] = bl3
    const bl4 = new Bloque();
    bl4.colocar(40,20,20,20,4,"Red",true,"L")
    bl4.dibujar(contextt)
    vecky[6] = bl4
   }
   if (pieza === 5){
    const bl = new Bloque();
    bl.colocar(20,20,20,20,1,"Yellow",true,"L")
    bl.dibujar(contextt)
    vecky[5] = bl
    const bl2 = new Bloque();
    bl2.colocar(40,20,20,20,2,"Yellow",true,"L")
    bl2.dibujar(contextt)
    vecky[6] = bl2
    const bl3 = new Bloque();
    bl3.colocar(20,40,20,20,3,"Yellow",true,"L")
    bl3.dibujar(contextt)
    vecky[9] = bl3
    const bl4 = new Bloque();
    bl4.colocar(40,40,20,20,4,"Yellow",true,"L")
    bl4.dibujar(contextt)
    vecky[10] = bl4
   }

   if (pieza === 6){
    const bl = new Bloque();
    bl.colocar(20,20,20,20,1,"Purple",true,"L")
    bl.dibujar(contextt)
    vecky[5] = bl
    const bl2 = new Bloque();
    bl2.colocar(0,40,20,20,2,"Purple",true,"L")
    bl2.dibujar(contextt)
    vecky[8] = bl2
    const bl3 = new Bloque();
    bl3.colocar(20,40,20,20,3,"Purple",true,"L")
    bl3.dibujar(contextt)
    vecky[9] = bl3
    const bl4 = new Bloque();
    bl4.colocar(40,40,20,20,4,"Purple",true,"L")
    bl4.dibujar(contextt)
    vecky[10] = bl4
   }


 return vecky
}
let salii = 0;
function piezaAleatoria(){
    
  //inicio =  Math.floor(Math.random() * 7);
  inicio = vec.shift();
  vec.push(vec2.shift())
    if(vec2.length===0){
        vec2 = generarAleatorio()
    }
   //vec.splice(vec.indexOf(inicio),1);
  // inicio = 1
dr3 = eliminarSiguiente(dr3,ctx3)
dr4 = eliminarSiguiente(dr4,ctx4)
dr5 = eliminarSiguiente(dr5,ctx5)


 dr3 =  dibujarSiguinte(ctx3,dr3,vec[0]);
 dr4 =  dibujarSiguinte(ctx4,dr4,vec[1]);
 dr5 =  dibujarSiguinte(ctx5,dr5,vec[2]);


 

   if(inicio===0){
    if(dr[13] || dr[14] || dr[15] || dr[5]){
        salii++
    }
    minoL()
}if(inicio===1){
    if(dr[13] || dr[14] || dr[15] || dr[16]){
        salii++
    }
    minoLarg()
}
  if(inicio===2){
    if(dr[13] || dr[14] || dr[15] || dr[3]){
        salii++
    }
    minoJ2()
}
if(inicio===3){ 
    if(dr[13] || dr[14] || dr[4] || dr[5]){
        salii++
    }
minoS()
}
 
if (inicio===4){
    if(dr[3] || dr[4] || dr[14] || dr[15]){
        salii++
    }
    minoZ()
}
    if(inicio===5)
    {
        if(dr[14] || dr[15] || dr[4] || dr[5]){
            salii++
        }
minoO()
}
if (inicio===6){
    if(dr[13] || dr[14] || dr[15] || dr[4]){
        salii++
    }
    minoT()
     }
   
    if (idIntervalo2 === ""){
     idIntervalo2 = setInterval(bajar,tiempo);
    }
}


piezaAleatoria()
crearClonBajada()


//minoT();

function eliminarClonbajada(){

    

    for(let u = dr.length-1;u>=0;u--){
        if(dr[u].estado){
           ctx.clearRect(dr[u].xsombra,dr[u].ysombra,20,20)
        }
    } 

    for(let u = dr.length-1;u>=0;u--){
        if(dr[u]){
            dr[u].ysombra = dr[u].y;
            dr[u].xsombra = dr[u].x
        }
    } 
}

function crearClonBajada(){
// 1 fase de inicio de posicion de la sombra
let dizz = 10;

for(let u = dr.length-1;u>=0;u--){
    if(dr[u].estado){
        dr[u].ysombra = dr[u].y;
        dr[u].xsombra = dr[u].x
    }
}   

let op = 0;
    for(let u = dr.length-1;u>=0;u--){
        if(dr[u].estado){
            op = dr[u].y/2;

            break
        }
    }
    if(op===190){
        dizz=0;
    }
    
//fin de fase 1
//fase 2 sumar una posicion Y en cada valor de la sombra 
let salidas=0
while(salidas===0){    
for(let u = dr.length-1;u>=0;u--){
        if(dr[u].estado){
            dr[u].ysombra = dr[u].ysombra + 20;
        }
    }   
    //fin fase 2
    //fase 3 comprobar que exista posición disponible para la sombra, en caso que no lo haya, regresa(resta) una posición Y a la sombra
    for(let u = dr.length-1;u>=0;u--){
        if(dr[u].estado){
            if((dr[u].ysombra === dr[u+dizz].y && !dr[u+dizz].estado)||dr[u].ysombra >380 ){
              salidas++
              
            }
        }
    }

    if(dizz <(190-op)){
    dizz = dizz + 10
    }
    if(salidas>0){
        for(let u = dr.length-1;u>=0;u--){
            if(dr[u].estado){
                dr[u].ysombra = dr[u].ysombra - 20;
            }
        } 
    }
//fin fase 3
}
//fase 4 dibujar?
for(let u = dr.length-1;u>=0;u--){
    if(dr[u].estado){
        if(dr[u].ysombra!==dr[u].y){
        
       ctx.fillStyle = dr[u].color ;
       ctx.globalAlpha = 0.4
       ctx.fillRect(dr[u].xsombra,dr[u].ysombra,20,20)
    }
}
}  
for(let u=dr.length-1;u>=0;u--){
    if(dr[u].estado) {
        ctx.globalAlpha = 1
        dr[u].dibujar(ctx)
        
    }
}
//fin fase 4
}


let teclaP = {
    s:"",
    k:"",
    a:"",
    d:"",
    espacio:"",
    c:"",
}
let uns = 0;
let uy = 0;
this.addEventListener("keydown",(e)=>{
    if(e.key === "ArrowRight"){
        teclaP.d = "d"
        uy = 1;
    }
    if(e.key==="ArrowLeft"){
        teclaP.a = "a"
        uy = 1;
    }
    if(e.key==='s'){
        teclaP.s = "s"
        
            clearInterval(idIntervalo2)
            idIntervalo2 = ""
            bajar();
        
    }
    if(e.key==='z'){
        teclaP.k = "k"
    }
    if(e.key === " "){
        teclaP.espacio =  " ";
        clearInterval(idIntervalo2)
        idIntervalo2 = ""
    }
    if(e.key === 'c'){
        teclaP.c = "c"
    }
})

this.addEventListener("keyup",(e)=>{
    if(e.key === 'c'){
        teclaP.c = ""
    }

    if(e.key === "ArrowRight"){
        teclaP.d = ""
        
        clearInterval(idIntervalo)
        idIntervalo = setInterval(teclado,80)
       uy = 0
    }
    if(e.key === 'ArrowLeft'){
        teclaP.a = ""
        clearInterval(idIntervalo)
      idIntervalo = setInterval(teclado,80)
       
        uy = 0
    }
    if(e.key === 'z'){
        teclaP.k = ""
    }
    if(e.key === 's'){
        teclaP.s = ""
        idIntervalo2 = setInterval(bajar,tiempo);
    }
    if(e.key === " "){
        teclaP.espacio = ""
      uns = 0;
     
    }
    
    
})
function movimm(collu,collu2,direccion,cantii,dirvec,movdir){
    col = 0;
    coll = collu;
    let col2 = collu2;     
    roww = 0;
    let choqi3=0;
 for (let y = 0;y<10;y++)
 {
     for(let x = 0;x<20;x++){
        roww = coll - diz
        u = dr[roww];
        if(u.estado){
            if(direccion==="a"||direccion==="d"){
            dr[roww].x = dr[roww].x + cantii;
        }else{
            dr[roww].y = dr[roww].y + cantii;
        }
            if( dr[roww].colisiones(dr[roww],dr[roww+dirvec],direccion)){
                choqi3++;
            }
        }
        diz = diz + 10; 
    }
      diz=0;
      col2 = col2+movdir
      coll = col2;
 }  
    return choqi3
}


function salir(){

    if (salii>0)
    {
    if(inicio===0){
        minoL()
    }if(inicio===1){
        minoLarg()
    }
      if(inicio===2){
        minoJ2()
    }
    if(inicio===3){ 
    minoS()
    }
     
    if (inicio===4){
        minoZ()
    }
        if(inicio===5)
        {
         
    minoO()
    }
    if (inicio===6){

        minoT()
         }
    alert("has perdido")
     location.reload()
    }
}

let col2 = 0;
let xab=199,yab=199,entr1=0,sal1=1,choqi=0,tetr=0;
let guardado = -1;

function aparecePieza(pieza){
    if(pieza===0){
        const bl = new Bloque();
        bl.colocar(30,0,30,30,1,"Orange",true,"L")
        bl.dibujar(ctx2)
        dr2[1] = bl
        const bl2 = new Bloque();
        bl2.colocar(30,30,30,30,2,"Orange",true,"L")
        bl2.dibujar(ctx2)
        dr2[5] = bl2
        const bl3 = new Bloque();
        bl3.colocar(30,60,30,30,3,"Orange",true,"L")
        bl3.dibujar(ctx2)
        dr2[9] = bl3
        const bl4 = new Bloque();
        bl4.colocar(60,60,30,30,4,"Orange",true,"L")
        bl4.dibujar(ctx2)
        dr2[10] = bl4
    }
    if(pieza===1){
        const bl = new Bloque();
        bl.colocar(0,60,30,30,1,"Turquoise",true,"L")
        bl.dibujar(ctx2)
        dr2[8] = bl
        const bl2 = new Bloque();
        bl2.colocar(30,60,30,30,2,"Turquoise",true,"L")
        bl2.dibujar(ctx2)
        dr2[9] = bl2
        const bl3 = new Bloque();
        bl3.colocar(60,60,30,30,3,"Turquoise",true,"L")
        bl3.dibujar(ctx2)
        dr2[10] = bl3
        const bl4 = new Bloque();
        bl4.colocar(90,60,30,30,4,"Turquoise",true,"L")
        bl4.dibujar(ctx2)
        dr2[11] = bl4
    }
    if(pieza===2){
        const bl = new Bloque();
        bl.colocar(60,0,30,30,1,"Blue",true,"L")
        bl.dibujar(ctx2)
        dr2[2] = bl
        const bl2 = new Bloque();
        bl2.colocar(60,30,30,30,2,"Blue",true,"L")
        bl2.dibujar(ctx2)
        dr2[6] = bl2
        const bl3 = new Bloque();
        bl3.colocar(60,60,30,30,3,"Blue",true,"L")
        bl3.dibujar(ctx2)
        dr2[10] = bl3
        const bl4 = new Bloque();
        bl4.colocar(30,60,30,30,4,"Blue",true,"L")
        bl4.dibujar(ctx2)
        dr2[9] = bl4
    }
    if(pieza===3){
        const bl = new Bloque();
        bl.colocar(0,60,30,30,1,"Green",true,"L")
        bl.dibujar(ctx2)
        dr2[8] = bl
        const bl2 = new Bloque();
        bl2.colocar(60,30,30,30,2,"Green",true,"L")
        bl2.dibujar(ctx2)
        dr2[9] = bl2
        const bl3 = new Bloque();
        bl3.colocar(30,30,30,30,3,"Green",true,"L")
        bl3.dibujar(ctx2)
        dr2[5] = bl3
        const bl4 = new Bloque();
        bl4.colocar(30,60,30,30,4,"Green",true,"L")
        bl4.dibujar(ctx2)
        dr2[6] = bl4
    }
    if(pieza===4){
        const bl = new Bloque();
        bl.colocar(30,30,30,30,1,"Red",true,"L")
        bl.dibujar(ctx2)
        dr2[5] = bl
        const bl2 = new Bloque();
        bl2.colocar(60,30,30,30,2,"Red",true,"L")
        bl2.dibujar(ctx2)
        dr2[6] = bl2
        const bl3 = new Bloque();
        bl3.colocar(60,60,30,30,3,"Red",true,"L")
        bl3.dibujar(ctx2)
        dr2[10] = bl3
        const bl4 = new Bloque();
        bl4.colocar(90,60,30,30,4,"Red",true,"L")
        bl4.dibujar(ctx2)
        dr2[11] = bl4
    }
    if(pieza===5){
        const bl = new Bloque();
        bl.colocar(30,30,30,30,1,"Yellow",true,"L")
        bl.dibujar(ctx2)
        dr2[5] = bl
        const bl2 = new Bloque();
        bl2.colocar(30,60,30,30,2,"Yellow",true,"L")
        bl2.dibujar(ctx2)
        dr2[6] = bl2
        const bl3 = new Bloque();
        bl3.colocar(60,30,30,30,3,"Yellow",true,"L")
        bl3.dibujar(ctx2)
        dr2[9] = bl3
        const bl4 = new Bloque();
        bl4.colocar(60,60,30,30,4,"Yellow",true,"L")
        bl4.dibujar(ctx2)
        dr2[10] = bl4
    }
    if(pieza===6){
        const bl = new Bloque();
        bl.colocar(30,30,30,30,1,"Purple",true,"L")
        bl.dibujar(ctx2)
        dr2[5] = bl
        const bl2 = new Bloque();
        bl2.colocar(0,60,30,30,2,"Purple",true,"L")
        bl2.dibujar(ctx2)
        dr2[8] = bl2
        const bl3 = new Bloque();
        bl3.colocar(30,60,30,30,3,"Purple",true,"L")
        bl3.dibujar(ctx2)
        dr2[9] = bl3
        const bl4 = new Bloque();
        bl4.colocar(60,60,30,30,4,"Purple",true,"L")
        bl4.dibujar(ctx2)
        dr2[10] = bl4
    }
}

function guardar(){
    if(teclaP.c){
        teclaP.c = ""
        if(guarddp===0){
            giro=1;
        for(let u=dr2.length-1;u>=0;u--){
            if(dr2[u].estado){
             dr2[u].eliminar(ctx2);
             dr2[u] = ""
        }
    }

        for(let u=dr.length-1;u>=0;u--){
            if(dr[u].estado){
             dr[u].eliminar(ctx);
             ctx.clearRect( dr[u].xsombra,dr[u].ysombra,20,20)
             dr[u] = ""
        }
    }
        if(guardado===-1){
            guardado = inicio;
            aparecePieza(guardado)
                piezaAleatoria()
                crearClonBajada()
            
        }else{
            let reserva = guardado 
          guardado = inicio;
          aparecePieza(guardado)
          if(reserva===0){
            minoL()
        }if(reserva===1){
            minoLarg()
        }
          if(reserva===2){
            minoJ2()
        }
        if(reserva===3){ 
        minoS()
        }
         
        if (reserva===4){
            minoZ()
        }
            if(reserva===5)
            {
        minoO()
        }
        if (reserva===6){
            minoT()
             }
       
             crearClonBajada()
        }
      
    
}
guarddp++
    }
}
function bajar()
{
   
    let rett = 0;

    if(una_vez===0){
    eliminarClonbajada()
}
  let choqi3 = movimm(199,199,"abajo",20,10,-1,-10)
  for(let x = dr.length-1;x>=0;x--){
    if(dr[x].estado){
        dr[x].y = dr[x].y-20
    }
 }
  
  if(choqi3===0){
  for(let x = dr.length-1;x>=0;x--){
    if(dr[x].estado){
     dr[x].mover("abajo")
     dr[x].dibujar(ctx);
     dr[x+10] = dr[x]
     dr[x] = "";
}
}
}
else{
    for(let x = dr.length-1;x>=0;x--){
        if(dr[x].estado){
            dr[x].estado = false;
        }
    }
     let elimLi = 190,elimLi2 = 190,contLi = 0,TLi=0,guarLi=0,entr=0;
    
     for(let x = 0;x<20;x++){
        for (let y = 0;y<10;y++){
              if(!dr[elimLi].estado && dr[elimLi]!=""){
                 contLi++
                 if(contLi===10){
                    contLi = 0;
                    entr=1;
                    guarLi = elimLi;
                    TLi++;
                 }
                 if(entr===1){
                     

                    let guarLi2=guarLi-9;
                    let guarLi3 =guarLi-10
                    for(let x = 0;x<10;x++){
                        dr[guarLi2].eliminar(ctx);
                        dr[guarLi2] = ""
                          guarLi2++;
                    }
                    for(let x = guarLi3;x>=0;x--){

                        dr[x+(10)] = dr[x]
                        if (dr[x]){
                        dr[x].eliminar(ctx)
                        }
                        dr[x+(10)].y =dr[x+(10)].y + (20); 
                        if(dr[x]){
                            dr[x+(10)].dibujar(ctx)
                        }
                       
                        dr[x] = ""
                    }
                    
                
                }
                
              }
              if(entr===1){
                lineas++;
                $lineas.textContent = lineas
                if(lineas%10===0){
                  nivel++
                 $nivel.textContent = nivel;
                 if(nivel<=23){
                 tiempo = tiempo - 20;
                 }
                 clearInterval(idIntervalo2);
                 idIntervalo2 = ""
                  
              }

                entr = 0;
                y=-1;
                elimLi=guarLi- 9;
              }else{
           elimLi++;
        }
            }
            contLi = 0
            elimLi2 = elimLi2 -10
            elimLi = elimLi2;
    }
     
     let guarLi3 =guarLi-10
 

    giro=1;
    guarddp = 0
    piezaAleatoria()
    una_vez = 0
}
if(una_vez===0){
    crearClonBajada();
    una_vez=1;
}

if(choqi3>0){
   
    return true
}else{
    return false
}
 
}
let u = "";
let col = 0,roww,coll,diz=0;
let tel;
let ii = 0;
function teclado(){
   
  
    if(teclaP.d){
        
        eliminarClonbajada()
        
        let choqi3 = movimm(199,199,"d",20,1,-1,10)

     for(let x = dr.length-1;x>=0;x--){
        if(dr[x].estado){
            dr[x].x = dr[x].x-20
        }
     }
     if(choqi3===0){
        for(let x = dr.length-1;x>=0;x--){
          if(dr[x].estado){
           dr[x].mover("d")
           dr[x].dibujar(ctx);
           dr[x+1] = dr[x]
           dr[x] = "";
      }
      }
      }
   
      
      crearClonBajada()
      clearInterval(idIntervalo)
      idIntervalo = setInterval(teclado,80)
    }
    
    if(teclaP.a){
        
        eliminarClonbajada()
      
   let choqi3 = movimm(190,190,"a",-20,-1,1,10)
     for(let x = dr.length-1;x>=0;x--){
        if(dr[x].estado){
            dr[x].x = dr[x].x+20
        }
     }
     if(choqi3===0){
        for(let x = 0;x<dr.length;x++){
          if(dr[x].estado){
           dr[x].mover("a")
           dr[x].dibujar(ctx);
           dr[x-1] = dr[x]
           dr[x] = "";
         
      }
      }
      
      }
      
      
      crearClonBajada()
      clearInterval(idIntervalo)
      idIntervalo = setInterval(teclado,80)
    }
    
}
function bajarRapido(){
if(teclaP.espacio){
  if(uns===0){
    let oi = false
    while(oi === false){
        oi = bajar();
    }
  teclaP.espacio = ""
  uns++;
  }

}
}

function movvv(){
    if(teclaP.k){
        
        eliminarClonbajada()
        
        let nombre,posicionx,posiciony,posicionx2,posiciony2,posicionx3,posiciony3,posicionx4,posiciony4;
        for(let x =dr.length-1;x>=0;x--){
            if(dr[x].pos===2 && dr[x].estado){
                nombre = dr[x].nombre;
                posicionx = dr[x].x;
                posiciony = dr[x].y;
                teclaP.k=""
            }
            if(nombre === "I"){
                if(giro === 1){
                    posicionx2 = dr[x-1].x + 20
                    posiciony2 = dr[x-1].y - 20
                    posicionx3 = dr[x+1].x - 20
                    posiciony3 = dr[x+1].y + 20
                    posicionx4 = dr[x+2].x - 40
                    posiciony4 = dr[x+2].y + 40
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180 && dr[x-10].x!==posicionx2 && dr[x-10].y!== posiciony2 && dr[x+10].x!==posicionx3 && dr[x+10].y!== posiciony3 && dr[x+20].x!==posicionx4 && dr[x+20].y!== posiciony4){
                       dr[x-1].eliminar(ctx);
                       dr[x-10] = dr[x-1];
                       dr[x-10].x = posicionx2;
                       dr[x-10].y = posiciony2;
                       dr[x-10].dibujar(ctx);
                       dr[x-1] = ""

                       dr[x+1].eliminar(ctx);
                       dr[x+10] = dr[x+1];
                       dr[x+10].x = posicionx3;
                       dr[x+10].y = posiciony3;
                       dr[x+10].dibujar(ctx);
                       dr[x+1] = ""
                       
                       dr[x+2].eliminar(ctx);
                       dr[x+20] = dr[x+2];
                       dr[x+20].x = posicionx4;
                       dr[x+20].y = posiciony4;
                       dr[x+20].dibujar(ctx);
                       dr[x+2] = ""

                        giro++;
                    }
                    
                    break;
                }
                if(giro === 2){
                    posicionx2 = dr[x-10].x - 20
                    posiciony2 = dr[x-10].y + 20
                    posicionx3 = dr[x+10].x + 20
                    posiciony3 = dr[x+10].y - 20
                    posicionx4 = dr[x+20].x + 40
                    posiciony4 = dr[x+20].y - 40
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180 && dr[x-1].x!==posicionx2 && dr[x-1].y!== posiciony2 && dr[x+1].x!==posicionx3 && dr[x+1].y!== posiciony3 && dr[x+2].x!==posicionx4 && dr[x+2].y!== posiciony4){
                       dr[x-10].eliminar(ctx);
                       dr[x-1] = dr[x-10];
                       dr[x-1].x = posicionx2;
                       dr[x-1].y = posiciony2;
                       dr[x-1].dibujar(ctx);
                       dr[x-10] = ""

                       dr[x+10].eliminar(ctx);
                       dr[x+1] = dr[x+10];
                       dr[x+1].x = posicionx3;
                       dr[x+1].y = posiciony3;
                       dr[x+1].dibujar(ctx);
                       dr[x+10] = ""
                       
                       dr[x+20].eliminar(ctx);
                       dr[x+2] = dr[x+20];
                       dr[x+2].x = posicionx4;
                       dr[x+2].y = posiciony4;
                       dr[x+2].dibujar(ctx);
                       dr[x+20] = ""

                        giro=1;
                    }
                    
                    break;
                }
            }
            
            if(nombre === "L"){
                if(giro === 1){
                    posicionx2 = dr[x-1].x + 20
                    posiciony2 = dr[x-1].y + 20
                    posicionx3 = dr[x+1].x - 20
                    posiciony3 = dr[x+1].y - 20
                    posicionx4 = dr[x-9].x - 40
                    posiciony4 = dr[x-9].y
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x+10].x!==posicionx2 && dr[x+10].y!== posiciony2 && dr[x-10].x!==posicionx3 && dr[x-10].y!== posiciony3 && dr[x-11].x!==posicionx4 && dr[x-11].y!== posiciony4 ){
                   dr[x-1].eliminar(ctx);
                   dr[x+10] = dr[x-1];
                   dr[x+10].x = posicionx2;
                   dr[x+10].y = posiciony2;
                   dr[x+10].dibujar(ctx);
                   dr[x-1] = "" 
                  
                   dr[x+1].eliminar(ctx);
                   dr[x-10] = dr[x+1];
                   dr[x-10].x = posicionx3;
                   dr[x-10].y = posiciony3;
                   dr[x-10].dibujar(ctx);
                   dr[x+1] = "" 
                  
                   dr[x-9].eliminar(ctx);
                   dr[x-11] = dr[x-9];
                   dr[x-11].x = posicionx4;
                   dr[x-11].y = posiciony4;
                   dr[x-11].dibujar(ctx);
                   dr[x-9] = "" 
                    giro++
                    }

                    break
                }
                if(giro === 2){
                    posicionx2 = dr[x+10].x + 20
                    posiciony2 = dr[x+10].y - 20
                    posicionx3 = dr[x-10].x - 20
                    posiciony3 = dr[x-10].y + 20
                    posicionx4 = dr[x-11].x
                    posiciony4 = dr[x-11].y + 40
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x+1].x!==posicionx2 && dr[x+1].y!== posiciony2 && dr[x-1].x!==posicionx3 && dr[x-1].y!== posiciony3 && dr[x+9].x!==posicionx4 && dr[x+9].y!== posiciony4 ){
                   dr[x+10].eliminar(ctx);
                   dr[x+1] = dr[x+10];
                   dr[x+1].x = posicionx2;
                   dr[x+1].y = posiciony2;
                   dr[x+1].dibujar(ctx);
                   dr[x+10] = "" 
                  
                   dr[x-10].eliminar(ctx);
                   dr[x-1] = dr[x-10];
                   dr[x-1].x = posicionx3;
                   dr[x-1].y = posiciony3;
                   dr[x-1].dibujar(ctx);
                   dr[x-10] = "" 
                  
                   dr[x-11].eliminar(ctx);
                   dr[x+9] = dr[x-11];
                   dr[x+9].x = posicionx4;
                   dr[x+9].y = posiciony4;
                   dr[x+9].dibujar(ctx);
                   dr[x-11] = "" 
                    giro++
                    }

                    break
                }


                if(giro === 3){
                    posicionx2 = dr[x+1].x - 20
                    posiciony2 = dr[x+1].y - 20
                    posicionx3 = dr[x-1].x + 20
                    posiciony3 = dr[x-1].y + 20
                    posicionx4 = dr[x+9].x + 40
                    posiciony4 = dr[x+9].y 
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x-10].x!==posicionx2 && dr[x-10].y!== posiciony2 && dr[x+10].x!==posicionx3 && dr[x+10].y!== posiciony3 && dr[x+11].x!==posicionx4 && dr[x+11].y!== posiciony4 ){
                   dr[x+1].eliminar(ctx);
                   dr[x-10] = dr[x+1];
                   dr[x-10].x = posicionx2;
                   dr[x-10].y = posiciony2;
                   dr[x-10].dibujar(ctx);
                   dr[x+1] = "" 
                  
                   dr[x-1].eliminar(ctx);
                   dr[x+10] = dr[x-1];
                   dr[x+10].x = posicionx3;
                   dr[x+10].y = posiciony3;
                   dr[x+10].dibujar(ctx);
                   dr[x-1] = "" 
                  
                   dr[x+9].eliminar(ctx);
                   dr[x+11] = dr[x+9];
                   dr[x+11].x = posicionx4;
                   dr[x+11].y = posiciony4;
                   dr[x+11].dibujar(ctx);
                   dr[x+9] = "" 
                    giro++
                    }

                    break
                }

                if(giro === 4){
                    posicionx2 = dr[x-10].x - 20
                    posiciony2 = dr[x-10].y + 20
                    posicionx3 = dr[x+10].x + 20
                    posiciony3 = dr[x+10].y - 20
                    posicionx4 = dr[x+11].x 
                    posiciony4 = dr[x+11].y - 40
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x-1].x!==posicionx2 && dr[x-1].y!== posiciony2 && dr[x+1].x!==posicionx3 && dr[x+1].y!== posiciony3 && dr[x-9].x!==posicionx4 && dr[x-9].y!== posiciony4 ){
                   dr[x-10].eliminar(ctx);
                   dr[x-1] = dr[x-10];
                   dr[x-1].x = posicionx2;
                   dr[x-1].y = posiciony2;
                   dr[x-1].dibujar(ctx);
                   dr[x-10] = "" 
                  
                   dr[x+10].eliminar(ctx);
                   dr[x+1] = dr[x+10];
                   dr[x+1].x = posicionx3;
                   dr[x+1].y = posiciony3;
                   dr[x+1].dibujar(ctx);
                   dr[x+10] = "" 
                  
                   dr[x+11].eliminar(ctx);
                   dr[x-9] = dr[x+11];
                   dr[x-9].x = posicionx4;
                   dr[x-9].y = posiciony4;
                   dr[x-9].dibujar(ctx);
                   dr[x+11] = "" 
                    giro=1
                    }

                    break
                }
            }

            if(nombre ==="J"){
                if (giro===1){
                 posicionx2 = dr[x+1].x -20
                 posiciony2 = dr[x+1].y -20
                 posicionx3 = dr[x-1].x + 20
                 posiciony3 = dr[x-1].y + 20;
                 posicionx4 = dr[x-11].x
                 posiciony4 = dr[x-11].y + 40
                 if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 &&posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x-10].x!==posicionx2 && dr[x-10].y!== posiciony2 && dr[x+10].x!==posicionx3 && dr[x+10].y!== posiciony3 && dr[x+9].x!==posicionx4 && dr[x+9].y!== posiciony4 ){
                 dr[x+1].eliminar(ctx);
                 dr[x-10] = dr[x+1]
                 dr[x-10].x = posicionx2;
                 dr[x-10].y = posiciony2;
                 dr[x-10].dibujar(ctx);
                 dr[x+1] = ""
                 
                 dr[x-1].eliminar(ctx);
                 dr[x+10] = dr[x-1]
                 dr[x+10].x = posicionx3;
                 dr[x+10].y = posiciony3;
                 dr[x+10].dibujar(ctx);
                 dr[x-1] = ""
                 
                 dr[x-11].eliminar(ctx);
                 dr[x+9] = dr[x-11]
                 dr[x+9].x = posicionx4;
                 dr[x+9].y = posiciony4;
                 dr[x+9].dibujar(ctx);
                 dr[x-11] = ""
                 giro++;
                 }
                 break
                }
                if (giro===2){
                    posicionx2 = dr[x-10].x - 20
                    posiciony2 = dr[x-10].y + 20
                    posicionx3 = dr[x+10].x + 20
                    posiciony3 = dr[x+10].y - 20;
                    posicionx4 = dr[x+9].x + 40
                    posiciony4 = dr[x+9].y
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380 &&posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x-1].x!==posicionx2 && dr[x-1].y!== posiciony2 && dr[x+1].x!==posicionx3 && dr[x+1].y!== posiciony3 && dr[x+11].x!==posicionx4 && dr[x+11].y!== posiciony4 ){
                    dr[x-10].eliminar(ctx);
                    dr[x-1] = dr[x-10]
                    dr[x-1].x = posicionx2;
                    dr[x-1].y = posiciony2;
                    dr[x-1].dibujar(ctx);
                    dr[x-10] = ""
                    
                    dr[x+10].eliminar(ctx);
                    dr[x+1] = dr[x+10]
                    dr[x+1].x = posicionx3;
                    dr[x+1].y = posiciony3;
                    dr[x+1].dibujar(ctx);
                    dr[x+10] = ""
                    
                    dr[x+9].eliminar(ctx);
                    dr[x+11] = dr[x+9]
                    dr[x+11].x = posicionx4;
                    dr[x+11].y = posiciony4;
                    dr[x+11].dibujar(ctx);
                    dr[x+9] = ""
                    giro++;
                    }
                    break
                   }

                   if (giro===3){
                    posicionx2 = dr[x-1].x + 20
                    posiciony2 = dr[x-1].y + 20
                    posicionx3 = dr[x+1].x - 20
                    posiciony3 = dr[x+1].y - 20;
                    posicionx4 = dr[x+11].x
                    posiciony4 = dr[x+11].y- 40
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380&&posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x+10].x!==posicionx2 && dr[x+10].y!== posiciony2 && dr[x-10].x!==posicionx3 && dr[x-10].y!== posiciony3 && dr[x-9].x!==posicionx4 && dr[x-9].y!== posiciony4 ){
                    dr[x-1].eliminar(ctx);
                    dr[x+10] = dr[x-1]
                    dr[x+10].x = posicionx2;
                    dr[x+10].y = posiciony2;
                    dr[x+10].dibujar(ctx);
                    dr[x-1] = ""
                    
                    dr[x+1].eliminar(ctx);
                    dr[x-10] = dr[x+1]
                    dr[x-10].x = posicionx3;
                    dr[x-10].y = posiciony3;
                    dr[x-10].dibujar(ctx);
                    dr[x+1] = ""
                    
                    dr[x+11].eliminar(ctx);
                    dr[x-9] = dr[x+11]
                    dr[x-9].x = posicionx4;
                    dr[x-9].y = posiciony4;
                    dr[x-9].dibujar(ctx);
                    dr[x+11] = ""
                    giro++;
                    }
                    break
                   }
                   if (giro===4){
                    posicionx2 = dr[x+10].x + 20
                    posiciony2 = dr[x+10].y - 20
                    posicionx3 = dr[x-10].x - 20
                    posiciony3 = dr[x-10].y + 20;
                    posicionx4 = dr[x-9].x - 40
                    posiciony4 = dr[x-9].y
                    if(posiciony2<=380 && posiciony3<=380 && posiciony4<=380&& posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && posicionx4>=0 && posicionx4<=180&& dr[x+1].x!==posicionx2 && dr[x+1].y!== posiciony2 && dr[x-1].x!==posicionx3 && dr[x-1].y!== posiciony3 && dr[x-11].x!==posicionx4 && dr[x-11].y!== posiciony4 ){
                    dr[x+10].eliminar(ctx);
                    dr[x+1] = dr[x+10]
                    dr[x+1].x = posicionx2;
                    dr[x+1].y = posiciony2;
                    dr[x+1].dibujar(ctx);
                    dr[x+10] = ""
                    
                    dr[x-10].eliminar(ctx);
                    dr[x-1] = dr[x-10]
                    dr[x-1].x = posicionx3;
                    dr[x-1].y = posiciony3;
                    dr[x-1].dibujar(ctx);
                    dr[x-10] = ""
                    
                    dr[x-9].eliminar(ctx);
                    dr[x-11] = dr[x-9]
                    dr[x-11].x = posicionx4;
                    dr[x-11].y = posiciony4;
                    dr[x-11].dibujar(ctx);
                    dr[x-9] = ""
                    giro=1;
                    }
                    break
                   }

            }


            if(nombre==="Z"){
                if(giro===1){
                    posicionx2 = dr[x-11].x + 20
                    posiciony2 = dr[x-11].y + 40
                     posicionx3 = dr[x-10].x + 20;
                     posiciony3 = dr[x-10].y ;
                     if(posiciony2<=380 && posiciony3<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && dr[x+10].x!==posicionx2 && dr[x+10].y!== posiciony2 && dr[x-9].x!==posicionx3 && dr[x-9].y!== posiciony3){
                     dr[x-11].eliminar(ctx)
                     dr[x+10] = dr[x-11];
                     dr[x+10].x= posicionx2
                     dr[x+10].y = posiciony2;
                     dr[x+10].dibujar(ctx);
                     dr[x-11]=""
                     dr[x-10].eliminar(ctx)
                     dr[x-9] = dr[x-10];
                     dr[x-9].x= posicionx3
                     dr[x-9].y = posiciony3;
                     dr[x-9].dibujar(ctx);
                     dr[x-10]=""
                      giro++
                   }
                   break;
                  }
                  if(giro===2){
                    posicionx2 = dr[x+10].x - 20
                    posiciony2 = dr[x+10].y - 40
                     posicionx3 = dr[x-9].x - 20;
                     posiciony3 = dr[x-9].y ;
                     if(posiciony2<=380 && posiciony3<=380 && posicionx2>=0 && posicionx2<=180 &&posicionx3>=0 && posicionx3<=180 && dr[x-11].x!==posicionx2 && dr[x-11].y!== posiciony2 && dr[x-10].x!==posicionx3 && dr[x-10].y!== posiciony3){
                     dr[x+10].eliminar(ctx)
                     dr[x-11] = dr[x+10];
                     dr[x-11].x= posicionx2
                     dr[x-11].y = posiciony2;
                     dr[x-11].dibujar(ctx);
                     dr[x+10]=""
                     dr[x-9].eliminar(ctx)
                     dr[x-10] = dr[x-9];
                     dr[x-10].x= posicionx3
                     dr[x-10].y = posiciony3;
                     dr[x-10].dibujar(ctx);
                     dr[x-9]=""
                      giro=1;
                   }
                   break;
                  }
            }

            if (nombre==="S"){
                if(giro===1){
                  posicionx2 = dr[x-9].x
                  posiciony2 = dr[x-9].y + 20
                   posicionx3 = dr[x-1].x + 40;
                   posiciony3 = dr[x-1].y + 20;
                   if(posiciony2<=380 && posiciony3<=380 &&posicionx2>=0 && posicionx2<=180&&posicionx3>=0 && posicionx3<=180 && dr[x+1].x!==posicionx2 && dr[x+1].y!== posiciony2&& dr[x+11].x!==posicionx3 && dr[x+11].y!== posiciony3){
                   dr[x-9].eliminar(ctx)
                   dr[x+1] = dr[x-9];
                   dr[x+1].x= posicionx2
                   dr[x+1].y = posiciony2;
                   dr[x+1].dibujar(ctx);
                   dr[x-9]=""
                   dr[x-1].eliminar(ctx)
                   dr[x+11] = dr[x-1];
                   dr[x+11].x= posicionx3
                   dr[x+11].y = posiciony3;
                   dr[x+11].dibujar(ctx);
                   dr[x-1]=""
                    giro++
                 }
                 break;
                }
                if(giro===2){
                    posicionx2 = dr[x+1].x
                    posiciony2 = dr[x+1].y - 20
                     posicionx3 = dr[x+11].x - 40;
                     posiciony3 = dr[x+11].y - 20;
                     if(posiciony2<=380 && posiciony3<=380 &&posicionx2>=0 && posicionx2<=180&&posicionx3>=0 && posicionx3<=180 && dr[x-9].x!==posicionx2 && dr[x-9].y!== posiciony2&& dr[x-1].x!==posicionx3 && dr[x-1].y!== posiciony3){
                     dr[x+1].eliminar(ctx)
                     dr[x-9] = dr[x+1];
                     dr[x-9].x= posicionx2
                     dr[x-9].y = posiciony2;
                     dr[x-9].dibujar(ctx);
                     dr[x+1]=""
                     dr[x+11].eliminar(ctx)
                     dr[x-1] = dr[x+11];
                     dr[x-1].x= posicionx3
                     dr[x-1].y = posiciony3;
                     dr[x-1].dibujar(ctx);
                     dr[x+11]=""
                      giro=1
                   }
                  }
               break;
               }
            if(nombre==="T"){
                if(giro===1){
                posicionx2 = dr[x+1].x - 20;
                posiciony2 = dr[x+1].y + 20;
                if(posiciony2<=380 &&posicionx2 >= 0 &&  posicionx2<=180 && dr[x+10].x!==posicionx2 && dr[x+10].y!==posiciony2){
                    dr[x+1].eliminar(ctx);
                    dr[x+10]= dr[x+1]
                    dr[x+10].x = posicionx2;
                    dr[x+10].y = posiciony2;
                    dr[x+10].dibujar(ctx);
                    dr[x+1] = "";
                    giro++;  
                }

                        break;    
                }
                if(giro===2){
                    posicionx2 = dr[x-10].x + 20;
                    posiciony2 = dr[x-10].y + 20;
                    if(posiciony2<=380 &&posicionx2 >= 0 &&  posicionx2<=180 && dr[x+1].x!==posicionx2 && dr[x+1].y!==posiciony2){
                        dr[x-10].eliminar(ctx);
                        dr[x+1]= dr[x-10]
                        dr[x+1].x = posicionx2;
                        dr[x+1].y = posiciony2;
                        dr[x+1].dibujar(ctx);
                        dr[x-10] = "";
                    giro++;  
                    }     
                      break;  
                }
            
                if(giro===3){
                    posicionx2 = dr[x-1].x + 20;
                    posiciony2 = dr[x-1].y - 20;
                    if(posiciony2<=380 && posicionx2 >= 0 &&  posicionx2<=180&& dr[x-10].x!==posicionx2 && dr[x-10].y!==posiciony2){
                        dr[x-1].eliminar(ctx);
                        dr[x-10]= dr[x-1]
                        dr[x-10].x = posicionx2;
                        dr[x-10].y = posiciony2;
                        dr[x-10].dibujar(ctx);
                        dr[x-1] = "";
                        giro++;
                      }     
                      break;  
                }
                if(giro===4){
                    posicionx2 = dr[x+10].x - 20;
                    posiciony2 = dr[x+10].y - 20;
                    if(posiciony2<=380 &&posicionx2 >= 0 &&  posicionx2<=180&& dr[x-1].x!==posicionx2 && dr[x-1].y!==posiciony2){
                        dr[x+10].eliminar(ctx);
                        dr[x-1]= dr[x+10]
                        dr[x-1].x = posicionx2;
                        dr[x-1].y = posiciony2;
                        dr[x-1].dibujar(ctx);
                        dr[x+10] = "";
                        giro=1;
                      }     
                      break;  
                }
                
                
                
            }
    

        }
     
          una_vez=1
        crearClonBajada()
    
    }
}

#pragma strict
var axis: float;
var axisD: float;
var axisT: float;
var contador3: short;
function Start () {
contador3=0;
}

function Update () {
axis=Input.GetAxis("Horizontal");

for(var i:int =0; i<2000000; i++){
//i7 2600k 1.6ghz 1333
//contador=contador+Time.deltaTime; //8.5fps
//contador=contador+2.555555f; //43fps
//contador=objsc.contador+contador+contador; //38fps (43fps em 2 somas);
//contador=contador+contador; //43fps
//contador=contador*99999999999999999;  //41fps
//contador2=contador2+1; //52fps
//contador2++; //52fps
//vetor=vetor+Vector3(1,0.5,2); //5,2fps
//vetor=Vector3(1,0.5,2); //11,9fps
//vetor=Vector3(1,0.5,2)*1; //5,4fps
//vetor=Vector3(1,0.5,2)*55; //5,4fps
//vetor=Vector3(1,0.5,2)*99999999999999999; //5,4fps

//contador2=5; //52fps;
//contador=5f; //49.1ps;
//texto="64218"; //49.1fps;
//vdd=false; //50fps
//if(vdd==false) {      } //50fps
//if(contador2==0) {      } //50fps int
//if(contador>500) {      } //45.3fps float
//if(contador3==0) {      } //54.3fps short
//if(vetor==Vector3(1,01,05)) {      } //3.9fps
//if(vetor.x==1) {      } //44.5fps
//if(vetor.x>1) {      } //46fps
//if(vetor.x>1 && vetor.x<10) {      } //39fps

//if(vetor.x>1 && vdd==false) {      } //41fps
//if(vetor.x>1 && contador2==1) {      } //41.3fps
//if(texto=="teste") {      } //12fps
//if(gameObject.tag=="sad") {      } //0.8fps
//if(Input.GetAxis("Horizontal")) { } //1.2fps
//if(logaxis>0) { } //43fps
//axis=Mathf.Clamp(axis*100,-1f,1); //13.3fps
}


}
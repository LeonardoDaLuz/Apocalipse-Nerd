#pragma strict
var cam: Camera;
var targetTexture: RenderTexture;
var targetTexturenull: RenderTexture;
var Cont: int;
function Start () {

}
function Update(){
if(Cont==0) {
cam.enabled=false;

}
Cont++;

if(Cont>3) {
Cont=0;
cam.enabled=true;

}
//cam.targetTexture=targetTexture;
if(Input.GetKeyDown("q")) {
cam.enabled=false;

}
}
function LateUpdate () {
//cam.enabled=false;

}
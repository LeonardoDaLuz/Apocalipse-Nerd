#pragma strict
var ativo: int;
var anim: Animator;
//var rendersetcolor: Renderer;

function Start () {
anim = GetComponent(Animator);
//rendersetcolor=GetComponent(Renderer);
//rendersetcolor.material.SetColor("_Color", Color.red); 
GetComponent.<Renderer>().material.SetColor("_Color", Color(Random.Range(0f,1f), Random.Range(0f,1f), Random.Range(0f,1f), 1));
ativo=1;
}

function Update () {

}
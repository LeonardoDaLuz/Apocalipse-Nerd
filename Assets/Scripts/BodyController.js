#pragma strict
var ativado: boolean;
var rb: Rigidbody2D;
var Pulo: float;
var Player1Base: GameObject;
var BaseControllerScript: BaseController;
var AtaqueDetector: GameObject;

function Start () {
rb=gameObject.GetComponent.<Rigidbody2D>();
BaseControllerScript=Player1Base.GetComponent(BaseController);
ativado=false;
}

function Update () {
//AtaqueDetector.transform.localPosition.y=5;
}

function OnCollisionEnter2D (collider: Collision2D) {


}




#pragma strict
var QuantidadeInimigos: int;
var player: GameObject;
var zumbispawn: GameObject;
	var spawnx: float;
	var spawny: float;
var Inimigos: GameObject[];
var ZmbMovementscript: ZmbMovement;
var TimeCont: float;
var TimeContduo: int;
var TimeContquad: int;
var i: int;

function Start () {
//Instantiate(zumbispawn, Vector3(player.transform.position.x+15,player.transform.position.y, player.transform.position.z), Quaternion.Euler(0,0,0));

spawny=3.5f;
}

function ScandozumbiA () {
Inimigos=GameObject.FindGameObjectsWithTag("Zumbi");
for(i=0;i<Inimigos.length;i++) {
//	print("ZBMD");

	ZmbMovementscript=Inimigos[i].GetComponent(ZmbMovement);
	if(ZmbMovementscript.enabled) { ZmbMovementscript.ProcuraPresa(); }
}
}
function SpawnZumbi () {
	if(Random.Range(0f,1f)>0.5f) { spawnx=player.transform.position.x+(Random.Range(16f,30f));	} 
	else {		spawnx=player.transform.position.x-Random.Range(16f,30f);	}
Instantiate(zumbispawn, Vector3(spawnx,player.transform.position.y, player.transform.position.z), Quaternion.Euler(0,0,0));
QuantidadeInimigos++;
}

function Update () {
TimeCont=TimeCont+Time.deltaTime;
	if(TimeCont>1) {
		TimeCont=0;
		TimeContduo++;
		if(TimeContduo==2) {

			ScandozumbiA();
//			print("ScandozumbiA: Fez findgameobject");
			TimeContduo=0;
			TimeContquad++;
			if(TimeContquad==2) {
				SpawnZumbi();
			TimeContquad=0;
			}
		}
	}

if(transform.position.x>-48 && transform.position.x<10.88) {
transform.position.x=player.transform.position.x;
}
if(transform.position.x<-48 && player.transform.position.x>transform.position.x) {
transform.position.x=player.transform.position.x;
}
if(transform.position.x>-10.88 && player.transform.position.x<transform.position.x) {
transform.position.x=player.transform.position.x;

}
}
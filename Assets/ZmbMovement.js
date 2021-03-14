#pragma strict

//detecçao de alvo>>>>>>>>>>>>>>>>>>>>>>>
var Jogadores: GameObject[];
var alvo: GameObject;
var alvoconvertx: float;
var i: int;
var tempdistanciaA: float;
var tempdistanciaB: float;
var speed: float;
var speed2: float;
//-----------------------------
//controlador de corpo>>>>>>>>>>>>>>>>>>>>>>>
var zumbibodyscript: zumbibody;
var zumbi: GameObject; //zumbibody
var anim: Animator;
//------------------------------------------
//Receber danos>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var forcadano: AtaqueDetector;
var verificador: int;
var levaporrada: AudioClip;
var life: float;
var atordoado: float;
var mordidacount: float;
var tocar: AudioSource;
var log: boolean;
//---------------------------

function Start () {
//Danos>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
life=120;
verificador=3;
tocar=gameObject.GetComponent(AudioSource);
//Controlador de corpo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
anim = zumbi.GetComponent(Animator);
zumbibodyscript=zumbi.GetComponent(zumbibody);
zumbibodyscript.ativo=verificador;


//Movimento>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
speed=Random.Range(0.005, 0.035);
speed2=speed/2;



//Detecçao de alvo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Jogadores=GameObject.FindGameObjectsWithTag("Player");
alvo=Jogadores[0];
if(alvo.transform.position.x<0) {  alvoconvertx=-alvo.transform.position.x;  }      
for(i=0;i<Jogadores.length;i++) {
	tempdistanciaA=Jogadores[i].transform.position.x-transform.position.x;
	tempdistanciaB=alvo.transform.position.x-transform.position.x;
	if(tempdistanciaA<0) {  tempdistanciaA=-tempdistanciaA;    }
	if(tempdistanciaB<0) {  tempdistanciaB=-tempdistanciaB;    }
//	print("se "+tempdistanciaA+" for menor que "+tempdistanciaB);

	
	if(tempdistanciaA<tempdistanciaB) {
		alvo=Jogadores[i];
     }
}
}

function ProcuraPresa() {
Jogadores=GameObject.FindGameObjectsWithTag("Player");
alvo=Jogadores[0];
if(alvo.transform.position.x<0) {  alvoconvertx=-alvo.transform.position.x;  }      
for(i=0;i<Jogadores.length;i++) {
	tempdistanciaA=Jogadores[i].transform.position.x-transform.position.x;
	tempdistanciaB=alvo.transform.position.x-transform.position.x;
	if(tempdistanciaA<0) {  tempdistanciaA=-tempdistanciaA;    }
	if(tempdistanciaB<0) {  tempdistanciaB=-tempdistanciaB;    }
//	print("se "+tempdistanciaA+" for menor que "+tempdistanciaB);

	
	if(tempdistanciaA<tempdistanciaB) {
		alvo=Jogadores[i];
     }
}
}


function Update () {
//Atordoado>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	if(atordoado>0) {
		atordoado=atordoado+Time.deltaTime;
		anim.SetBool("andando", false);
		anim.SetBool("parado", false);
		anim.SetBool("mordida", false);
		if(atordoado>0.5) { atordoado=0; }
	}
//-----------------------------------------------		
//Controle de perspectiva>>>>>>>>>>>>>>>>>>>>>
transform.position.z=transform.position.y;
//-------------------------------------------
//morder>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
if(atordoado==0) {
if(transform.position.x>alvo.transform.position.x-1.5 && transform.position.x<alvo.transform.position.x+1.5) {
	if(transform.position.y>alvo.transform.position.y-1.0 && transform.position.y<alvo.transform.position.y+1.0) {
	if(mordidacount==0) { mordidacount=0.1f; }
	anim.SetBool("mordida", true);
	anim.SetBool("parado", false);


if(transform.position.x<alvo.transform.position.x) { transform.localScale.x=-0.2817029; } else { transform.localScale.x=0.2817029; }

}} else { anim.SetBool("mordida", false); }
}
if(mordidacount>0) { mordidacount=mordidacount+Time.deltaTime; if(mordidacount>1) { mordidacount=0;  } }
//----------------------------------------------
//Andar>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
if(atordoado==0) {
 if(mordidacount==0) {

anim.SetBool("andando", true);
anim.SetBool("andando", false);

if(transform.position.x<alvo.transform.position.x-1.5) {
	transform.Translate(Vector3.right*speed);
	transform.localScale.x=-0.2817029;

	anim.SetBool("andando", true);
	//print("Direita");
} else {
if(transform.position.x>alvo.transform.position.x+1.5) {
	transform.Translate(Vector3.left*speed);
	transform.localScale.x=0.2817029;


	anim.SetBool("andando", true);
	//print("esquerda");
}}
if(transform.position.y>alvo.transform.position.y+0.4) {
	transform.Translate(Vector3.down*speed2);

	anim.SetBool("andando", true);
	//print("baixo");
} else {
if(transform.position.y<alvo.transform.position.y-0.4) {
	transform.Translate(Vector3.up*speed2);

	anim.SetBool("andando", true);
	//print("cima");
}}

}
} 
}
function OnTriggerEnter2D(coll: Collider2D) {
//print(coll.gameObject.tag);

if(coll.gameObject.tag=="AtaquePlayer")
{
		anim.SetTrigger("atordoado");
		forcadano=coll.gameObject.GetComponent(AtaqueDetector);
atordoado=0.1f;
life=life-forcadano.dano;
if(life<1) { 
anim.SetTrigger("morrer");
anim.SetBool("morto",true);

  // Removes this script instance from the game object

    
gameObject.GetComponent(Collider2D).enabled=false;
//print("Zumbi morto");
	gameObject.tag="dead";
     Destroy (this);
  
    }
tocar.clip=levaporrada;
tocar.Stop();
tocar.Play();

}

}


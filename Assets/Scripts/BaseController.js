#pragma strict
//andar>>>>>>>>>>>>>>>>>
var axis: float; //axis analogico
var axisD: float; //axis digital
private var axisT: float;
var chao: boolean; //se ativado sao movimentos enquanto andando ou parado, se desativado, sao movimentos no ar
var ativado2: boolean;
var andar: float;
var correrA: int;
var correrB: float;
var correrC: boolean;
var ataquecorrendoA: boolean;
var ataquecorrendoB: float;
var ataquecorrendodir: float;
var ataqueArA: boolean;
var ataqueArB: float;
var ataqueArdir: float;
//----------------------
//Ataque>>>>>>>>>>>>>>>>>
var atacando: boolean;
var ataquecont: float;
var comboetapa: int;
var whoosh: AudioClip;
var tocar: AudioSource;
var poderdaporrada: int;
var AtaqueDetectoP: AtaqueDetector;
var AtaqueDetectoOb: GameObject;
var AtaqueDetectoCol: Collider2D;
//---------------------
//Pulo>>>>>>>>>>>>>>>>>>
var Pulo: float;
var Bodyrb: Rigidbody2D;



//------------------
//Danos>>>>>>>>>>>>>>>>>
var atordoado: boolean;
var LifeBar: GameObject;
var LifeCount: float;
var LifeBarWidth: float;
var zumbidano: AtaqueDetector;
var Atordoado: float;
//-----------------------
//Algoritmo dimensao beat'n up>>>
var Player1body: GameObject;
var BodyControllerscript: BodyController;
var anim: Animator;
var rb: Rigidbody2D;
var col: Collider2D;
//------------------------

function Start () {
atordoado=false;
atacando=false;
LifeBar=GameObject.Find("BarraLife");
LifeCount=500f;
LifeBarWidth=2.2823615;
LifeBar.transform.localScale.x=LifeBarWidth*(LifeCount*0.01);
tocar=gameObject.GetComponent(AudioSource);
anim=Player1body.GetComponent(Animator); //controla a animaçao do corpo do personagem
rb=gameObject.GetComponent.<Rigidbody2D>();
col=gameObject.GetComponent.<Collider2D>();
BodyControllerscript=Player1body.GetComponent(BodyController);
Bodyrb=Player1body.GetComponent.<Rigidbody2D>();
chao=true;
Physics2D.IgnoreCollision(gameObject.GetComponent(Collider2D), Player1body.GetComponent(Collider2D), true);
Player1body.transform.position.y=transform.position.y+0.75f;
AtaqueDetectoP=Player1body.GetComponentInChildren(AtaqueDetector);
AtaqueDetectoCol=AtaqueDetectoOb.GetComponent(Collider2D);

}

function Update () {
//Controles>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> - Feito para evitar chamar a funçao input.getaxis
axis=Input.GetAxis("Horizontal");
	//isso converte a axis para digital :( tudo isso so pra torna-lo digital. >>>>>>>>>>>>>>>>>>>
if(axis>0) {
	if(axis>axisT) { axisD=1; } else {
	if(axis<axisT) { axisD=0; } }
	} else {
		if(axis<0) {
			if(axis<axisT) { axisD=-1; } else {
			if(axis>axisT) { axisD=0; }}
		} else { axisD=0; }
	}
	axisT=axis;
	//----------------------------------------------------------------
//--------------------------------------------------------------
//Atordoado>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	if(Atordoado>0) {
		Atordoado=Atordoado+Time.deltaTime;
		anim.SetBool("andando",false);
		anim.SetBool("correndo", false);
		if(Atordoado>0.3) { Atordoado=0; }
		correrA=0;
		correrB=0;
		correrC=false;
	} 

	else {
//-------------------------------------------------------------
	anim.SetBool("parado", true);
	anim.SetBool("andando", false);
//Atacar>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	if(Input.GetKeyDown("f") && ataquecont==0 && chao==true ) { //se ja nao tiver atacando, iniciar a contagem da progressao do ataque
			//ataque comum enquanto anda e esta parado>>>>>>>>>>>
			if(correrC==false && ataquecorrendoB==0) { //se nao estiver correndo
				ataquecont=0.001f; //começa sequencia de golpes
				comboetapa=1; //ativa a etapa 1 dos golpes
				anim.SetTrigger("ataqueA"); //ativa animaçao ataque A
				AtaqueDetectoP.dano=10;
				AtaqueDetectoOb.transform.position.y=transform.position.y;
				anim.SetBool("andando", false); //desativa o andar para que o animator n fique indeciso entre ficar parado e andando
				anim.SetBool("parado", true); //ativa para que possa parar de dar golpes por uns milisegundos, senao o animator n vai saber pra onde ir.
				tocar.clip=whoosh;
				tocar.Stop();
				tocar.Play();//toca audio do soco
				atacando=true; //sinaliza q ta atacando
			}
			//------------------------------------------------
			//ataque equanto corre>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			if(correrC==true) { //se estiver correndo, e se der um golpe F
				anim.SetBool("correndo",false);
				anim.SetBool("parado",false);
				anim.SetBool("ataquecorrendo", true); //ativa animaçao do ataque correndo
				ataquecorrendoA=true; //sinaliza q ta fazendo o ataque do correndo
				ataquecorrendoB=0.1f; //inicia contador para o ataque correndo
				AtaqueDetectoP.dano=200;
				//faz pular no ataque>>>>>
				Bodyrb.gravityScale=0.9; //desativa a gravidade
				Bodyrb.velocity.y=6.2; //desativa a velocidade y
				Pulo=20;
				chao=false;
				//Physics2D.IgnoreCollision(Player1body.GetComponent(Collider2D), gameObject.GetComponent(Collider2D), false); //ativa a colisao do corpo com a base
				//------------------
				ataquecorrendodir=axisD; //estabelece direçao fixa para este ataque.
				atacando=true; //sinaliza que ta atacando tb, pra evitar possiveis confusoes dos scripts
			    anim.SetBool("andando", false); //desativa o andando
			    correrB=0;
			    correrC=false;
			    
		}
	}
	//ataque equanto corre>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		if(ataquecorrendoB>0) { //se o contador ataque correndo for maior que zero, aumentar contagem com o tempo
			ataquecorrendoB=ataquecorrendoB+Time.deltaTime;
			transform.position.x=transform.position.x+(ataquecorrendodir*Time.deltaTime*12);
			AtaqueDetectoOb.transform.position.y=transform.position.y;
			//if(Player1body.transform.position.y>transform.position.y+1.4f) { //especialmente para refinar o detector de colisao para o zumbi, tipo, ele tem q estar a uma certa altura pra poder nao colidir com o zumbi
				//Physics2D.IgnoreLayerCollision(11,13, true); ////ativa o colisor se estiver abaixo da altura de 1.4 do chao
			//	} else {
			//	Physics2D.IgnoreLayerCollision(11,13, false); ////ativa o colisor se estiver abaixo da altura de 1.4 do chao
			//}
			
			AtaqueDetectoCol.enabled=false;
			if(ataquecorrendoB>1.5) { //se o contador chegar ao limite de 1 segundo
				AtaqueDetectoOb.transform.position.y=transform.position.y;
				correrB=0;
				ataquecorrendoB=0; //desabilita contador
				atacando=false; //sinaliza que o ataque acabou
				ataquecorrendoA=false;  //sinaliza que o ataque correndo acabou
				anim.SetBool("ataquecorrendo", false);
				anim.SetBool("andando", true); //reativa a animaçao de andando, para que ela seja em seguida da animaçao do ataque correndo
				//Physics2D.IgnoreLayerCollision(11,13, false); ////ativa o colisor se estiver abaixo da altura de 1.4 do chao
				}
			}
				
	
	
	//ataque comum enquanto anda e esta parado>>>>>>>>>>>
	if(ataquecont>0) {//se este contador estiver ativado (maior que zero), ativar contagem do tempo
		ataquecont=ataquecont+Time.deltaTime; //faz contagem do tempo, cronometro - Verifique em ordem decrescente (para evitar que o mesmo input de F contamine as proximas verificaçoes
		if(comboetapa==5) { //se estiver no golpe da etapa 5
			if(ataquecont>3.2f) {  ataquecont=0; comboetapa=0;  atacando=false; }
			if(ataquecont>2.5) {  atacando=false;  } //prazo para destravar o andar
			if(ataquecont>2.4 && ataquecont<3.2 && Input.GetKeyDown("f")) {
			//print("!! Atacou uma quinta vez...");
			anim.SetTrigger("ataqueC"); comboetapa=0;  //print("6");
			AtaqueDetectoP.dano=20;
			comboetapa=0;
				print("6 "+ataquecont);
				tocar.clip=whoosh;
		   		tocar.Stop();
				tocar.Play();
			}
		} else {

			if(comboetapa==4) {  //se estiver no golpe da etapa 4
				if(ataquecont>2.4) {  ataquecont=0; comboetapa=0; atacando=false;  }
				if(ataquecont>1.4) {  atacando=false;  } //prazo para destravar o andar
				if(ataquecont>1.9 && ataquecont<2.4 && Input.GetKeyDown("f")) {
				//print("!! Atacou uma quarta vez...");
		   		comboetapa=5; anim.SetTrigger("ataqueC");// print("5");
		   		AtaqueDetectoP.dano=20;
		   		atacando=true; //prazo para destravar o andar
		   		ataquecont=2.1f;
		   		print("5 "+ataquecont);
		   		tocar.clip=whoosh;
		   		tocar.Stop();
				tocar.Play();
				}
			} else {

			if(comboetapa==3) {  //se estiver no golpe da etapa 3
				if(ataquecont>1.8) {  ataquecont=0; comboetapa=0; atacando=false; } //prazo para sequencia
				if(ataquecont>1.2) {  atacando=false;  } //prazo para destravar o andar
				if(ataquecont>1.6 && ataquecont<1.85 && Input.GetKeyDown("f")) {
				//print("!! Atacou uma quarta vez...");
				comboetapa=4; anim.SetTrigger("ataqueC"); //print("4");
				AtaqueDetectoP.dano=20;
				atacando=true; //prazo para destravar o andar
				ataquecont=1.8f;
				print("4 "+ataquecont);
				tocar.clip=whoosh;
							tocar.Stop();
				tocar.Play();
				}
				} else { 
					if(comboetapa==2) {  //se estiver no golpe da etapa 2
						if(ataquecont>0.8) {  ataquecont=0; comboetapa=0; atacando=false;  } //prazo para proxima sequencia
							if(ataquecont>0.3) {  atacando=false;  } //prazo para proxima sequencia
						if(ataquecont>0.4 && ataquecont<1.26 && Input.GetKeyDown("f")) {
						atacando=true; //prazo para destravar o andar
						comboetapa=3; anim.SetTrigger("ataqueB");// print("3");
						AtaqueDetectoP.dano=15;
						atacando=true; //prazo para destravar o andar
						ataquecont=1.2f;
						print("3 "+ataquecont);
						tocar.clip=whoosh;
						tocar.Stop();
						tocar.Play();
					}
					} else {
						if(comboetapa==1) {  //se estiver no golpe da etapa 1
							if(ataquecont>0.4) {  ataquecont=0; comboetapa=0; anim.SetBool("ataqueA", false); atacando=false;  }
							if(ataquecont>0.1) {  atacando=false;  }
							if(ataquecont>0.15 && ataquecont<0.4 && Input.GetKeyDown("f")) {
					//	print("Atacou uma segunda vez...");
							comboetapa=2; anim.SetTrigger("ataqueA");// print("2");
							AtaqueDetectoP.dano=10;
							atacando=true; //prazo para destravar o andar
							print("2 "+ataquecont);
							ataquecont=0.4f;
							tocar.clip=whoosh;
							tocar.Stop();
							tocar.Play();
							}
						} else {  //se estiver no golpe da etapa 0
							if(comboetapa==0) {
								if(ataquecont>2.8f) {  ataquecont=0; comboetapa=0;  }
							}
						}
					}
				}
			}
		}
	}
	
	if(Input.GetKeyDown("f") && ataquecont==0 && chao==false && ataquecorrendoB==0 ) {
		anim.SetTrigger("ataquear");
		anim.SetBool("correndo", false);
		ataqueArB=0.1f;
		ataqueArdir=Player1body.transform.localScale.x;
		AtaqueDetectoP.dano=100;
	}
	if(ataqueArB>0) {
	 	AtaqueDetectoP.dano=100;
			AtaqueDetectoOb.transform.position.y=transform.position.y;
		 ataqueArB=ataqueArB+Time.deltaTime;
		 
	 	transform.position.x=transform.position.x+(ataqueArdir*Time.deltaTime*1);
			if(Player1body.transform.position.y>transform.position.y+3f) { //especialmente para refinar o detector de colisao para o zumbi, tipo, ele tem q estar a uma certa altura pra poder nao colidir com o zumbi
			Physics2D.IgnoreLayerCollision(11,13, true); ////ativa o colisor se estiver abaixo da altura de 1.4 do chao
			} else {
			Physics2D.IgnoreLayerCollision(11,13, false); ////ativa o colisor se estiver abaixo da altura de 1.4 do chao
			}
	 	if(ataqueArB>0.8) {
	 	 anim.SetBool("correndo", false);
	 		ataqueArB=0;
	 	
	 	}
	
	
	}
//----------------------------------combos----------------------------------------------

//Andar e correr>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	//Movimentos verticais>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	if(chao==true && atordoado==false) { //o chao  significa que nao esta em pulo, esta no chao, serve pra alternar entre controles no ar e no chao

		//anim.SetBool("andando", false);
		if(Input.GetAxis("Vertical")) {//se estou apertando o vertical
			if(ataquecont==0) {
				transform.Translate(Vector3(0, Input.GetAxis("Vertical")*Time.deltaTime*4, 0));
				anim.SetBool("andando", true);
				anim.SetBool("parado", false);
			} else { transform.Translate(Vector3(0, Input.GetAxis("Vertical")*Time.deltaTime*1, 0)); }
		}
		Player1body.transform.position.y=transform.position.y+0.75f; //fixa o corpo no chao
		//chao=true;
		Pulo=0;
		//Physics2D.IgnoreLayerCollision(10,11, false);
	} else { //enquanto nao estiver no chao
		//Controles de movimento vertical enquanto estiver no ar>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		Physics2D.IgnoreLayerCollision(10,11, true); //desabilita colisor entre camadas 10 e 11
		if(ataquecont==0) { // se nao estiver atacando
			if(Input.GetAxis("Vertical")) { //se aperta vertical
				if(atordoado==false) {  //enquanto estiver apertando axis vertical e nao estiver atordoado
				transform.Translate(Vector3(0, Input.GetAxis("Vertical")*Time.deltaTime*4, 0)); //resumindo, isso faz o movimento do translate durante o ar caso nao esteja atordoado
				} else { //se estiver atordoado
				transform.Translate(Vector3(0, Input.GetAxis("Vertical")*Time.deltaTime*1, 0)); } //mover-se de maneira lenta caso esteja no ar e atordoado
				col.enabled=false; //desabilita colisor durante o ar
				col.enabled=true; //abilita colisor durante o ar, estes 2 sao um reset
			}
		}
		//--------------------movimentos verticais---------------------------------------
	}

	//Movimentos Horizontais>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		if(Input.GetAxis("Horizontal") && atordoado==false) 	{  //se nao estiver atordoado *****IMPORTANTISSIMO: Esse axis suave deu problema pra krl, fique atento***********
			if(correrC==false && ataquecorrendoB==0 ) { //Se nao estiver correndo nem atacando correndo
				if(axis>0) { Player1body.transform.localScale.x=1; }  //faz flip na direçao do personagem quando anda
				if(axis<0) { Player1body.transform.localScale.x=-1; }  //faz flip na direçao do personagem quando anda
				if(ataquecont==0) {
					anim.SetBool("parado", false);
					anim.SetBool("andando", true);
					
					transform.Translate(Vector3(Input.GetAxis("Horizontal")*Time.deltaTime*7, 0, 0)); //faz o translate comum **************IMPORTANTE*********
				} else {
					transform.Translate(Vector3(Input.GetAxis("Horizontal")*Time.deltaTime*1, 0, 0)); //faz o translate bem lento enquanto estiver no ataque, ****IMPORTANTE*****
					anim.SetBool("parado", true); //ativa o parado, pq este e uma especie de default para ter pra onde a animaçao fugir sempre
				}
				if(ataquecont==0)  {
					anim.SetBool("andando", true);
				}
					
			}
			if(axisD!=0 && correrB>0 || axisD!=0&& correrB<0) { //se estiver correndo, movimentar-se mais rapidamente, o dobro da velocidade parece complicado, mas fiz devido a burlar o axis do unity ser macio
				if(ataquecorrendoB==0) { //se nao estiver atacando correndo, o ataquecorrendo e um contador, se e zero, nao esta.
					anim.SetBool("parado", false); //parado false
					correrC=true; //sinaliza que esta correndo
					if(axis>0) { Player1body.transform.localScale.x=1; }  //faz flip na direçao do personagem quando anda
					if(axis<0) { Player1body.transform.localScale.x=-1; } //faz flip na direçao do personagem quando anda, na verdade ambos nem sao necessarios, mas vou deixar, pra evitar bug, depois, tentar tirar.
					if(ataquecont==0) { //se nao estiver atacando, entao prosseguri com translate
						print("CORRENDO");
						transform.Translate(Vector3(Input.GetAxis("Horizontal")*Time.deltaTime*14, 0, 0)); //faz translate de correr *************IMPORTANTE************************
					} else {
						transform.Translate(Vector3(Input.GetAxis("Horizontal")*Time.deltaTime*1, 0, 0)); anim.SetBool("parado", true); //se movimenta mais lentamente
					}
				if(ataquecont==0)  { anim.SetBool("correndo", true); }
				}
			}
			
		}
		//CORRER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>aciona a contagem de um prazo para poder apertar o direcional novamente e começar a correr
		if(axisD>0) { //se o axis digital ta positivo +1
			if(correrA!=1) { correrA=1; } //etapa A do correr e 1, isto e um trigger e ao mesmo tempo um indicador de direçao
		}
		if(axisD<0) { // se o axis digital ta negativo -1
			if(correrA!=-1) { correrA=-1; } //etapa A do correr e -1, isto e um trigger e ao mesmo tempo um indicador de direçao, o correr A serve justamente como uma flag q so funciona uma vez a cada vez q aperta o direcional
		}
		if(axisD==0) { //se soltou o axis digital
			if(correrA==1) { correrB=1; correrA=0; } //se ocorrerA e igual a 1, começar a contagem.
			if(correrA==-1) { correrB=-1; correrA=0; }
			if(correrB>0) {
				correrB=correrB+Time.deltaTime;
				if(correrB>1.1) { correrB=0; }
				if(axisD>0) { anim.SetTrigger("interrompe"); } //interrompe animaçao de correr quando ha interrupçao de direçao
			
			}
			if(correrB<0) {
				correrB=correrB-Time.deltaTime;
				if(correrB<-1.1) { correrB=0; }
				if(axisD>0) { anim.SetTrigger("interrompe"); }  //interrompe animaçao de correr quando ha interrupçao de direçao
 			}
 			if(correrC==true)
 				{ correrC=false; correrB=0; anim.SetBool("correndo", false); }//desabilita correr
 		}
 		
 		//-------------------correr------------------------------------
	//------------------------movimentos horizontais------------------------------------
  
 } // <<< essa chave fecha o Else do atordoado==true  *****************IMPORTANTE*****************************************
//-------------------------atordoado else--------------------------------------

//Pular>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
if(Input.GetKeyDown("space")&&Pulo==0 && atordoado==false) { //se apertei espaço, o pulo e igual a zero (n esta durante um pulo) e nao esta atordoado
	Pulo=0.1; //aciona contador do pulo
	chao=false; //diz que nao esta mais no chao, isto e importante pq desativa o andar no chao
	Bodyrb.gravityScale=3.5; //ativa a gravidade da fisica do unity
	Physics2D.IgnoreCollision(Player1body.GetComponent(Collider2D), gameObject.GetComponent(Collider2D), false); //ativa a colisao do corpo com a base
}
if(Pulo>0) {
	Pulo=Pulo+Time.deltaTime; //contador do pulo conta por tempo
}
if(Pulo>0 && Pulo<0.6f) { //se o contador do pulo estiver nesta faixa, entao fazer propulsao do pulo pela fisica do unity, faixa de propulsao
	Bodyrb.velocity = transform.up*7.8; //Faz o corpo pular pra cima com a fisica do unity
}

if(Input.GetKeyUp("space")) { // se soltei o espaço
	Pulo=20; //tira o contador pulo da faixa de propulsao
 }
if(Atordoado>0) { //se nao estiver atordoado
	if(Player1body.transform.position.y>transform.position.y+0.85f) { //se o corpo ficar bem em cima da base
		Pulo=20f; //tira da faixa de pulo
	}
}
if(Player1body.transform.position.y<transform.position.y+0.85f) {  //se o corpo estiver bem em cima da base
	if(Bodyrb.velocity.y<0) { //e velocidade for negativa, ou seja, estiver caindo
		Pulo=0; //finaliza pulo ***************IMPORTANTE**********************
		Bodyrb.gravityScale=0f; //desativa a gravidade
		Bodyrb.velocity.y=0; //desativa a velocidade y
		Physics2D.IgnoreCollision(Player1body.GetComponent(Collider2D), gameObject.GetComponent(Collider2D), true); //começa ignorar o colisor com a base, talvez nemprecise isso
		Bodyrb.velocity.y=0; //redundancia :O remover isto
		chao=true;//sinaliza que agora esta no chao
	}
}
if(Player1body.transform.position.y>transform.position.y+1.4f) { //especialmente para refinar o detector de colisao para o zumbi, tipo, ele tem q estar a uma certa altura pra poder nao colidir com o zumbi
	Physics2D.IgnoreLayerCollision(10,12, true); //desativa o colisor se estiver acima da altura de 1.4 do chao
	
} else {
	Physics2D.IgnoreLayerCollision(10,12, false); ////ativa o colisor se estiver abaixo da altura de 1.4 do chao
}
//----------------------pular-------------------------------
//FIXA CORPO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		transform.position.z=transform.position.y; // usando a cordenada Y pra determinar a perspectiva
		Player1body.transform.position.z=transform.position.y;  // usando a cordenada Y pra determinar a perspectiva
		Player1body.transform.position.x=transform.position.x; //fixa o corpo na cordenada X da base *********IMPORTANTE******************
//----------------------------fixacorpo--------------------------------------

}


function OnCollisionEnter2D(collision: Collision2D) {

	if(collision.gameObject.tag == "Zumbi") {
	Atordoado=0.01f;
	anim.SetTrigger("Atordoado");
	zumbidano=collision.gameObject.GetComponentInChildren(AtaqueDetector);
	//print("Recebeu Dano");
	LifeCount=(LifeCount-zumbidano.dano);
	LifeBar.transform.localScale.x=LifeBarWidth*(LifeCount*0.01);
	if(LifeCount<0.01f) {         print("VOCE MORREU"); Application.Quit(); }
	}



}


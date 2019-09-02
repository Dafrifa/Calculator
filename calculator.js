const btns        = document.querySelectorAll('.btn-num');
const operators   = document.querySelectorAll('.btn-operate');
const screen 	  = document.querySelector('.screen');
const dot    	  = document.querySelector('.btn-dot');
const shift 	  = document.querySelector('.btn-shift');
const equal  	  = document.querySelector('.btn-equal');
const del  	  	  = document.querySelector('.btn-delete');
const clear  	  = document.querySelector('.btn-clear');


var reset = false;
var save  = null;
var operation = null;
var operated = true;
var operationPressed = false;
var count = 0;
var shiftSave = 0;
var frontSave = '';
var shiftCounter = 0;
var operator = null;
var opScan = 0;
var go = false;
var dotPlaced = false;
var dotReset = false;
var dotVerify = false;


del.addEventListener('click', function(){
	if(reset && !operated)
		clearAll();
	else
		screen.value = screen.value.substring(0,screen.value.length-1);
})


shift.addEventListener('click', function(){
	
	let tempCount = shiftCounter;
	let tempOp = operator;

	let v = dotPlaced;
	let w = dotVerify;
	if(operator != null){

		opScan = screen.value.length-1;

		
		while(screen.value.substring(opScan,opScan+1) != operator){
			
			opScan--;
			
		}	

		frontSave = screen.value.substring(0, opScan+1);

		shiftSave = screen.value.substring(opScan+1,screen.value.length);

	}

	else{

		frontSave = '';

		shiftSave = screen.value.substring(opScan,screen.value.length);
	}
	
	if(shiftSave != '' && go){
		cleared();
		shiftSave =  "(-" + shiftSave + ")";
		screen.value = frontSave + shiftSave;
	}

	dotPlaced = v;
	dotVerify = w;
	shiftCounter = tempCount+1;
	operator = tempOp;

})

for(let i = 0; i < btns.length; i++){
	btns[i].addEventListener('click', function(){
		operationPressed = false;
		let quickCheck = false;
		let dotCheck = false;

		let altCounter = shiftCounter;

		if(reset){
			if(dotPlaced)
				dotCheck = dotPlaced;

			if(!operated){
				clearAll();
			}

		if(save != null && count === 1)
		save = save + operation;

		if(count === 1)
		cleared();

		dotPlaced = dotCheck;

			
		}
		count = 0;
		let number = btns[i].getAttribute('data-num');

		if (dotPlaced && !dotVerify){
			screen.value += ".";
			dotVerify = true;
		}

		if(screen.value.substring(screen.value.length-1,screen.value.length) === ")"){
			
			let i = screen.value.length;
			while(screen.value.substring(i-1,i) != "("){
				i--;
			}
			

			let num = screen.value.substring(i-1,screen.value.length-shiftCounter+1);
			num = num.replace(/[)]/, '')+ number;
			
			while(shiftCounter != 0){
				num = num + ")";
				shiftCounter--;
			}


			screen.value = screen.value.replace(screen.value.substring(i-1,screen.value.length),num);

		}
		else
			screen.value += number;
		go = true;
		
		shiftCounter = altCounter;
		dotVerify = true;
	})
}

dot.addEventListener('click', function(){

	if(dotReset){
		cleared();
	}

	let altCounter = shiftCounter;

	if(!dotPlaced){

		if(screen.value.substring(screen.value.length-1,screen.value.length) === ")"){
			
			let i = screen.value.length;
			while(screen.value.substring(i-1,i) != "("){
				i--;
			}

			let num = screen.value.substring(i-1,screen.value.length-shiftCounter+1);
			num = num.replace(/[)]/, '')+ ".";
			
			while(shiftCounter != 0){
				num = num + ")";
				shiftCounter--;
			}
			screen.value = screen.value.replace(screen.value.substring(i-1,screen.value.length),num);
		}

		else
			screen.value = screen.value + ".";
		}
		
		dotPlaced = true;
	
	if(screen.value.substring(0,1) === "."){
		operationPressed = true;
	}

	shiftCounter = altCounter;
})



for(let i = 0; i < operators.length; i++){
	operators[i].addEventListener('click', function(){
		if(screen.value != ''){
			if(reset){

				if (count === 0){
					if(save === null)
						save = screen.value;
					else
						save += screen.value;
				}
				else
					count = 0;

				cleared();
				operated = true;
				
			}
			let screenV = document.querySelector(".screen").value;
			let number = operators[i].getAttribute('data-num');

			if((screen.value.substring(screen.value.length-1,screen.value.length) === '+')
			 ||(screen.value.substring(screen.value.length-1,screen.value.length) === '/')
			 ||(screen.value.substring(screen.value.length-1,screen.value.length) === '-')
			 ||(screen.value.substring(screen.value.length-1,screen.value.length) === '*'))
				screen.value = screen.value.substring(0,screen.value.length-1);

			screen.value += number;
			operation = number;
			operationPressed = true;
			count++;
			operator = number;
			dotPlaced = false;
			shiftCounter = 0;
			dotVerify = false;
		}
	})
}

equal.addEventListener('click', function(){
	if(!operationPressed){
		if(!reset)
			if(save != null)
			screen.value = save + operation + screen.value;

		if(reset)
			if(save != null)
			screen.value = save + screen.value;

		let value = eval(screen.value);
		value = eval(value);
		screen.value = value;
		save = null;
		value += '+' + save;
		reset = true;
		operated = false;
		count= 0;
		operator = null;
		go = false;
		dotPlaced = false;
		dotReset = true;
		shiftCounter = 0;
		dotVerify = false;
	}
})

clear.addEventListener('click', function(){
	clearAll();
})

function cleared(){
	screen.value = '';
	operationPressed = false;
	operator = null;
	opScan = 0;
	dotPlaced = false;
	dotReset = false;
	shiftCounter = 0;
	dotVerify = false;
}

function clearAll(){
	cleared();
	save = null;
	operation = null;
	reset = false;
	operated = false;
	go = false;
}

function saveSet(){
	save = screen.value;
}
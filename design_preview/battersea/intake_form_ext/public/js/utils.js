// DEBUG
var trace = function(msg){ console.log(msg); };

// UTILS

function prep_popupLinks(wrapper, target, store, obj)
{
	let getPopupLink = wrapper.querySelectorAll(target);

	for(let i = 0; i < getPopupLink.length; i++)
	{
		let id 	= getPopupLink[i].classList[2];

		let num = getPopupLink[i].dataset.num;
		
		let p = new PopupTrigger(getPopupLink[i], id, num, obj);

		store.push(p);
	}
}

function prep_boxImg(wrapper, target, store)
{
	let getBoxImg = wrapper.querySelectorAll(target);

	for(let i = 0; i < getBoxImg.length; i++)
	{
		let b = new PicBox(getBoxImg[i]);

		store.push(b);
	}
}

function prep_slider(wrapper, target, store)
{
	let getSlider = wrapper.querySelectorAll(target);

	for(let i = 0; i < getSlider.length; i++)
	{
		let s = new Slider(getSlider[i]);

		store.push(s);
	}
}

function prep_checkBox(wrapper, target, store)
{
	let getCheckBox = wrapper.querySelectorAll(target);

	for(let i = 0; i < getCheckBox.length; i++)
	{
		let c = new CheckBox(getCheckBox[i], i);

		store.push(c);
	}
}

function prep_switch(wrapper, target, store)
{
	let getSwitch = wrapper.querySelectorAll(target);

	for(let i = 0; i < getSwitch.length; i++)
	{
		let s = new Switch(getSwitch[i]);

		store.push(s);
	}
}

function prep_radioBasic(wrapper, target, store, funct)
{
	let getRadio = wrapper.querySelectorAll(target);

	for(let i = 0; i < getRadio.length; i++)
	{
		let r = new RadioBtnBasic(getRadio[i], i, funct);

		store.push(r);
	}
}

function prep_steppers(wrapper, target, store, funct)
{
	let getStepper = wrapper.querySelectorAll(target);

	for(let i = 0; i < getStepper.length; i++)
	{
		let s = new Stepper(getStepper[i], 0, funct);

		store.push(s);
	}
}


function form_checkBasicRadio_control(store, num)
{
	for(let i in store)
	{
		if(num !== store[i].refNum)
		{
			store[i].radio_force_off();
		}
	}	
}

// IN PAGE DISPLAY FOR RADIO BUTTONS
function message_display(obj, data, num)
{
	let dataRead = data["message" + num];

	obj.textT.innerHTML = dataRead.textT;
	obj.textC.innerHTML = dataRead.textC;
	obj.extra.innerHTML = dataRead.extra;
}
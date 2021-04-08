
class Slider
{
	constructor(linkage)
	{
		this.linkage = linkage;

		this.speed = 440;

		this.slider_position();
		this.slider_control_add();
	}

	slider_control_add()
	{
		this.handle 	= this.linkage.querySelector(".slider_handle_main");
		this.switch_0 	= this.linkage.querySelector(".slider_btn_0");
		this.switch_1 	= this.linkage.querySelector(".slider_btn_1");
		this.switch_2	= this.linkage.querySelector(".slider_btn_2");

		this.switch_0.addEventListener("click", this.slider_control_event.bind(this), false);
		this.switch_1.addEventListener("click", this.slider_control_event.bind(this), false);
		this.switch_2.addEventListener("click", this.slider_control_event.bind(this), false);

	}

	slider_position()
	{	
		this.pos = 1;
		this.slider_request = 1;
	}

	slider_control_event(event)
	{
		event.preventDefault();
		
		this.slider_request = parseInt(event.target.dataset.trigger);

		this.slider_check_pos();
	}

	slider_check_pos()
	{
		
		if(this.pos !== this.slider_request)
		{
			if(Math.abs(this.pos - this.slider_request) > 1)
			{
				this.handle.style.transitionDuration = (this.speed * 1.5) + "ms";
			}

			else
			{
				this.handle.style.transitionDuration = this.speed + "ms";
			}

			this.slider_tween();
		}
	}

	slider_tween()
	{
		let class_string_old = "slider_pos_" + this.pos;
		let class_string_new = "slider_pos_" + this.slider_request;

		this.handle.classList.remove(class_string_old);
		this.handle.classList.add(class_string_new);

		this.pos = this.slider_request;
	}

}


class PicBox
{
	constructor(linkage)
	{
		this.linkage = linkage;
		this.allow = false;
		this.active = false;
		this.has_ext_function = false;
		this.has_ext_adv_function = false;
		this.picBox_control_add();
	}

	picBox_control_add()
	{
		this.box = this.linkage.querySelector(".pic_box_cont");
		this.label = this.linkage.querySelector(".pic_box_label");
		this.tick = this.linkage.querySelector(".pic_box_tick");

		this.box.addEventListener("click", this.picBox_control_event.bind(this), false);
	}

	picBox_control_event(event)
	{
		event.preventDefault();

		if(this.allow)
		{
			if(!this.active)
			{
				this.label.classList.add("pic_box_label_active");
				this.tick.classList.add("pic_box_tick_active");

				this.active = true;
			}

			else
			{
				this.label.classList.remove("pic_box_label_active");
				this.tick.classList.remove("pic_box_tick_active");

				this.active = false;
			}

			if(this.has_ext_function)
			{
				this.picBox_external_funct_call();
			}

			if(this.has_ext_adv_function)
			{
				this.picBox_external_advanced_funct_call();
			}
		}
	}

	picBox_add_number_ref(num)
	{
		this.num = num;
	}

	picBox_external_funct_add(call_function)
	{
		this.has_ext_function = true;
		this.ext_function = call_function;
	}

	picBox_external_advanced_funct_add(call_function)
	{
		this.has_ext_adv_function = true;
		this.ext_adv_function = call_function;
	}


	picBox_external_funct_call()
	{
		this.ext_function();
	}

	picBox_external_advanced_funct_call()
	{
		this.ext_adv_function(this);
	}

	picBox_force_off()
	{
		if(this.active)
		{
			this.active = false;
			
			this.label.classList.remove("pic_box_label_active");
			this.tick.classList.remove("pic_box_tick_active");
		}		
	}
}


class Button
{
	constructor(linkage, call_function)
	{
		this.linkage = linkage;
		this.call_function = call_function;

		this.button_control_add();
	}

	button_control_add()
	{
		this.buttonLayer = this.linkage.querySelector(".button_layer");

		this.linkage.addEventListener("click", this.button_control_event.bind(this), false);
	}

	button_control_event(event)
	{
		event.preventDefault();
		
		this.buttonLayer.classList.add("button_selected");

		this.buttonLayer.addEventListener("transitionend", this.button_animation_event.bind(this), false);
	}

	button_animation_event(event)
	{
		this.buttonLayer.removeEventListener("transitionend", this.button_animation_event.bind(this), false);

		this.call_function();
	}
}

class ButtonLive
{
	constructor(params)
	{
		this.linkage = params.linkage;
		this.call_function = params.call_function;
		this.activeClass = params.activeClass;
		this.fired = false;

		this.button_control_add();
	}

	button_control_add()
	{
		this.linkage.addEventListener("click", this.button_control_event.bind(this), false);
	}

	button_control_event(event)
	{
		event.preventDefault();

		this.linkage.classList.add(this.activeClass);
		this.linkage.addEventListener("transitionend", this.button_animation_event.bind(this), false);
	}

	button_animation_event(event)
	{
		if(!this.fired)
		{
			this.fired = true;

			this.linkage.removeEventListener("transitionend", this.button_animation_event.bind(this), false);

			this.call_function();
		}
	}
}


class HeaderBar
{
	constructor(linkage)
	{
		this.linkage = linkage;

		this.build_bar();
	}

	build_bar()
	{
		this.progressBar = this.linkage.querySelector(".header_progress");

		// this.progressWidth = [0, 37.5, 75, 112.5, 150, 187.5, 225, 262.5, 300, 337.5, 375];

		this.progressWidth = new Array();

		let max = 8;
		let fullWidth = 375;
		let divisions = fullWidth / max;

		for(let i = 0; i <= max; i++)
		{
			let n = Math.round(i * divisions); // 34
			this.progressWidth.push(n);
		}

		trace(this.progressWidth);

		this.progress = 0;
	}

	update_bar(num)
	{
		if(num)
		{
			this.progress = num;
		}

		else
		{
			this.progress ++;
		}

		this.progressBar.style.width = this.progressWidth[this.progress] + "px";
	}
}

class PopupTrigger
{
	constructor(linkage, id, num, popupObj)
	{
		this.linkage 	= linkage;
		this.id 		= id;
		this.num 		= num;
		this.popupObj 	= popupObj;

		this.popupTrigger_control_add();
	}

	popupTrigger_control_add()
	{
		this.linkage.addEventListener("click", this.popupTrigger_control_event.bind(this), false);
	}

	popupTrigger_control_event(event)
	{
		event.preventDefault();

		this.popupObj.popup_init(this.num);
	}
}

class PopupTriggerBasic
{
	constructor(num, popupObj)
	{
		this.num = num;
		this.popupObj = popupObj;
	}

	popupTriggerBasic_request()
	{
		this.popupObj.popup_init(this.num);
	}
}

class Popup
{
	constructor(linkage, html_body, data)
	{
		this.popup = linkage;
		this.html_body = html_body;
		this.data = data;

		this.active = false;
		this.closeRequest = false;

		this.scrollPosition = 0;

		this.popup_control_add();
	}

	popup_control_add()
	{
		this.popupClose 	= this.popup.querySelector(".pop-up-close");
		this.popupTitle 	= this.popup.querySelector(".popup-title");
		this.popupCopy 		= this.popup.querySelector(".popup-copy");
		this.popupExtra		= this.popup.querySelector(".popup-extra");

		this.popup.style.visibility = "hidden";

		this.popupClose.addEventListener("click", this.popup_close.bind(this), false);
	}

	popup_init(messageNum)
	{
		trace("popup_init");
		
		if(!this.active)
		{
			this.active = true;
			this.closeRequest = false;

			this.popupTitle.innerHTML 	= this.data["message" + messageNum].textT;
			this.popupCopy.innerHTML 	= this.data["message" + messageNum].textC;
			this.popupExtra.innerHTML	= this.data["message" + messageNum].extra;

			// IF BUTTON ADDED IN
			if(this.popupExtra.innerHTML.length > 0)
			{
				this.popupCopy.style.paddingBottom = 0;
				this.popupExtra.style.paddingBottom = "48px";
			}

			// SCREEN LOCK BUG
			this.scrollPosition = window.scrollY;

			// SCREEN LOCK BUG
			this.html_body.classList.add("popup-lock");
			// this.html_body.addEventListener("touchend", this.popup_lock.bind(this), false);
			// this.html_body.addEventListener("scroll", this.popup_lock.bind(this), false);
			// this.html_body.addEventListener("mousedown", this.popup_lock.bind(this), false);

			this.popup.style.visibility = "visible";
			this.popup.classList.add("popup-show");
		}
	}

	popup_lock(event)
	{
		event.preventDefault();
	}	

	popup_close(event)
	{
		event.preventDefault();

		this.closeRequest = true;

		this.popup.addEventListener("transitionend", this.popup_end.bind(this), false);	
		
		this.popup.classList.remove("popup-show");
	}

	popup_end(event)
	{
		if(this.closeRequest)
		{
			this.popup.removeEventListener("transitionend", this.popup_end.bind(this), false);	
			
			// SCREEN LOCK BUG
			this.html_body.classList.remove("popup-lock");
			// this.html_body.removeEventListener("touchend", this.popup_lock.bind(this), false);
			// this.html_body.removeEventListener("scroll", this.popup_lock.bind(this), false);
			// this.html_body.removeEventListener("mousedown", this.popup_lock.bind(this), false);

			// SCREEN LOCK BUG
			// window.scrollTo(0, this.scrollPosition);

			this.popup.style.visibility = "hidden";

			this.popupTitle.innerHTML 	= "";
			this.popupCopy.innerHTML 	= "";

			this.active = false;

			this.closeRequest = false;
		}
	}
}

class CheckBox
{
	constructor(linkage, num)
	{
		this.linkage = linkage;
		this.num = num;

		this.active = false;
		this.has_ext_function = false;
		this.checkBox_control_add();
	}

	checkBox_control_add()
	{
		this.checkBoxLayer = this.linkage.querySelector(".checkbox-layer");

		this.linkage.addEventListener("click", this.checkBox_control_event.bind(this), false);		
	}

	checkBox_control_event(event)
	{
		event.preventDefault();

		if(!this.active)
		{
			this.checkBoxLayer.classList.add("checkbox-active");
			this.active = true;
		}

		else
		{
			this.checkBoxLayer.classList.remove("checkbox-active");
			this.active = false;
		}

		if(this.has_ext_function)
		{
			this.call_function(this);
		}
	}

	checkBox_add_ext_function(call_function)
	{
		this.has_ext_function = true;

		this.call_function = call_function;
	}
}

class Switch
{
	constructor(linkage)
	{
		this.linkage = linkage;
		this.selectedY = false;
		this.selectedN = false;
		this.activeY = false;
		this.activeN = false;
		this.has_ext_function = false;

		this.switch_control_add();
	}

	switch_control_add()
	{
		this.switchY 		= this.linkage.querySelector(".form-switch-yes");
		this.switchY_layer 	= this.linkage.querySelector(".form-switch-yes .switch-layer");

		this.switchN 		= this.linkage.querySelector(".form-switch-no");
		this.switchN_layer 	= this.linkage.querySelector(".form-switch-no .switch-layer");

		this.switchY.addEventListener("click", this.switch_control_event_y.bind(this), false);
		this.switchN.addEventListener("click", this.switch_control_event_n.bind(this), false);
	}

	switch_control_event_y(event)
	{
		this.selectedY = true;

		this.switch_logic();

		if(this.has_ext_function)
		{
			this.ext_function(this);
		}
	}

	switch_control_event_n(event)
	{
		this.selectedN = true;

		this.switch_logic();

		if(this.has_ext_function)
		{
			this.ext_function(this);
		}
	}

	switch_logic()
	{
		if(this.selectedY)
		{
			if(!this.activeY)
			{
				this.activeY = true;
				this.switchY_layer.classList.add("switch-active");
			}

			else
			{
				this.activeY = false;
				this.switchY_layer.classList.remove("switch-active");
			}


			if(this.activeN)
			{
				this.activeN = false;
				this.switchN_layer.classList.remove("switch-active");
			}

			this.selectedY = false;
		}

		if(this.selectedN)
		{
			if(!this.activeN)
			{
				this.activeN = true;
				this.switchN_layer.classList.add("switch-active");
			}

			else
			{
				this.activeN = false;
				this.switchN_layer.classList.remove("switch-active");				
			}


			if(this.activeY)
			{
				this.activeY = false;
				this.switchY_layer.classList.remove("switch-active");
			}

			this.selectedN = false;
		}
	}

	switch_add_ext_function(call_function)
	{
		this.has_ext_function = true;
		this.ext_function = call_function;
	}
}

class RadioBtnBasic
{
	constructor(linkage, refNum, call_function)
	{
		this.linkage = linkage;
		this.refNum = refNum;
		this.call_function = call_function;
		this.active = false;

		this.radio_control_add();

		this.has_extra_function = false;
	}

	radio_control_add()
	{
		this.radioLayer = this.linkage.querySelector(".radio-layer");

		this.linkage.addEventListener("click", this.radio_control_event.bind(this), false);		
	}

	radio_control_event(event)
	{
		event.preventDefault();

		if(!this.active)
		{
			this.radioLayer.classList.add("radio_active");
			this.active = true;
		}

		else
		{
			this.radioLayer.classList.remove("radio_active");
			this.active = false;
		}

		this.call_function(this.refNum);

		if(this.has_extra_function)
		{
			this.extra_function(this);
		}
	}

	radio_force_on()
	{
		if(!this.active)
		{
			this.radioLayer.classList.add("radio_active");
			this.active = true;				
		}
	}

	radio_force_off()
	{
		if(this.active)
		{
			this.radioLayer.classList.remove("radio_active");
			this.active = false;			
		}
	}

	add_extra_function(call_function)
	{
		this.has_extra_function = true;
		this.extra_function = call_function;
	}

}

class RadioBtnAdv
{
	constructor(linkage, call_function, ref)
	{
		this.linkage = linkage;
		this.call_function = call_function;
		this.ref = ref;
		this.active = false;

		this.radio_control_add();
	}

	radio_control_add()
	{
		this.radioLayer = this.linkage.querySelector(".radio-layer");

		this.linkage.addEventListener("click", this.radio_control_event.bind(this), false);			
	}

	radio_control_event(event)
	{
		event.preventDefault();

		if(!this.active)
		{
			this.radioLayer.classList.add("radio_active");
			this.active = true;
		}

		else
		{
			this.radioLayer.classList.remove("radio_active");
			this.active = false;
		}

		this.call_function(this.ref);
	}

	radio_force_on()
	{
		if(!this.active)
		{
			this.radioLayer.classList.add("radio_active");
			this.active = true;				
		}
	}

	radio_force_off()
	{
		if(this.active)
		{
			this.radioLayer.classList.remove("radio_active");
			this.active = false;			
		}
	}
}

class Stepper
{
	constructor(linkage, startNum, call_function)
	{
		this.linkage = linkage;
		this.num = startNum;
		this.call_function = call_function;

		this.numDisplay = this.linkage.querySelector(".stepper-num");
		
		let _labelName = this.linkage.querySelector(".stepper-desc").innerHTML;
		this.labelName = _labelName.toUpperCase();

		this.stepper_update();
		this.stepper_control_add();
	}

	stepper_control_add()
	{
		this.btnD = this.linkage.querySelector(".stepper-d");
		this.btnU = this.linkage.querySelector(".stepper-u");
		
		this.btnD_active = this.btnD.querySelector(".stepper-active");
		this.btnU_active = this.btnU.querySelector(".stepper-active");

		this.btnD.addEventListener("click", this.stepper_event.bind(this), false);
		this.btnU.addEventListener("click", this.stepper_event.bind(this), false);

		this.btnD_active.addEventListener("animationend", this.stepper_animation_event.bind(this), false);
		this.btnU_active.addEventListener("animationend", this.stepper_animation_event.bind(this), false);


	}

	stepper_event(event)
	{
		event.preventDefault();

		let action = event.target.dataset.action;

		if(action === "U")
		{
			this.num ++;
			this.btnU_active.classList.add("stepper-active-show");
		}

		else
		{
			if(this.num > 0)
			{
				this.num --;
				this.btnD_active.classList.add("stepper-active-show");
			}
		}

		this.stepper_update();

		this.call_function(this);
	}

	stepper_forceNum(num)
	{
		this.num = num;
		this.stepper_update();
	}

	stepper_update()
	{
		this.numDisplay.innerHTML = this.num;	
	}

	stepper_animation_event(event)
	{
		event.target.classList.remove("stepper-active-show");
	}
}





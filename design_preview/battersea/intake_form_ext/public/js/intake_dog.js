
var intake;

function pageLoad_init()
{
	trace("pageLoad_init();");

	intake_start();
}

function intake_start()
{
	intake = {};
	intake.displayList = {};

	intake.displayList.exitBtn = document.querySelector(".exit-btn");
	intake.exitBtnClass = new ButtonLive({linkage: intake.displayList.exitBtn, activeClass: "live-button-active", call_function: intake_goto_form}); 
}

function intake_goto_form()
{
	location.assign("./intake_dog.html");
}
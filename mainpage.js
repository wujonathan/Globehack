document.addEventListener("DOMContentLoaded", load);
var usrname;
var usrId;
var token;

function load(){
	var pdata;
	$.ajax({type:'POST', url: 'fetchUsrId.php', data: pdata, dataType: 'json', success: function(response) {
		usrId = response[0].userid;
		if(usrId){
			$(".logouts").show();
			$(".logins").hide();
		}
	}});
}
//Helper function used for dealing with the logins
function toggleState(item){
	if($(item).attr("data-tog") == "0") {
		$(item).attr("data-tog","1");
	} 
	else {
		$(item).attr("data-tog", "0");
	}
}

//Displays the login form
$("#login").click( function(){
	if ($(this).attr("data-tog") == "1"){
		$(".userLoginDetails").show();
		$(".everything").hide();
	}
	else{
		$(".userLoginDetails").hide();
		$(".everything").show();
	}
	toggleState(this);
});


$("#submitLogin").click( function(){
	usrname = $("#username").val();
	var usrpass = $("#password").val();
	var pdata = {
		username : usrname,
		password : usrpass
	};
	if (usrname === "" || usrpass === ""){
		$("#loginUserMsg").empty();
		$("#loginUserMsg").append('<div class="failText">Invalid Username or Password</div>');
		return;
	}
	$.ajax({type:'POST', url: 'login.php', data: pdata, dataType: 'json', success: function(response) {
		if(response.success){ 
			token=response.token;
			$("#loggedUser").attr("data-tog","1");
			$(".userLoginDetails").hide();
			$(".logins").hide();
			$(".logouts").show();
			$(".everything").show();
			$("#loginUserMsg").empty();
			$("#userlogin")[0].reset();
			$("#loggedUser").append('<div>Hello '+usrname+'!</div>');
			usrId=response.usrId;
			toggleState($("#login"));
			toggleState($("#logout"));
		}
		else{
			$("#loginUserMsg").empty();
			$("#loginUserMsg").append('<div class="failText">'+response.message+'</div>');
		}
	}
});
});

//Reset elements and load the default
$("#logout").click( function(){
	$.ajax({type:'POST', url: 'logout.php', dataType: 'json', success: function(response) {
		if(response.success){
			$(".logouts").hide();
			$(".logins").show();
			$("#loggedUser").empty();
			$("#loggedUser").attr("data-tog","0");
			homeload();
		}}
	});
});


$("#submitCreateUser").click( function(){
	var newusrname = $("#newUsername").val();
	var newusrpass = $("#newPassword").val();
	if (newusrname === "" || newusrpass === ""){
		$("#userCreateMsg").empty();
		$("#userCreateMsg").append('<div class="failText">Invalid Username or Password</div>');
		return;
	}
	var pdata = {
		newUsername : newusrname,
		newPassword : newusrpass
	};
	$.ajax({type:'POST', url: 'createUser.php', data: pdata, dataType: 'json', success: function(response) {
		if(response.success){ 
			$("#userCreateMsg").empty();
			$("#userCreateMsg").append('<div class="successText">Success!!</div>');
			setTimeout(function() {
				$(".userCreateDetails").fadeOut(300);
				$("#userCreateMsg").empty();
				$("#userCreate")[0].reset();
			},1000);
			toggleState($("#createUser"));
		}
		else{
			$("#userCreateMsg").empty();
			$("#userCreateMsg").append('<div class="failText">'+response.message+'</div>');
		}
	}
});
});
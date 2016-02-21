var addUser = false;
var socket = io();
var person = prompt("Please enter your name", "USER");
var icon ;
var click ;
var lastClickedId;
$('#welcome').text("WELCOME : " + person);


if (!addUser) {
    socket.emit('first login', person);
    socket.emit('add user', person);
    console.log('hit show users')
    addUser = true;
}
function regame() {
    $('#1').removeClass();
    $('#2').removeClass();
    $('#3').removeClass();
    $('#4').removeClass();
    $('#5').removeClass();
    $('#6').removeClass();
    $('#7').removeClass();
    $('#8').removeClass();
    $('#9').removeClass();
    $("#result").text("");
}
$("#regame").click(function() {
    socket.emit('re game');
    regame();
})
$("#reset").click(function() {
    reset(lastClickedId);
})
$("#submit").click(function() {
    socket.emit('changTurn',{click:lastClickedId,icon:icon});
    $("#state").text("Wait For Your Friend Choose");

})
function reset(id) {
    $("#"+id).removeClass(icon);
    click = false;
}
$("td").click(function() {
    if (click == false) {
        $(this).addClass(icon);
        var box1 = $('#1').attr('class');
        var box2 = $('#2').attr('class');
        var box3 = $('#3').attr('class');
        var box4 = $('#4').attr('class');
        var box5 = $('#5').attr('class');
        var box6 = $('#6').attr('class');
        var box7 = $('#7').attr('class');
        var box8 = $('#8').attr('class');
        var box9 = $('#9').attr('class');
        if ((box1 == box2) && (box3 == icon) &&(box1 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }else if ((box4 == box5) && (box6 == icon) &&(box4 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }else if ((box7 == box8) && (box9 == icon) &&(box7 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }else if ((box1 == box4) && (box7 == icon) &&(box1 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }else if ((box2 == box5) && (box8 == icon) &&(box2 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }else if ((box3 == box6) && (box9 == icon) &&(box3 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }else if ((box1 == box5) && (box9 == icon) &&(box1 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }else if ((box3 == box5) && (box7 == icon) &&(box3 == icon)) {
            $("#result").text("You Win");
            console.log("you win ");
            socket.emit('end game');
        }

        lastClickedId = $(this).attr('id');
    }
    click = true;
});

$('form').submit(function() {
    socket.emit('chat message', person + ":" + $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg) {
    $('#messages').append($('<li class="list-group-item">').text(msg));
});
socket.on('regame', function() {
    regame();
});
socket.on('show users', function(username) {
    $('#showUsers').append($('<li class="list-group-item ">').text(username));
});
socket.on('show end', function(username) {
    $('#result').text("You are lose");
});
socket.on('new turn', function(username) {
    click = username.click ;
    $("#"+username.id).addClass(username.icon);
    $("#state").text("Your Turn");
});
socket.on('update users', function(players) {
    icon = players.icon;
    click = players.canclick;
    $("#state").text(players.state);
    for (var i = 0; i < players.name.length; i++) {
        $('#showUsers').append($('<li class="list-group-item ">').text(players.name[i]));

    }
});

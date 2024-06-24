let socket = io();
// $('#body').keydown(function(event) {
//     // Log the key that was pressed
//     console.log('Key pressed: ' + event.key);
//     // You can also use event.keyCode to get the numerical code of the key
//     console.log('Key code: ' + event.keyCode);
    
//     // Perform any other actions you want when a key is pressed
//   });
$("#chat-box").hide();
$("#send-btn").on("click",()=>{
    const msgtext = $("#inp").val();
    if(!msgtext){
        return;
    }else{
        // sending event
        socket.emit("send-msg",{
            msg : msgtext
        })
        $("#inp").val("");   
    }
})
socket.on("recieved-msg",(data)=>{
    console.log(data);
    $("#chat").append(
`<li class="border p-3 rounded-pill" >
    <span class="fw-bold">${data.username} : ${data.msg}</span>
    </li>`);
})
$("#login-btn").on("click",()=>{
    const username = $("#username").val();
    socket.emit('login',{
        username : username
    })
    $("#username").val("");
    $("#chat-box").show();
    $("#login").hide();
})


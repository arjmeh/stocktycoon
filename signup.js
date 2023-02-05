function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

var link = 'http://127.0.0.1:5000/'
var usernameinput = document.getElementById('usernameinput');
var passwordinput = document.getElementById('passwordinput');
var form = document.getElementById("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
  });
function signup() {
    var usernameinputvalue = usernameinput.value;
    var passwordinputvalue = passwordinput.value;
    fetch(link + 'post', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            type: 'signup',
            username: usernameinputvalue,
            password: passwordinputvalue
          })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'existing') {
            alert('account already exists');
        } else {
            setCookie('username',usernameinputvalue,0)
            setCookie('password',passwordinputvalue,0)
            setCookie('loggedin',true,0)
        }
    })
}


var x = document.getElementById('loginForm');
var y = document.getElementById('signupForm');
var z = document.getElementById('btn');
var form = document.getElementById('form-box');

function register() {
  x.style.left = '-400px';
  y.style.left = '50px';
  z.style.left = '110px';
  form.style.height = '570px';
}

function login() {
  x.style.left = '50px';
  y.style.left = '450px';
  z.style.left = '0px';
  form.style.height = '';
}

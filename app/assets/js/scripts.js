/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
'use strict';

var form = document.querySelector('form');
var messageInfo = document.querySelector('.callback__message--info');
var messageError = document.querySelector('.callback__message--error');
var maskForName = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;
var maskForMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
var maskForPhone = /^\d[\d\(\)\ -]{4,14}\d$/;
var nameInput = document.querySelector('.name-input');
var mailInput = document.querySelector('.mail-input');
var phoneInput = document.querySelector('.phone-input');
var HEIGHTPOPUP = 98;

$('.dropdown-el').click(function(event) {
  event.preventDefault();
  event.stopPropagation();
  $(this).toggleClass('expanded');
  $('#' + $(event.target).attr('for')).prop('checked', true);
});

document.addEventListener('click', function() {
  document.querySelector('.dropdown-el').classList.remove('expanded');
});

var getCoords = function(element) {

  var box = element.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
};

var popupShow = function(popup, element) {
  var x = getCoords(element).top;
  var y = getCoords(element).left;
  var widthMoreBody = ((document.documentElement.clientWidth - 1283) > 0) ? (document.documentElement.clientWidth - 1283) : 0;
  popup.style.display = 'inline';
  popup.style.top = x - HEIGHTPOPUP - 10 + 'px';
  popup.style.left = y - widthMoreBody / 2 + 'px';
};

var popupHide = function(popup) {
  popup.style.display = 'none';
};

form.addEventListener('focus', function(event) {
  popupShow(messageInfo, event.target);
}, true);

form.addEventListener('focusout', function() {
  popupHide(messageInfo);
}, true);

var validateInput = function(mask, element) {
  var validElem = mask.test(element.value);
  if (!validElem) {
    element.classList.add('invalid');
    element.classList.remove('valid');
    element.onfocus = popupHide(messageInfo);
    element.oninput = popupShow(messageError, element);
    return false;
  } else {
    element.classList.remove('invalid');
    element.classList.add('valid');
    element.oninput = popupHide(messageError);
    return true;
  }
};

document.querySelector('.callback__submit').addEventListener('click', function() {
  validateInput(maskForName, nameInput);
  validateInput(maskForMail, mailInput);
  validateInput(maskForPhone, phoneInput);
});

document.querySelector('.callback__inputs').addEventListener('keyup', function(event) {
  event.preventDefault();
  var placeholder = event.target.parentElement.querySelector('.place_holder');
  event.target.oninput = placeholder.style.display = 'none';
  if (event.target.value.length <= 0) {
    event.target.oninput = placeholder.style.display = 'inline';
  }
});

document.querySelector('.name-input').addEventListener('input', function() {
  validateInput(maskForName, nameInput);
});

document.querySelector('.mail-input').addEventListener('input', function() {
  validateInput(maskForMail, mailInput);
});

document.querySelector('.phone-input').addEventListener('input', function() {
  validateInput(maskForPhone, phoneInput);
});

var validateForm = function () {
  if (validateInput(maskForName, nameInput) && validateInput(maskForMail, mailInput) && validateInput(maskForPhone, phoneInput)) {
    return true;
  } return false;
};

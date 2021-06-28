const add_text = document.querySelector('.add-text');
const add_btn = document.querySelector('.add-btn');

const text_items = document.querySelector('.text-items');

const select_btn = document.querySelectorAll('.select-btn');
const remove_btn = document.querySelectorAll('.remove-btn');
const text_all = document.querySelectorAll('.text-item');
const select_all = document.querySelector('.all-select');
const remove_all = document.querySelector('.all-remove');

const remove_li = document.getElementsByTagName("li");
let flag = 0;
let cnt = 0;

/* 첫화면 실행시 */
window.onload = function() {
  reset_cookie();
}

/* 버튼 이벤트 */

add_btn.addEventListener('click', function () {
  check_cookie();
  add_cookie(cnt, "li"+cnt, add_text.value);        // cookie 담아놓기
  plus_cookie("cookie_list", "cookie_list_"+ cnt);  // cookie 이름들을 담아놓는 cookie
  addBtn();
});
remove_all.addEventListener('click', removeAll);
select_all.addEventListener('click', selectAll);

/* enter key 활성화 */
function enterkey() {
  if (window.event.keyCode == 13) {
    check_cookie();
    add_cookie(cnt, "li"+cnt, add_text.value);        // cookie 담아놓기
    plus_cookie("cookie_list", "cookie_list_"+ cnt);  // cookie 이름들을 담아놓는 cookie
    addBtn();
  }
}

/* 요소 생성 */
function addBtn() {
  let create_li = document.createElement('li');
  let create_span = document.createElement('span');
  let create_input = document.createElement('input');
  let create_add = document.createElement('button');
  let create_modify = document.createElement('button');
  let create_remove = document.createElement('button');


  create_li.className = "text-item"
  create_li.setAttribute('id', "li"+cnt);
  create_li.setAttribute('mode', 'completed');
  create_li.setAttribute('select', 'unchecked');
  
  let span_text = document.createTextNode(add_text.value);
  create_span.className = "text-box";
  create_span.appendChild(span_text);
  create_li.appendChild(create_span);

  create_input.className = "text-modify";
  create_input.setAttribute('type', 'text');
  create_input.style.display = "none";
  create_li.appendChild(create_input);

  let button_add = document.createTextNode("선택");
  create_add.className = "select-btn color-green";
  create_add.setAttribute('onclick', 'select('+cnt +")");
  create_add.appendChild(button_add);
  create_li.appendChild(create_add);

  let button_modify = document.createTextNode("수정");
  create_modify.className = "modify-btn color-yellow";
  create_modify.setAttribute('onclick', 'modify('+cnt +")");
  create_modify.appendChild(button_modify);
  create_li.appendChild(create_modify);

  let button_remove = document.createTextNode("삭제");
  create_remove.className = "remove-btn color-red";
  create_remove.setAttribute('onclick', 'remove('+cnt +")");
  create_remove.appendChild(button_remove);
  create_li.appendChild(create_remove);

  text_items.appendChild(create_li);
  add_text.value = "";
};

/* 저장된 값으로 블록 만들기 */
function block_list(id, num, text, check) {
  let create_li = document.createElement('li');
  let create_span = document.createElement('span');
  let create_input = document.createElement('input');
  let create_add = document.createElement('button');
  let create_modify = document.createElement('button');
  let create_remove = document.createElement('button');


  create_li.className = "text-item"
  create_li.setAttribute('id', id);
  create_li.setAttribute('mode', 'completed');
  create_li.setAttribute('select', check);
  
  let span_text = document.createTextNode(text);
  create_span.className = "text-box";
  create_span.appendChild(span_text);
  create_li.appendChild(create_span);

  create_input.className = "text-modify";
  create_input.setAttribute('type', 'text');
  create_input.style.display = "none";
  create_li.appendChild(create_input);

  let button_add = document.createTextNode("선택");
  create_add.className = "select-btn color-green";
  create_add.setAttribute('onclick', 'select('+num +")");
  create_add.appendChild(button_add);
  create_li.appendChild(create_add);

  let button_modify = document.createTextNode("수정");
  create_modify.className = "modify-btn color-yellow";
  create_modify.setAttribute('onclick', 'modify('+num +")");
  create_modify.appendChild(button_modify);
  create_li.appendChild(create_modify);

  let button_remove = document.createTextNode("삭제");
  create_remove.className = "remove-btn color-red";
  create_remove.setAttribute('onclick', 'remove('+num +")");
  create_remove.appendChild(button_remove);
  create_li.appendChild(create_remove);

  text_items.appendChild(create_li);
  add_text.value = "";
}



/* ################## button event ################## */
/* 선택 버튼 */
function select(cnt) {
  let li = document.getElementById('li'+cnt);

  if(li.className == "text-item active") {
    li.className = "text-item"
  } else {
    li.className = "text-item active"
  }

  /* 선택 시 cookie 수정 */
  console.log();
  let items = get_cookie("cookie_list_"+cnt).split(',');
  let id = items[0];
  let text = items[1];

  if(li.getAttribute("select") == "unchecked") {
    li.setAttribute("select", "check");
    set_cookie("cookie_list_"+cnt, id, text, "check");
  }else {
    li.setAttribute("select", "unchecked");
    set_cookie("cookie_list_"+cnt, id, text, "unchecked");
  }
}


/* 수정 버튼 */
function modify(cnt) {
  let li = document.getElementById('li'+cnt);

  if(li.getAttribute('mode') == "modify") {
    for(let i=0; i<li.childNodes.length; i++) {
      if(li.childNodes[i].className == "modify-btn color-yellow") {
        li.childNodes[i].innerHTML = "수정"
      }
      if(li.childNodes[i].className == "text-box") {
        // span 창
        li.childNodes[i].style.display = "inline-block";
        li.childNodes[i].innerHTML = li.childNodes[i+1].value;
        set_cookie("cookie_list_"+cnt, "li"+cnt, li.childNodes[i].innerHTML, li.getAttribute('select'));
      }
      if(li.childNodes[i].className == "text-modify") {
        li.childNodes[i].style.display = "none";
      }
    }
    li.setAttribute('mode', 'completed');
    return false;

  } else if(li.getAttribute('mode') == "completed") { // 수정모드
    for(let i=0; i<li.childNodes.length; i++) {
      if(li.childNodes[i].className == "text-box") {
        li.childNodes[i].style.display = "none";
      }
      if(li.childNodes[i].className == "text-modify") {
        // input 창
        li.childNodes[i].style.display = "inline-block";
        li.childNodes[i].focus();
        li.childNodes[i].value = li.childNodes[i-1].innerHTML;
      }
      if(li.childNodes[i].className == "modify-btn color-yellow") {
        li.childNodes[i].innerHTML = "확인"
      }
    }

    li.setAttribute('mode', 'modify');
    return false;
  }
}


/* 삭제 버튼 */
function remove(cnt) {
  let li = document.getElementById('li'+cnt);
  
  li.remove();
  remove_cookie("cookie_list", cnt);
}


/* 모두 선택 */
function selectAll() {
  if(flag == 0) {
    for(let i=1; i<text_items.childNodes.length; i++) {
      text_items.childNodes[i].className = "text-item active";
    }
    flag = 1;
  } else if (flag == 1) {
    for(let i=1; i<text_items.childNodes.length; i++) {
      text_items.childNodes[i].className = "text-item";
    }
    flag = 0;
  }
};


/* 모두 삭제 */
function removeAll() {
  text_items.innerHTML = "";
};




/* ################## cookie ################## */
/* cookie 설정 */
function reset_cookie() {
  if(get_cookie("cookie_list")) {
    let cookie_arr = get_cookie("cookie_list").split(',');
    for(arr in cookie_arr) {
      let cookie_item = get_cookie(cookie_arr[arr]);
      let cookie_items = cookie_item.split(',');
      let items_id = cookie_items[0];
      let items_num = items_id.substr(2, items_id.length);
      let items_text = cookie_items[1];
      let items_check = cookie_items[2];
  
      block_list(items_id, items_num, items_text, items_check);
    }
  }
}

function check_cookie() {
  if(get_cookie("count")) {
    cnt = get_cookie("count");
    cnt++;
    value_cookie("count", cnt);
  } else {   
    value_cookie("count", cnt);
    cnt = get_cookie("count");
  }
}


/* Set Cookie Function */
function set_cookie(cookie_name, id, text, check) {
  document.cookie = cookie_name + '=' + id + ',' + text + ',' + check;
}

function value_cookie(cookie_name, value) {
  document.cookie = cookie_name + '=' + value;
}

/* Get Cookie Function */
function get_cookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');
  
  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

/* Add Cookie Function */
function add_cookie(num, id, text) {
  var items = get_cookie('cookie_list_' + num); // 이미 저장된 값을 쿠키에서 가져오기
  if (!items) {
    // 신규 id값 저장하기
    set_cookie('cookie_list_' + num, id, text, 'unchecked');
  }
}

function plus_cookie(id, value) {
  var items = get_cookie(id); // 이미 저장된 값을 쿠키에서 가져오기
  if (items) {
    var itemArray = items.split(',');
    // 새로운 값 저장 및 최대 개수 유지하기
    itemArray.push(value);
    items = itemArray.join(',');
    value_cookie(id, items);
  }
  else {
    // 신규 id값 저장하기
    value_cookie(id, value);
  }
}

function delete_cookie(name) {
  document.cookie = "cookie_list_" + name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function remove_cookie(id, value) {
  let list = get_cookie('cookie_list');
  let arr = list.split(',');
  let filtered = arr.filter((e) => e !== "cookie_list_" + value);

  value_cookie(id, filtered);

  document.cookie = "cookie_list_" + value +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

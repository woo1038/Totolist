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
let cnt = 2;

add_btn.addEventListener('click', addBtn);
remove_all.addEventListener('click', removeAll);
select_all.addEventListener('click', selectAll);


/* 요소 생성 */
function addBtn() {
    if(add_text.value == '') {
      
    }else {
      let create_li = document.createElement('li');
      let create_span = document.createElement('span');
      let create_input = document.createElement('input');
      let create_add = document.createElement('button');
      let create_modify = document.createElement('button');
      let create_remove = document.createElement('button');


      create_li.className = "text-item"
      create_li.setAttribute('id', "li"+cnt);
      create_li.setAttribute('mode', 'completed');
      
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

      cnt++;
    }
};


/* 선택 버튼 */
function select(cnt) {
  let li = document.getElementById('li'+cnt);

  if(li.className == "text-item active") {
    li.className = "text-item"
  } else {
    li.className = "text-item active"
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
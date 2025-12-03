import Mausesetting from "./mausesetting";

document.addEventListener("DOMContentLoaded", () => {
  const buttoncards = document.querySelectorAll(".card");

  let select = null;
  let select1;
  let form;
  let idReserv = [];

  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let template = `${localStorage.getItem(key)}`;

      if (key.includes("A")) {
        select1 = document.getElementById("A");
      }
      if (key.includes("B")) {
        select1 = document.getElementById("B");
      }
      if (key.includes("C")) {
        select1 = document.getElementById("C");
      }
      let htmlObjective1 = `
          
        <p class="textcontent2">${template}</p>
        <button class="closewindow">x</button>
      
          `;
      const list1 = document.createElement("div");
      list1.className = "objective";
      list1.id = `${key}`;
      list1.innerHTML = htmlObjective1;
      select1.appendChild(list1);
      const mouse = new Mausesetting(list1);
      mouse.mouseenter();
      mouse.mouseleave();
      mouse.closeObjective();
    }
  }
  let htmlCard = ` <div class ="form" id ="Myform">
      <form action="#" class="form content">
        <input type="text" class = "textcontent" placeholder="Enter a title for this card...">
        <div class="buttones">
        <button type="submit" class="btn"> ADD CARD</button>
        <button type="button" class="btnCancel">x</button>
        </div>
      </form>
      </div>
   `;
  function generateId() {
    const id = Math.floor(Math.random() * 1000000);
    if (idReserv.includes(id)) {
      return this.generateId();
    }
    idReserv.push(id);
    return id;
  }

  let tamer;

  buttoncards.forEach(function (btn) {
    btn.addEventListener("click", () => {
      const perent = btn.parentElement;
      let tamer2 = generateId();

      if (perent.id === "A") {
        select = document.getElementById("A");

        tamer = `A${tamer2}`;
      }
      if (perent.id === "B") {
        select = document.getElementById("B");

        tamer = `B${tamer2}`;
      }
      if (perent.id === "C") {
        select = document.getElementById("C");

        tamer = `C${tamer2}`;
      }
      form = document.createElement("div");
      form.innerHTML = htmlCard;

      select.appendChild(form);

      let clickADDCard = form.querySelector(".btn");
      clickADDCard.addEventListener("click", () => {
        let textcontent = form.querySelector("input");
        let text = textcontent.value;

        let list;
        form.remove();
        if (text.trim().length != 0) {
          list = document.createElement("div");
          list.className = "objective";
          list.id = `${tamer}`;

          let htmlObjective = `
       
        <p class="textcontent2">${text}</p>
        <button class="closewindow">x</button>
     
          `;

          list.innerHTML = htmlObjective;

          select.appendChild(list);
          localStorage.setItem(`${tamer}`, text);

          const mouse = new Mausesetting(list);
          mouse.mouseenter();
          mouse.mouseleave();
          mouse.closeObjective();
        } else {
          console.log("Пустая строка");
        }
      });

      let clickCloseCard = form.querySelector(".btnCancel");
      clickCloseCard.addEventListener("click", () => {
        form.remove();
      });
    });
  });

  const taksListElements = document.querySelector(".boards");

  const items = document.querySelectorAll(".board");
  items.forEach(function (item) {
    const taskElement = item.querySelectorAll(".objective");
    for (const task of taskElement) {
      task.draggable = true;
    }
    document.documentElement.addEventListener("dragstart", (evt) => {
      evt.target.classList.add("selected");
      localStorage.removeItem(evt.target.id);
    });
    document.documentElement.addEventListener("dragend", (evt) => {
      let idActulLetter = evt.target.id[0];
      let idNewLetter = evt.target.parentElement.id;
      let idNEW = evt.target.id.replace(`${idActulLetter}`, `${idNewLetter}`);
      let text3 = evt.target.querySelector(".textcontent2").textContent;
      console.log(text3);
      localStorage.setItem(`${idNEW}`, text3);
      evt.target.classList.remove("selected");
    });
    document.documentElement.addEventListener("dragover", (evt) => {
      evt.preventDefault();
      const actualElement = taksListElements.querySelector(".selected");
      const currentElement = evt.target;

      const isMoveable =
        actualElement !== currentElement &&
        currentElement.classList.contains("objective");
      if (!isMoveable) {
        return;
      }

      currentElement.before(actualElement);
    });
  });
});

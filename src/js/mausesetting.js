export default class Mausesetting {
  constructor(fgh1) {
    this.fgh1 = fgh1;
    // this.objective = fgh1.querySelector('.objective');
    this.btnClose = fgh1.querySelector(".closewindow");
  }

  mouseenter() {
    this.fgh1.addEventListener("mouseenter", () => {
      this.btnClose.style.display = "block";
    });
  }

  mouseleave() {
    this.fgh1.addEventListener("mouseleave", () => {
      this.btnClose.style.display = "none";
    });
  }

  closeObjective() {
    this.btnClose.addEventListener("click", () => {
      localStorage.removeItem(this.fgh1.id);

      this.fgh1.remove();
    });
  }
}

var acc = document.querySelectorAll(".accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

const expandListItem = (event) => {
    const _target = event.currentTarget;
  
    Array.from(_target.parentElement.children).forEach(element => {
      element.classList.add('is-closed');
    });
    _target.classList.toggle('is-closed');
  }
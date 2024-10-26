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

function openTab(evt, tabName) {

    var i, tab, tabLabels;
    tab = document.getElementsByClassName("tab");
    for (i = 0; i < tab.length; i++) {
        tab[i].style.display = "none";
    }
    tabLabels = document.getElementsByClassName("tab-label");
    for (i = 0; i < tabLabels.length; i++) {
        tabLabels[i].className = tabLabels[i].className.replace(" active", "");
    }
    document.querySelector('.' + tabName).style.display = "block";
    console.log(tabName)
    evt.currentTarget.className += " active";
}
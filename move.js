const draggable = document.getElementById('draggable');
const nameBar = draggable.querySelector('.nameBar');

const X = draggable.querySelector('.x');

nameBar.addEventListener('mousedown', (e) => {
    let shiftX = e.clientX - draggable.getBoundingClientRect().left;
    let shiftY = e.clientY - draggable.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        draggable.style.left = pageX - shiftX + 'px';
        draggable.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    nameBar.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        nameBar.onmouseup = null;
    };
});

nameBar.ondragstart = function() {
    return false;
};

X.addEventListener('mousedown', (e) => {
    draggable.remove();
})
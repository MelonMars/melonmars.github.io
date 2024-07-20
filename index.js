document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.x')) {
            const draggable = target.closest('.draggable');
            draggable.style.display = 'none';
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.target && e.target.closest('.draggable .nameBar')) {
            const draggable = e.target.closest('.draggable');
            let shiftX = e.clientX - draggable.getBoundingClientRect().left;
            let shiftY = e.clientY - draggable.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                draggable.style.left = pageX - shiftX + 'px';
                draggable.style.top = pageY - shiftY + 'px';
            };

            moveAt(e.pageX, e.pageY);

            const onMouseMove = (e) => {
                moveAt(e.pageX, e.pageY);
            };

            document.addEventListener('mousemove', onMouseMove);

            draggable.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                draggable.onmouseup = null;
            });
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target && e.target.closest('.draggable')) {
            e.preventDefault();
        }
    });

    document.querySelectorAll('.bgSelect').forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(item.getAttribute('data-url'));
            document.getElementById("bgFrame").setAttribute("src", item.getAttribute('data-url'));
        });
    });

});

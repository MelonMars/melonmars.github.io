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

document.getElementById("aboutLink").addEventListener('click', (e) => {
    e.preventDefault();
    const div = document.getElementById("about");
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    }
})

document.getElementById("projectsLink").addEventListener('click', (e) => {
    e.preventDefault();
    const div = document.getElementById("projects");
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    }
})

document.getElementById("libraryLink").addEventListener('click', (e) => {
    e.preventDefault();
    const div = document.getElementById("library");
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    }
})

function addContentLinkListenersProjects() {
    document.querySelectorAll('.changeContentLink').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const dataContent = e.target.getAttribute('data-content');
            console.log(dataContent);
            fetch(dataContent + '.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    document.getElementById('projects').innerHTML = html;
                    addContentLinkListenersProjects(); // Reattach event listeners
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    });
}

function addContentLinkListenersLibrary() {
    document.querySelectorAll('.changeContentLink2').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const dataContent = e.target.getAttribute('data-content');
            console.log(dataContent);
            fetch(dataContent + '.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    document.getElementById('library').innerHTML = html;
                    addContentLinkListenersLibrary(); // Reattach event listeners
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    });
}

addContentLinkListenersLibrary();
addContentLinkListenersProjects();
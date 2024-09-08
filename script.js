document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const titleElement = document.getElementById('timeline-title');
    const descriptionElement = document.getElementById('timeline-description');
    const imageElement = document.getElementById('timeline-image');
    const detailsElement = document.querySelector('.timeline-details');
    const timeline = document.querySelector('.timeline');


    const progressLine = document.createElement('div');
    progressLine.classList.add('progress-line');
    timeline.appendChild(progressLine);

    let activeIndex = 0;
    const interval = 2000;

    function activateItem(index) {

        timelineItems.forEach((i) => i.classList.remove('active'));


        timelineItems[index].classList.add('active');


        const progressWidth = ((index) / (timelineItems.length - 1)) * 100;
        progressLine.style.width = `${progressWidth}%`;


        detailsElement.style.opacity = 0;
        setTimeout(() => {
            const item = timelineItems[index];
            const year = item.getAttribute('data-year');
            const description = item.getAttribute('data-description');
            const image = item.getAttribute('data-image');

            titleElement.textContent = year;
            descriptionElement.textContent = description;
            imageElement.src = image;

            detailsElement.style.opacity = 1;
        }, 200);
    }


    function moveToNextItem() {
        activeIndex = (activeIndex + 1) % timelineItems.length; // Loop back to start
        activateItem(activeIndex);
    }


    let intervalId = setInterval(moveToNextItem, interval);


    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            clearInterval(intervalId);
            activateItem(index);
            activeIndex = index;


            intervalId = setInterval(moveToNextItem, interval);
        });
    });

    // Activate the first item initially
    activateItem(activeIndex);
});

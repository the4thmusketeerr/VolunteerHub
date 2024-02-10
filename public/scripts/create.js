document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    try {
        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        if (response.ok) {
            const eventData = await response.json();
            createCard(eventData);
        } else {
            console.error('Failed to submit form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
});

function createCard(eventData) {
    const cardContainer = document.querySelector('.search-area');

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="./images/homepage/event1.jpeg" />
        <div class="card-text">
            <h3 class="title">${eventData.eventTitle}</h3>
            <p class="date-time">
                <i class="fas fa-calendar-alt"></i> ${eventData.dateTime} <br>
                <span class="time"><i class="far fa-clock"></i> ${formatTime(eventData.dateTime)}</span>
            </p>
            <p class="location">
                <i class="fas fa-map-marker-alt"></i> ${eventData.location}
            </p>
        </div>
    `;

    cardContainer.appendChild(card);
}

function formatTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

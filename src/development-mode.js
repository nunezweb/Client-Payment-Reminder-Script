/*
 * Author: Alejandro Núñez
 * Email:  alejandro@nunezweb.com
 * Description: JavaScript to gradually decrease the opacity of a website if the client has not paid.
 * Date: 2024-06-18
 */

(function(){
    // Configuration directly in the JavaScript file
    const config = {
        developmentMode: true,
        message: "Website in development, click here to go to production.",
        link: "https://www.yoursite.com",
        due_date: "2024-01-20",
        days_deadline: 60
    };

    // Function to adjust the opacity and show the message
    function applyDevelopmentMode(config) {
        if (!config || !config.developmentMode) return;

        const due_date = new Date(config.due_date);
        const days_deadline = config.days_deadline;

        const current_date = new Date();
        const utc1 = Date.UTC(due_date.getFullYear(), due_date.getMonth(), due_date.getDate());
        const utc2 = Date.UTC(current_date.getFullYear(), current_date.getMonth(), current_date.getDate());
        const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

        let opacity;
        if (days > days_deadline) {
            // After the deadline, set the opacity to a low but readable value
            opacity = 0.2;
            document.body.style.opacity = opacity;

            // Specific message after the deadline
            const message = `${config.message} <span style="color: red; font-size: 20px;">The development period has ended.</span> <a href="${config.link}">Click here to go to production</a>.`;
            showDevelopmentMessage(message);
        } else if (days > 0) {
            const days_late = days_deadline - days;
            opacity = Math.max(0.2, Math.min(1, (days_late * 100 / days_deadline) / 100));
            document.body.style.opacity = opacity;

            // Standard message during the development period
            const message = `${config.message} <a href="${config.link}">Click here to go to production</a>.`;
            showDevelopmentMessage(message);
        }
    }

    // Function to show the development message
    function showDevelopmentMessage(message) {
        // Add CSS styles for the message directly to the HTML
        const style = `
            #devMessage {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: black;
                color: white;
                text-align: center;
                padding: 10px;
                font-size: 16px;
                z-index: 1000;
                transition: opacity 0.5s ease;
            }
            #devMessage a {
                color: yellow;
                text-decoration: underline;
            }
        `;

        // Create the development message
        const devMessage = document.createElement('div');
        devMessage.id = 'devMessage';
        devMessage.innerHTML = `<style>${style}</style>${message}`;

        document.body.appendChild(devMessage);
    }

    // Apply the development mode configuration
    applyDevelopmentMode(config);
})();

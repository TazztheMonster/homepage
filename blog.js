// Function to create blog post cards
function createBlogPostCards() {
    const container = document.querySelector('.blog-container');

    // Fetch the list of blog posts
    fetch('blog-posts/posts.json')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                // Fetch the Markdown content for each post
                fetch(`blog-posts/${post.filename}`)
                    .then(response => response.text())
                    .then(markdown => {
                        const card = document.createElement('div');
                        card.className = 'card blog-card';

                        // Title
                        const title = document.createElement('h2');
                        title.textContent = post.title;
                        card.appendChild(title);

                        // Content preview (first 5 lines)
                        const contentPreview = document.createElement('p');
                        contentPreview.innerHTML = marked(post.content.split('\n').slice(0, 5).join('\n'));
                        card.appendChild(contentPreview);

                        // Full content, hidden by default
                        const fullContent = document.createElement('div');
                        fullContent.className = 'full-content';
                        fullContent.style.display = 'none';
                        fullContent.innerHTML = marked(post.content);
                        card.appendChild(fullContent);

                        // Date and tags
                        const dateAndTags = document.createElement('p');
                        dateAndTags.innerHTML = '<strong>Date:</strong> ' + post.date + ' | <strong>Tags:</strong> ' + post.tags.join(', ');
                        dateAndTags.style.display = 'none';
                        card.appendChild(dateAndTags);

                        // Close button
                        const closeButton = document.createElement('button');
                        closeButton.className = 'close-button'; // Apply the CSS class
                        closeButton.textContent = 'Close';
                        closeButton.style.display = 'none'; // Hidden by default
                        card.appendChild(closeButton);

                        // Event listener to expand card
                        card.addEventListener('click', () => {
                            fullContent.style.display = 'block';
                            dateAndTags.style.display = 'block';
                            contentPreview.style.display = 'none';
                            closeButton.style.display = 'block'; // Show the close button
                        });

                        // Event listener to collapse card (attached to the close button)
                        closeButton.addEventListener('click', (event) => {
                            fullContent.style.display = 'none';
                            dateAndTags.style.display = 'none';
                            contentPreview.style.display = 'block';
                            closeButton.style.display = 'none'; // Hide the close button
                            event.stopPropagation(); // Prevent the card's click event from being triggered
                        });

                        container.appendChild(card);
                    });
            });
        });
}

// Create the blog post cards on page load
window.addEventListener('DOMContentLoaded', createBlogPostCards);

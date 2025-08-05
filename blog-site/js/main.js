fetch('posts/posts.json')
  .then(response => response.json())
  .then(posts => {
    const blogContainer = document.getElementById('blog-posts');

    posts.forEach(post => {
      const postDiv = document.createElement('div');
      const postDate = new Date(post.date);
      const formattedDate = postDate.toLocaleDateString('ur-PK', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>📅 تاریخ:</strong> ${formattedDate}</p>
        <img src="${post.image}" alt="Post Image" width="300">
        <p>${post.content}</p>
        <a href="${post.book}" download>📖 Download Book</a>
        <hr>
      `;

      blogContainer.appendChild(postDiv);
    });
  })
  .catch(error => console.error("Error loading posts:", error));

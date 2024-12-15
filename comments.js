document.addEventListener("DOMContentLoaded", function() {
    // Fetch the comments JSON data
    fetch('comments.json')
      .then(response => response.json())
      .then(data => displayComments(data))
      .catch(error => console.log('Error loading the comments:', error));
  
    // Function to display comments
    function displayComments(commentsData) {
      const commentsList = document.getElementById("comments-list");
  
      // Group comments by thread_id
      const threads = {};
      commentsData.forEach(comment => {
        if (!threads[comment.thread_id]) {
          threads[comment.thread_id] = [];
        }
        threads[comment.thread_id].push(comment);
      });
  
      // Loop through each thread
      for (let threadId in threads) {
        const thread = threads[threadId];
        const threadDiv = document.createElement('div');
  
        // Loop through each comment in the thread
        thread.forEach(comment => {
          const commentCard = createCommentCard(comment);
          threadDiv.appendChild(commentCard);
        });
  
        commentsList.appendChild(threadDiv);
      }
    }
  
    // Function to create a comment card (for both main comment and replies)
    function createCommentCard(comment) {
      const commentCard = document.createElement("div");
      commentCard.className = "card mb-3";
  
      const commentCardBody = document.createElement("div");
      commentCardBody.className = "card-body";
  
      // User profile and name
      const userDiv = document.createElement("div");
      userDiv.className = "d-flex";
      const userProfileLink = document.createElement("a");
      userProfileLink.href = "https://example.com/user-profile";  // Link to the user profile
      userProfileLink.target = "_blank";
      const userProfileImage = document.createElement("img");
      userProfileImage.src = comment.profile_pic;
      userProfileImage.alt = "User Profile";
      userProfileImage.className = "rounded-circle";
      userProfileLink.appendChild(userProfileImage);
      const userName = document.createElement("h5");
      userName.className = "card-title";
      userName.textContent = comment.user_name;
  
      userDiv.appendChild(userProfileLink);
      userDiv.appendChild(userName);
  
      // Comment text and date
      const commentText = document.createElement("p");
      commentText.className = "card-text";
      commentText.textContent = comment.comment;
  
      const commentDate = document.createElement("p");
      commentDate.className = "text-muted";
      commentDate.textContent = `Posted on: ${comment.date_time}`;
  
      // Append user, comment, and date to card body
      commentCardBody.appendChild(userDiv);
      commentCardBody.appendChild(commentText);
      commentCardBody.appendChild(commentDate);
  
      // Display replies (if any)
      if (comment.replies && comment.replies.length > 0) {
        const repliesDiv = document.createElement("div");
        repliesDiv.className = "replies-list";
        comment.replies.forEach(reply => {
          const replyCard = createCommentCard(reply);
          repliesDiv.appendChild(replyCard);
        });
        commentCardBody.appendChild(repliesDiv);
      }
  
      commentCard.appendChild(commentCardBody);
      return commentCard;
    }
  });
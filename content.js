// Function to find and click the submit button
function findAndClickSubmitButton() {
  // For comments
  const commentButtons = document.querySelectorAll('button[type="submit"]');
  for (const button of commentButtons) {
    if (button.textContent.toLowerCase().includes('comment') || 
        button.textContent.toLowerCase().includes('reply')) {
      button.click();
      return true;
    }
  }

  // For posts
  const postButton = document.querySelector('button[type="submit"][role="button"]');
  if (postButton) {
    postButton.click();
    return true;
  }

  return false;
}

// Listen for keydown events
document.addEventListener('keydown', function(event) {
  // Check if it's Command+Enter (Mac) or Control+Enter (Windows/Linux)
  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    // Prevent the default behavior
    event.preventDefault();
    
    // Try to find and click the submit button
    const submitted = findAndClickSubmitButton();
    
    if (!submitted) {
      console.log('No submit button found');
    }
  }
}); 
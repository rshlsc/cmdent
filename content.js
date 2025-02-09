// Function to find and click the submit button
function findAndClickSubmitButton() {
  try {
    // For comments
    const commentButtons = document.querySelectorAll('button[type="submit"]');
    for (const button of commentButtons) {
      if (button.textContent.toLowerCase().includes('comment') || 
          button.textContent.toLowerCase().includes('reply')) {
        // Remove any trailing newlines from the textarea before submitting
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.value = textarea.value.trimEnd();
        }
        button.click();
        return true;
      }
    }

    // For posts
    const postButton = document.querySelector('button[type="submit"][role="button"]');
    if (postButton) {
      // Remove any trailing newlines from the post content before submitting
      const postContent = document.querySelector('[role="textbox"], textarea');
      if (postContent) {
        postContent.value = postContent.value?.trimEnd();
      }
      postButton.click();
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in findAndClickSubmitButton:', error);
    return false;
  }
}

// Listen for keydown events
document.addEventListener('keydown', function(event) {
  // Only proceed if it's exactly Command+Enter (Mac) or Control+Enter (Windows/Linux)
  // and no other modifier keys are pressed (like shift)
  if (event.key === 'Enter' && 
      (event.metaKey || event.ctrlKey) && 
      !event.shiftKey && 
      !event.altKey) {
    
    // Only prevent default if we're in a text input or contenteditable element
    const activeElement = document.activeElement;
    const isTextInput = activeElement.tagName === 'TEXTAREA' || 
                       activeElement.tagName === 'INPUT' ||
                       activeElement.getAttribute('contenteditable') === 'true' ||
                       activeElement.getAttribute('role') === 'textbox';
    
    if (isTextInput) {
      event.preventDefault();
      event.stopPropagation();
      
      // Try to find and click the submit button
      const submitted = findAndClickSubmitButton();
      
      if (!submitted) {
        console.log('No submit button found - make sure you are focused in a comment or post input field');
      }
    }
  }
}); 
(function() {
  function initVoiceRecognition() {
    console.log('Initializing voice recognition...');
    
    addTestButton();
    
    window.updateMainSearchInput = function(text) {
      console.log('Global updateMainSearchInput called with:', text);
      
      const searchInput = document.querySelector('input[placeholder*="Search"]') || 
                         document.querySelector('input[type="search"]') ||
                         document.querySelector('input[placeholder*="services"]');
                         
      if (searchInput) {
        console.log('Found search input, updating value to:', text);
        searchInput.value = text;
        
        const inputEvent = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(inputEvent);
        
        const changeEvent = new Event('change', { bubbles: true });
        searchInput.dispatchEvent(changeEvent);
        
        const searchButton = document.querySelector('.search-trigger') || 
                            document.querySelector('button[type="submit"]') || 
                            document.querySelector('#search-submit-button') ||
                            document.querySelector('button img[src*="search"]')?.closest('button') ||
                            document.querySelector('button svg')?.closest('button') ||
                            searchInput?.closest('form')?.querySelector('button') ||
                            document.querySelector('form button');
                            
        if (searchButton) {
          console.log('Found search button, clicking it');
          setTimeout(() => searchButton.click(), 300);
          return true;
        } else {
          console.log('No search button found, simulating Enter key press');
          setTimeout(() => {
            const event = new KeyboardEvent('keypress', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true
            });
            searchInput.dispatchEvent(event);
          }, 300);
          return true;
        }
      } else {
        console.log('No search input found');
        return false;
      }
    };
    
    const searchInput = document.querySelector('input[placeholder*="Search"]') || 
                       document.querySelector('input[type="search"]') ||
                       document.querySelector('input[placeholder*="services"]') ||
                       document.querySelector('input[placeholder*="carpenter"]') ||
                       document.querySelector('form input') ||
                       document.querySelector('input');
                       
    console.log('Search input found:', !!searchInput);
    if (searchInput) {
      console.log('Search input details:', {
        id: searchInput.id,
        className: searchInput.className,
        placeholder: searchInput.placeholder,
        type: searchInput.type
      });
    }
    
    const searchButton = document.querySelector('.search-trigger') || 
                        document.querySelector('button[type="submit"]') || 
                        document.querySelector('#search-submit-button') ||
                        document.querySelector('button img[src*="search"]')?.closest('button') ||
                        document.querySelector('button svg')?.closest('button') ||
                        searchInput?.closest('form')?.querySelector('button');
                        
    console.log('Search button found:', !!searchButton);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported by this browser');
      return;
    }
    
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    const voiceButton = document.querySelector('button[aria-label*="voice"]') || 
                        document.querySelector('button svg[aria-hidden="true"]')?.closest('button') ||
                        document.querySelector('button:has(svg)') || 
                        document.querySelector('button.voice-input') ||
                        document.querySelector('#voice-search-button') ||
                        document.querySelector('button img[src*="mic"]')?.closest('button') ||
                        document.querySelector('button img[alt*="voice"]')?.closest('button') ||
                        document.querySelector('button img[alt*="mic"]')?.closest('button') ||
                        Array.from(document.querySelectorAll('button')).find(btn => {
                          const hasIcon = btn.querySelector('svg') || btn.querySelector('img');
                          const btnRect = btn.getBoundingClientRect();
                          return hasIcon && btnRect.width < 50 && btnRect.height < 50 && 
                                searchInput && Math.abs(btnRect.top - searchInput.getBoundingClientRect().top) < 50;
                        });
  
    console.log('Voice button found:', !!voiceButton);
    
    if (!voiceButton) {
      console.error('Voice button not found');
      return;
    }
    
    voiceButton.addEventListener('click', function(e) {
      console.log('Voice button clicked');
      e.preventDefault();
      
      try {
        recognition.start();
        console.log('Recognition started');
        
        if (searchInput) {
          searchInput.placeholder = 'Listening...';
        }
        voiceButton.classList.add('active');
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    });
    
    recognition.onresult = function(event) {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
        
      console.log('Voice recognition result:', transcript);
      
      if (searchInput) {
        searchInput.value = transcript;
        
        const inputEvent = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(inputEvent);
        
        const changeEvent = new Event('change', { bubbles: true });
        searchInput.dispatchEvent(changeEvent);
      }
      
      if (event.results[0].isFinal) {
        setTimeout(() => {
          if (searchButton) {
            console.log('Clicking search button');
            searchButton.click();
          } else if (searchInput) {
            console.log('Simulating Enter key press');
            const event = new KeyboardEvent('keypress', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true
            });
            searchInput.dispatchEvent(event);
          } else {
            console.log('Using global updateMainSearchInput function');
            window.updateMainSearchInput(transcript);
          }
        }, 300);
      }
    };
    
    recognition.onend = function() {
      console.log('Recognition ended');
      voiceButton.classList.remove('active');
      if (searchInput) {
        searchInput.placeholder = 'Search for services (e.g., carpenter)';
      }
    };
    
    recognition.onerror = function(event) {
      console.error('Speech recognition error', event.error);
      voiceButton.classList.remove('active');
    };
    
    window.startVoiceRecognition = function() {
      if (recognition) {
        recognition.start();
      }
    };
    
    function addTestButton() {
      let testButton = document.getElementById('voice-test-button');
      
      if (!testButton) {
        testButton = document.createElement('button');
        testButton.id = 'voice-test-button';
        testButton.innerText = 'Test Voice Search with "carpenter"';
        testButton.className = 'bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-medium fixed top-20 right-4 z-50';
        
        testButton.addEventListener('click', function() {
          console.log('Test button clicked');
          const testQuery = 'carpenter';
          
          if (window.updateMainSearchInput) {
            window.updateMainSearchInput(testQuery);
          } else if (searchInput) {
            searchInput.value = testQuery;
            
            const inputEvent = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(inputEvent);
            
            const changeEvent = new Event('change', { bubbles: true });
            searchInput.dispatchEvent(changeEvent);
            
            if (searchButton) {
              searchButton.click();
            }
          }
        });
        
        document.body.appendChild(testButton);
        console.log('Test button added');
      } else {
        testButton.style.display = 'block';
      }
    }
  }
  
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('Document already loaded, initializing immediately');
    initVoiceRecognition();
  } else {
    console.log('Waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', initVoiceRecognition);
  }
  
  setTimeout(function() {
    console.log('Fallback initialization after timeout');
    initVoiceRecognition();
  }, 2000);
})();

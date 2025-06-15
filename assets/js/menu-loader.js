/**
 * Menu Loader for WinAudio
 * This script loads the menu component into any page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load the menu component
  loadMenu();
  
  // Set active menu item based on current page
  setActiveMenuItem();
});

/**
 * Loads the menu component from components/menu.html
 */
function loadMenu() {
  const menuContainer = document.getElementById('menu-container');
  
  if (!menuContainer) {
    console.error('Menu container not found. Add a div with id="menu-container" to your page.');
    return;
  }
  
  // Calculate the relative path to the components directory
  const path = getRelativePath();
  
  console.log('Current path:', window.location.pathname);
  console.log('Calculated relative path:', path);
  console.log('Attempting to load menu from:', path + 'components/menu.html');
  
  // Fetch the menu component
  fetch(path + 'components/menu.html')
    .then(response => {
      console.log('Menu fetch response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to load menu component: ' + response.status);
      }
      return response.text();
    })
    .then(html => {
      console.log('Menu HTML loaded, length:', html.length);
      menuContainer.innerHTML = html;
      console.log('Menu container updated');
      
      // Initialize Material Design components after loading the menu
      if (typeof initMaterialComponents === 'function') {
        console.log('Initializing Material components');
        initMaterialComponents();
      } else {
        console.warn('initMaterialComponents function not found');
      }
      
      // Setup menu events after loading the menu
      if (typeof setupMenuEvents === 'function') {
        console.log('Setting up menu events');
        setupMenuEvents();
      } else {
        console.warn('setupMenuEvents function not found');
      }
      
      // Update page title
      updatePageTitle();
    })
    .catch(error => {
      console.error('Error loading menu:', error);
      menuContainer.innerHTML = '<p>Error loading menu: ' + error.message + '</p>';
    });
}

/**
 * Sets the active menu item based on the current page URL
 */
function setActiveMenuItem() {
  // Get current page path
  const currentPath = window.location.pathname;
  
  // Wait for menu to be loaded
  const checkMenuLoaded = setInterval(() => {
    const menuItems = document.querySelectorAll('.mdc-list-item');
    
    if (menuItems.length > 0) {
      clearInterval(checkMenuLoaded);
      
      // Remove active class from all menu items
      menuItems.forEach(item => {
        item.classList.remove('mdc-list-item--activated');
      });
      
      // Find and activate the current menu item
      menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.endsWith(href)) {
          item.classList.add('mdc-list-item--activated');
        }
      });
      
      // Special case for exam pages
      if (currentPath.includes('/exames/')) {
        const examMenuItems = {
          'cadastro.html': 'menu-cadastro-exames',
          'via-aerea.html': 'menu-cadastro-exames',
          'via-ossea.html': 'menu-cadastro-exames',
          'logoaudiometria.html': 'menu-cadastro-exames',
          'consulta.html': 'menu-consulta-exames',
          'agendamento.html': 'menu-agendamento',
          'historico.html': 'menu-historico'
        };
        
        // Get the current page filename
        const filename = currentPath.split('/').pop();
        
        // Activate the corresponding menu item
        if (examMenuItems[filename]) {
          const menuItem = document.getElementById(examMenuItems[filename]);
          if (menuItem) {
            menuItem.classList.add('mdc-list-item--activated');
          }
        }
      }
    }
  }, 100);
}

/**
 * Updates the page title in the top app bar
 */
function updatePageTitle() {
  const pageTitle = document.getElementById('page-title');
  const documentTitle = document.title || 'WinAudio';
  
  if (pageTitle) {
    pageTitle.textContent = documentTitle;
  }
}

/**
 * Gets the relative path from the current page to the root directory
 */
function getRelativePath() {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  // Count the number of directories deep we are
  const depth = pathSegments.length - 1; // -1 because the last segment is the filename
  
  // Create the relative path
  let relativePath = '';
  for (let i = 0; i < depth; i++) {
    relativePath += '../';
  }
  
  return relativePath;
}

/**
 * Component Loader
 * Loads reusable HTML components into pages
 */

(function() {
  'use strict';

  // Component cache to avoid multiple loads
  const componentCache = {};

  /**
   * Load a component from a file and insert it into the target element
   * @param {string} componentPath - Path to the component HTML file
   * @param {string|HTMLElement} targetSelector - CSS selector or element to insert component into
   * @param {Function} callback - Optional callback function after component is loaded
   */
  function loadComponent(componentPath, targetSelector, callback) {
    // Check cache first
    if (componentCache[componentPath]) {
      insertComponent(componentCache[componentPath], targetSelector, callback);
      return;
    }

    // Fetch the component
    fetch(componentPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load component: ${componentPath}`);
        }
        return response.text();
      })
      .then(html => {
        // Cache the component
        componentCache[componentPath] = html;
        // Insert into target
        insertComponent(html, targetSelector, callback);
      })
      .catch(error => {
        console.error('Error loading component:', error);
        // Show error message in target element
        const target = typeof targetSelector === 'string' 
          ? document.querySelector(targetSelector) 
          : targetSelector;
        if (target) {
          target.innerHTML = '<div style="padding: 20px; text-align: center; color: #dc2626;">Error loading component. Please refresh the page.</div>';
        }
      });
  }

  /**
   * Insert component HTML into target element
   * @param {string} html - HTML content to insert
   * @param {string|HTMLElement} targetSelector - CSS selector or element
   * @param {Function} callback - Optional callback
   */
  function insertComponent(html, targetSelector, callback) {
    const target = typeof targetSelector === 'string' 
      ? document.querySelector(targetSelector) 
      : targetSelector;

    if (!target) {
      console.error('Target element not found:', targetSelector);
      return;
    }

    // Insert the HTML
    target.innerHTML = html;

    // Re-initialize any scripts or event handlers if needed
    if (typeof callback === 'function') {
      callback();
    }

    // Dispatch custom event for component loaded
    const event = new CustomEvent('componentLoaded', {
      detail: { target: target, html: html }
    });
    document.dispatchEvent(event);
  }

  /**
   * Auto-load components marked with data-component attribute
   */
  function autoLoadComponents() {
    const componentPlaceholders = document.querySelectorAll('[data-component]');
    
    componentPlaceholders.forEach(placeholder => {
      const componentPath = placeholder.getAttribute('data-component');
      if (componentPath) {
        loadComponent(componentPath, placeholder);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoLoadComponents);
  } else {
    // DOM is already ready
    autoLoadComponents();
  }

  // Export for manual use
  window.ComponentLoader = {
    load: loadComponent,
    autoLoad: autoLoadComponents
  };

})();

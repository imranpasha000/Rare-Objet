const fs = require('fs');
const path = require('path');

// Premium navigation template
const PREMIUM_NAV = `  <!-- Navigation -->
  <nav class="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center flex-1 min-w-0">
          <div class="flex-shrink-0">
            <a href="index.html" class="block">
              <img src="Logo/Logo.jpg" alt="Logo"
                class="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px]">
            </a>
          </div>
        </div>
        <!-- Mobile hamburger -->
        <div class="md:hidden flex-shrink-0 ml-2">
          <button id="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false"
            class="text-gray-700 hover:text-blue-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <span class="sr-only">Open main menu</span>
            <i class="fas fa-bars text-xl" id="icon-open"></i>
            <i class="fas fa-times text-xl hidden" id="icon-close"></i>
          </button>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-1">
            <a href="index.html"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
            <a href="services.html"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
            <a href="products.html"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</a>
            <a href="why-we-exist.html"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Why We Exist</a>
            <a href="portfolio.html"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Portfolio</a>
            <a href="about-us.html"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</a>
            <a href="news.html"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">News</a>
            <div class="relative group">
              <button class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                More <i class="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div
                class="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                <div class="py-2">
                  <a href="esg-strategy.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">ESG Strategy</a>
                  <a href="supply-chain-innovation.html"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Supply Chain Innovation</a>
                  <a href="investors.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Investors</a>
                  <a href="media.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Media</a>
                  <a href="suppliers.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Suppliers</a>
                  <a href="careers.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Careers</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex items-center">
          <a href="login.html"
            class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Login
          </a>
        </div>
      </div>
    </div>
    <!-- Mobile menu panel -->
    <div id="mobile-menu" class="md:hidden hidden border-t border-gray-200 bg-white shadow-lg">
      <div class="px-4 py-4 space-y-1">
        <a href="index.html"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Home</a>
        <a href="services.html"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Services</a>
        <a href="products.html"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Products</a>
        <a href="why-we-exist.html"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Why We Exist</a>
        <a href="portfolio.html"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Portfolio</a>
        <a href="about-us.html"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">About Us</a>
        <a href="news.html"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">News</a>
        <div class="pt-2 mt-2 border-t border-gray-200" aria-label="More">
          <a href="esg-strategy.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">ESG Strategy</a>
          <a href="supply-chain-innovation.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Supply Chain Innovation</a>
          <a href="investors.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Investors</a>
          <a href="media.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Media</a>
          <a href="suppliers.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Suppliers</a>
          <a href="careers.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Careers</a>
        </div>
        <div class="pt-3">
          <a href="login.html"
            class="block text-center w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md">
            Login</a>
        </div>
      </div>
    </div>
  </nav>`;

function updateNavigationInFile(filepath) {
  try {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Pattern to match the old navigation section (from <!-- Navigation --> to </nav>)
    const navPattern = /<!-- Navigation -->[\s\S]*?<\/nav>/;
    
    // Check if file needs updating
    if (navPattern.test(content)) {
      // Get the current page name to highlight it in navigation
      const filename = path.basename(filepath, '.html');
      let updatedNav = PREMIUM_NAV;
      
      // Update active state for current page
      const pageMap = {
        'index': 'index.html',
        'services': 'services.html',
        'products': 'products.html',
        'why-we-exist': 'why-we-exist.html',
        'portfolio': 'portfolio.html',
        'about-us': 'about-us.html',
        'news': 'news.html',
        'esg-strategy': 'esg-strategy.html',
        'supply-chain-innovation': 'supply-chain-innovation.html',
        'investors': 'investors.html',
        'media': 'media.html',
        'suppliers': 'suppliers.html',
        'careers': 'careers.html',
        'login': 'login.html',
        'signup': 'signup.html'
      };
      
      // Replace navigation
      content = content.replace(navPattern, updatedNav);
      
      // Write back
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`✓ Updated ${filepath}`);
      return true;
    } else {
      console.log(`⚠ Skipped ${filepath} (no navigation found or already updated)`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${filepath}: ${error.message}`);
    return false;
  }
}

// Files to update
const filesToUpdate = [
  'about-us.html',
  'why-we-exist.html',
  'portfolio.html',
  'news.html',
  'esg-strategy.html',
  'supply-chain-innovation.html',
  'investors.html',
  'media.html',
  'suppliers.html',
  'careers.html',
  'team-experts.html',
  'signup.html'
];

// Main execution
console.log('Updating navigation in HTML files...\n');
let updated = 0;

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    if (updateNavigationInFile(file)) {
      updated++;
    }
  } else {
    console.log(`⚠ File not found: ${file}`);
  }
});

console.log(`\n✓ Updated ${updated} files`);


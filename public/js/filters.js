

function toggleFilters() {
    var filterMenu = document.getElementById("filterMenu");
    if (filterMenu.style.display === "none" || filterMenu.style.display === "") {
        filterMenu.style.display = "block"; // Show the menu
    } else {
        filterMenu.style.display = "none"; // Hide the menu
    }
}




function applyFilter() {
    var selectedCuisine = document.getElementById("cuisineFilter").value;
    console.log("Selected cuisine:", selectedCuisine);

    // Redirect to the same page with the selected cuisine as a query parameter (causing a reload)
    window.location.href = "/?cuisine=" + encodeURIComponent(selectedCuisine);
}



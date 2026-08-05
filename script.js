document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".collection-card");

    if (!searchInput) {
        console.error("Search input was not found.");
        return;
    }

    if (cards.length === 0) {
        console.error("No collection cards were found.");
        return;
    }

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        cards.forEach((card) => {
            const cardText = card.textContent.toLowerCase();
            const matches = cardText.includes(searchTerm);

            card.hidden = !matches;
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput =
        document.getElementById("projectSearchInput");

    const searchResults =
        document.getElementById("projectSearchResults");

    const projectCards =
        document.querySelectorAll(".project-card");

    if (!searchInput || !searchResults || projectCards.length === 0) {
        return;
    }

    const projects = Array.from(projectCards).map((card) => {
        return {
            title:
                card.dataset.title ||
                card.querySelector("h2")?.textContent.trim() ||
                "Untitled project",

            url:
                card.dataset.url ||
                card.querySelector("a")?.getAttribute("href") ||
                "#",

            searchableText:
                card.textContent.toLowerCase()
        };
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        searchResults.innerHTML = "";

        projectCards.forEach((card) => {
            const matches = card.textContent
                .toLowerCase()
                .includes(searchTerm);

            card.hidden = !matches;
        });

        if (searchTerm === "") {
            searchResults.style.display = "none";
            return;
        }

        const matches = projects.filter((project) => {
            return project.searchableText.includes(searchTerm);
        });

        matches.forEach((project) => {
            const resultLink = document.createElement("a");

            resultLink.className = "search-result";
            resultLink.href = project.url;
            resultLink.textContent = project.title;

            searchResults.appendChild(resultLink);
        });

        searchResults.style.display =
            matches.length > 0 ? "block" : "none";
    });

    document.addEventListener("click", (event) => {
        const clickedInsideSearch =
            event.target.closest(".search-container");

        if (!clickedInsideSearch) {
            searchResults.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const fadeElements =
        document.querySelectorAll(".fade-on-scroll");

    if (fadeElements.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    fadeElements.forEach((element) => {
        observer.observe(element);
    });
});
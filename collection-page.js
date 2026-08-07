let visibleProjects = [];

document.addEventListener("DOMContentLoaded", () => {
    const projectGrid =
        document.getElementById("projectGrid");

    const searchInput =
        document.getElementById("projectSearchInput");

    if (!projectGrid) {
        return;
    }

    visibleProjects = getProjectsForPage(projectGrid);

    renderProjects(projectGrid, visibleProjects);

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchTerm =
                searchInput.value
                    .trim()
                    .toLowerCase();

            const matchingProjects =
                visibleProjects.filter((project) => {

                    const searchableText = [
                        project.title || "",
                        project.shortDescription || "",
                        project.collection || "",
                        project.category || "",
                        project.software || "",
                        project.renderer || "",
                        ...(project.tags || [])
                    ]
                        .join(" ")
                        .toLowerCase();

                    return searchableText.includes(searchTerm);
                });

            renderProjects(
                projectGrid,
                matchingProjects
            );
        });
    }
});


function getProjectsForPage(projectGrid) {

    if (projectGrid.dataset.featured === "true") {
        return projects.filter((project) => {
            return project.featured === true;
        });
    }

    const collectionName =
        projectGrid.dataset.collection;

    return projects.filter((project) => {
        return project.collection === collectionName;
    });
}


function renderProjects(container, projectList) {

    container.innerHTML = "";

    if (projectList.length === 0) {
        container.innerHTML = `
            <p class="empty-collection">
                No matching projects found.
            </p>
        `;

        return;
    }

    projectList.forEach((project) => {

        const card =
            document.createElement("a");

        card.className =
            "project-card";

        const projectGrid =
            document.getElementById("projectGrid");

        const fromCollection =
            projectGrid.dataset.featured === "true"
                ? "featured"
                : projectGrid.dataset.collection;

        card.href =
            `../project.html?id=${encodeURIComponent(project.id)}&from=${encodeURIComponent(fromCollection)}`;

        const image =
            document.createElement("img");

        image.src =
            `../${project.coverImage}`;

        image.alt =
            project.title;

        image.loading =
            "lazy";


        const content =
            document.createElement("div");

        content.className =
            "project-card-content";


        const title =
            document.createElement("h2");

        title.textContent =
            project.title;


        const description =
            document.createElement("p");

        description.textContent =
            project.shortDescription;


        content.append(
            title,
            description
        );

        card.append(
            image,
            content
        );

        container.appendChild(card);
    });
}
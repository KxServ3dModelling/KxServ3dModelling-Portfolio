document.addEventListener("DOMContentLoaded", () => {
    const parameters = new URLSearchParams(window.location.search);
    const projectId = parameters.get("id");
    const fromCollection = parameters.get("from");

    const project = projects.find((item) => {
        return item.id === projectId;
    });

    if (!project) {
        showProjectNotFound();
        return;
    }

    populateProject(project);
});

function populateProject(project) {
    document.title = `${project.title} | Noah Rafter`;

    setText("projectCollection", `${project.collection} collection`);
    setText("projectTitle", project.title);
    setText("projectDescription", project.shortDescription);
    setText("projectSoftware", project.software);
    setText("projectRenderer", project.renderer);
    setText("projectCategory", project.category);
    setText("projectCompleted", project.completed);
    setText("projectOverview", project.overview);

    const coverImage = document.getElementById("projectCover");

    coverImage.src = project.coverImage;
    coverImage.alt = project.title;

    populateGallery(project);
    populateVideo(project);
    configureBackLink(project);
}

function populateGallery(project) {
    const gallerySection =
        document.getElementById("gallerySection");

    const gallery =
        document.getElementById("projectGallery");

    if (
        !Array.isArray(project.galleryImages) ||
        project.galleryImages.length === 0
    ) {
        gallerySection.hidden = true;
        return;
    }

    project.galleryImages.forEach((imagePath, index) => {

    const image = document.createElement("img");

    image.src = imagePath;

    image.addEventListener("click", () => {
        openLightbox(image.src);
    });

    image.alt = `${project.title} gallery image ${index + 1}`;

    image.loading = "lazy";

    gallery.appendChild(image);

});

}

function populateVideo(project) {
    const videoSection =
        document.getElementById("videoSection");

    const video =
        document.getElementById("projectVideo");

    if (!project.video) {
        videoSection.hidden = true;
        return;
    }

    video.src = project.video;
}

function configureBackLink(project) {
    const backLink =
        document.getElementById("backToCollection");

    const parameters =
        new URLSearchParams(window.location.search);

    const fromCollection =
        parameters.get("from");

    const collectionPages = {
        featured: "collections/featured.html",
        environment: "collections/environment.html",
        characters: "collections/characters.html",
        abstract: "collections/abstract.html",
        hardsurface: "collections/hardsurface.html",
        props: "collections/props.html"
    };

    const destination = fromCollection || project.collection;

    console.log("Back destination:", destination);

    backLink.href =
        collectionPages[destination];

    backLink.textContent =
        `← Back to ${capitalise(destination)} collection`;
}

function setText(elementId, value) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = value || "";
    }
}

function capitalise(value) {
    if (!value) {
        return "";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

function showProjectNotFound() {
    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="project-not-found">
            <h1>Project not found</h1>

            <p>
                The requested project does not exist or its link is incorrect.
            </p>

            <a href="index.html">
                Return to portfolio
            </a>
        </section>
    `;
}

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

function openLightbox(src){

    lightboxImage.src = src;

    lightbox.classList.add("active");

}

function closeLightbox(){

    lightbox.classList.remove("active");

}

document
.getElementById("lightboxClose")
.addEventListener("click", closeLightbox);

lightbox.addEventListener("click",(event)=>{

    if(event.target===lightbox){

        closeLightbox();

    }

});

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeLightbox();

    }

});
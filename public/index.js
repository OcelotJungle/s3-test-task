async function submit(evt) {
    evt.preventDefault();

    console.log("Clicked!");

    const formData = new FormData();
    const file = document.getElementById("input").files[0];
    formData.append("file", file);

    const response = await fetch(`/${file.name}?preferredSize=${encodeURIComponent(document.getElementById("size").value)}`, {
        method: "POST",
        body: formData
    });

    const json = await response.text();
    console.log({ json });
}

function init() {
    document.getElementById("form").onsubmit = evt => submit(evt);
}

init();
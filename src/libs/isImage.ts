function isImage(mimetype: string) {
    return mimetype.split("/")[0] === "image";
}

export default isImage;
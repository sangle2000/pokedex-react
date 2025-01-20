const fetchImages = async (path: "shiny" | "default") => {
    const images: Record<string, string> = {};

    // Define the glob pattern based on the path explicitly
    let imageModules: Record<string, () => Promise<any>>;

    if (path === "shiny") {
        imageModules = import.meta.glob(
            `../assets/pokemons/shiny/*.{jpg,jpeg,png,gif,webp}`
        );
    } else if (path === "default") {
        imageModules = import.meta.glob(
            `../assets/pokemons/default/*.{jpg,jpeg,png,gif,webp}`
        );
    } else {
        throw new Error(`Unsupported path: ${path}`);
    }

    // Iterate over the imported modules
    for (const [key, value] of Object.entries(imageModules)) {
        const fileName = key.split('/').pop();  // Extract the filename
        if (fileName) {
            const fileKey = fileName.replace(/\.[^/.]+$/, '');  // Remove the file extension
            const resolvedModule = await value();  // Resolve the module
            images[fileKey] = resolvedModule.default;  // Access the default path
        }
    }

    return images;
};

export const images = await fetchImages("shiny");
export const defaultImages = await fetchImages("default");

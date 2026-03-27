module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("*.css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("poppins");

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }
    };
};
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("*.css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("poppins-font");
    eleventyConfig.addPassthroughCopy("js");

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }
    };
};
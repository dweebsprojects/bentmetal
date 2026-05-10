module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("*.css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("poppins-font");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy(".well-known");
    eleventyConfig.addPassthroughCopy("robots.txt");
    eleventyConfig.addPassthroughCopy("sitemap.xml");

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }
    };
};
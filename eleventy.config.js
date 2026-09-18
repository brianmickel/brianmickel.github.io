const categories = require("./src/_data/categories.json");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy("src/assets");

  // Every entry, newest first. Dates come from front matter and are the
  // date the thing was originally built, not when it was written up.
  eleventyConfig.addCollection("stream", (api) =>
    api.getFilteredByTag("projects").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("byCategory", (items, slug) =>
    items.filter((item) => item.data.category === slug)
  );

  eleventyConfig.addFilter("category", (slug) =>
    categories.find((c) => c.slug === slug)
  );

  // Format in UTC so a front-matter date of 2018-10-08 never renders as the 7th.
  eleventyConfig.addFilter("isoDate", (d) => d.toISOString().slice(0, 10));
  eleventyConfig.addFilter("year", (d) => d.toISOString().slice(0, 4));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
};

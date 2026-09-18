const kinds = require("./src/_data/kinds.json");
// Global data is named topicList, not topics: entries carry their own `topics`
// array, and Eleventy deep-merges same-named keys in the data cascade.
const topics = require("./src/_data/topicList.json");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy("src/assets");

  // Every entry of every kind, newest first. Dates come from front matter
  // and are the date the thing was originally built, not when it was written up.
  eleventyConfig.addCollection("stream", (api) =>
    api.getFilteredByTag("stream").sort((a, b) => b.date - a.date)
  );

  // Kinds are the sections (projects, notes, ...); topics are cross-cutting tags.
  eleventyConfig.addFilter("byKind", (items, kind) =>
    items.filter((item) => item.data.kind === kind)
  );
  eleventyConfig.addFilter("byTopic", (items, slug) =>
    items.filter((item) => (item.data.topics || []).includes(slug))
  );
  eleventyConfig.addFilter("kind", (kind) => kinds.find((k) => k.kind === kind));
  eleventyConfig.addFilter("topic", (slug) => topics.find((t) => t.slug === slug));

  // Format in UTC so a front-matter date of 2018-10-08 never renders as the 7th.
  eleventyConfig.addFilter("isoDate", (d) => d.toISOString().slice(0, 10));
  eleventyConfig.addFilter("year", (d) => d.toISOString().slice(0, 4));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
};

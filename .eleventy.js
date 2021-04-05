module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("CNAME");

  return {
    dir: {
      input: "src",
      output: "_site",
      include: "_includes",
    },
  };
};

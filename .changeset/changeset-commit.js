const defaultCommitFunctions = {
  async getAddMessage(changeset, options) {
    const skipCI = options?.skipCI === "add" || options?.skipCI === true;
    const skipMsg = skipCI ? `\n\n[skip ci]\n` : "";
    return `docs(changeset): ${changeset.summary}${skipMsg}`;
  },
  async getVersionMessage(releasePlan, options) {
    const skipCI = options?.skipCI === "version" || options?.skipCI === true;
    const publishableReleases = releasePlan.releases.filter(
      ({ type }) => type !== "none"
    );
    const numPackagesReleased = publishableReleases.length;

    const releasesLines = publishableReleases
      .map((release) => `  ${release.name}@${release.newVersion}`)
      .join("\n");

    return `release: publish ${numPackagesReleased} package(s)

Releases:
${releasesLines}
${skipCI ? `\n[skip ci]\n` : ""}`;
  },
};

module.exports = defaultCommitFunctions;

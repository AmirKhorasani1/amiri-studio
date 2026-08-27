// Kept as its own tiny module (rather than inlining JSON.stringify at the
// call site) so the export format has one place to evolve later — e.g. if
// we want to version the exported schema.
export const buildConfigJson = (config) => JSON.stringify(config, null, 2);
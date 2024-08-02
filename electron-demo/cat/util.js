const { readdir } = require("fs").promises;

const getDirFileNum = async (dir) => {
  const dirents = await readdir(dir, { withFileTypes: true });
  return dirents.filter((e) => {
    return e.isFile() && e.name.endsWith(".png");
  }).length;
};

module.exports = {
  getDirFileNum,
};

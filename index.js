function startApplication() {
  console.log("Syntra is starting...");
}

if (require.main === module) {
  startApplication();
}

module.exports = {
  startApplication,
};

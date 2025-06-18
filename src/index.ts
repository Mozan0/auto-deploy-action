import * as core from "@actions/core";

(async function run() {
  const apiUrl = core.getInput("apiUrl", { required: true });
  const apiKey = core.getInput("apiKey", { required: true });

  try {
    const response = await fetch(`${apiUrl}/versioncontrol/commands/reset`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        args: ["--hard"],
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      core.setFailed(
        `Request failed: ${response.status} ${
          result.message || result.error || "Unknown error"
        }`
      );
      return;
    }

    core.info(`Successful: ${JSON.stringify(result)}`);
  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message || error}`);
  }
})();

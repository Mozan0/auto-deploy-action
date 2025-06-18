import * as core from "@actions/core";

(async function run() {
  const apiUrl = core.getInput("apiUrl", { required: true });
  const apiKey = core.getInput("apiKey", { required: true });
  const remote = core.getInput("remote", { required: true });
  const branch = core.getInput("branch", { required: true });

  try {
    core.info("Starting to fetch");
    let response = await fetch(`${apiUrl}/versioncontrol/commands/fetch`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        args: [`${remote}`, `${branch}`],
      }),
    });

    let result = await response.json();

    if (!response.ok) {
      core.setFailed(
        `Fetch failed: ${response.status} ${
          result.message || result.error || "Unknown error"
        }`
      );
      return;
    }

    core.info(`Fetch successful: ${JSON.stringify(result)}`);

    core.info("Starting to reset --hard ");
    response = await fetch(`${apiUrl}/versioncontrol/commands/reset`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        args: ["--hard", "origin/main"],
      }),
    });

    result = await response.json();

    if (!response.ok) {
      core.setFailed(
        `Reset failed: ${response.status} ${
          result.message || result.error || "Unknown error"
        }`
      );
      return;
    }

    core.info(`Reset successful: ${JSON.stringify(result)}`);
  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message || error}`);
  }
})();

# Version Control Deploy 🚀

> GitHub Action to trigger deployment on a Spica production instance using version control sync commands.

---

## 🧩 About

This GitHub Action is used to automate deployment of resources from **staging** to **production** in Spica-based projects via version control.  
It replaces manual `curl` commands by providing a configurable and reusable action with minimal setup.

It performs:

1. `fetch <remote> <branch>` to retrieve the latest changes
2. `reset --hard origin/main` to apply the changes, avoiding conflicts

This flow ensures a clean synchronization with production, ideal for CI pipelines that auto-deploy after merges to `main`.

---

## 📦 Usage

### Example Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Trigger Production Sync
        uses: Mozan0/auto-deploy-action@v0.1.0
        with:
          apiUrl: https://prod-instance.spicaengine.com/api
          apiKey: ${{ secrets.SPICA_API_KEY }}
          remote: origin
          branch: main
```

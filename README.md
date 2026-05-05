# Playwright Automation Framework

A TypeScript-based test automation framework using [Playwright](https://playwright.dev/), supporting both end-to-end (E2E) browser testing and API testing with a shared configuration and environment-driven setup.

---

## Features

- **E2E Testing** — browser automation against Desktop Chrome via Playwright
- **API Testing** — HTTP request testing with typed assertions using Playwright's request context
- **TypeScript** — strict-mode TypeScript for full type safety across all test code
- **Environment Config** — `.env`-driven base URLs and secrets via `dotenv`
- **CI-Ready** — automatic retry logic, single-worker mode, and `forbidOnly` enforcement on CI
- **Rich Reporting** — HTML report + console list output on every run
- **Failure Artifacts** — screenshots, traces, and videos captured on failure/retry

---

## Project Structure

```
playwright-automation-framework/
├── tests/
│   ├── e2e/          # Browser-based end-to-end tests
│   └── api/          # API integration tests
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

**Planned path aliases** (configured in `tsconfig.json`, ready to use as the project grows):

| Alias | Directory |
|-------|-----------|
| `@pages/*` | `pages/*` — Page Object Models |
| `@api/*` | `api/*` — API client helpers |
| `@fixtures/*` | `fixtures/*` — Custom Playwright fixtures |
| `@utils/*` | `utils/*` — Shared utilities |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

---

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/MikeyC95/playwright-automation-framework.git
cd playwright-automation-framework
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install --with-deps chromium
```

**4. Configure environment variables**

Create a `.env` file in the project root:

```env
BASE_URL=https://your-app-url.com
API_BASE_URL=https://your-api-url.com
```

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://example.com` | Base URL for E2E browser tests |
| `API_BASE_URL` | `https://jsonplaceholder.typicode.com` | Base URL for API tests |

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (E2E + API) |
| `npm run test:e2e` | Run E2E tests only |
| `npm run test:api` | Run API tests only |
| `npm run test:headed` | Run E2E tests in headed (visible) browser mode |
| `npm run test:debug` | Run tests in Playwright debug/inspector mode |
| `npm run report` | Open the last HTML report |

---

## Test Projects

### E2E (`tests/e2e/**/*.spec.ts`)

Browser tests run against Desktop Chrome. The `BASE_URL` environment variable controls the target application. Screenshots, traces, and video are captured automatically on failure or retry.

### API (`tests/api/**/*.spec.ts`)

HTTP request tests using Playwright's built-in `request` fixture. The `API_BASE_URL` environment variable controls the target. All requests include `Accept: application/json` and `Content-Type: application/json` headers by default.

---

## CI Behavior

When the `CI` environment variable is set (e.g., in GitHub Actions):

- `forbidOnly` is enabled — `test.only` will fail the run
- Retries are set to **2** per failing test
- Workers are set to **1** (sequential execution)

Example GitHub Actions step:

```yaml
- name: Run Playwright tests
  run: npm test
  env:
    CI: true
    BASE_URL: ${{ secrets.BASE_URL }}
    API_BASE_URL: ${{ secrets.API_BASE_URL }}
```

---

## Reporting

After a test run, open the HTML report:

```bash
npm run report
```

The report includes test results, failure screenshots, traces, and video recordings.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.49.0 | Test runner, browser automation, request testing |
| `typescript` | ^5.7.0 | TypeScript compiler |
| `@types/node` | ^22.0.0 | Node.js type definitions |
| `dotenv` | ^16.4.0 | Environment variable loading |

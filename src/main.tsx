import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app/App"
import { scenarios } from "./data/scenarios"
import { validateScenario } from "./engine/validateScenario"
import "./styles/globals.css"

for (const scenario of Object.values(scenarios)) {
  const errors = validateScenario(scenario, scenarios)
  if (errors.length > 0) throw new Error(`Scenario validation failed for ${scenario.id}:\n${errors.join("\n")}`)
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>)

import { useMemo, useState } from "react";
import type { AlgorithmType, CodeLanguage } from "./types/Algorithm";
import type { SimulationSpeed } from "./types/Simulation";

import Header from "./components/Dashboard/Header";
import Sidebar from "./components/Dashboard/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

import { useOrders } from "./hooks/useOrders";
import { useSimulation } from "./hooks/useSimulation";

import { getAlgorithmInfo } from "./types/Algorithm";

function App() {
  const {
    orders,
    resetOrders,
  } = useOrders();

  const {
    algorithm,
    speed,
    status,
    orders: simulationOrders,
    currentStep,
    steps,
    metrics,
    setAlgorithm,
    setSpeed,
    start,
    pause,
    resume,
    stop,
    reset,
    nextStep,
    previousStep,
  } = useSimulation();

  const [activeItem, setActiveItem] = useState("simulation");
  const [language, setLanguage] = useState<CodeLanguage>("CPP");

  const algorithmInfo = useMemo(
    () => getAlgorithmInfo(algorithm),
    [algorithm],
  );

  const currentCodeLine = useMemo(() => {
    const currentSimulationStep = steps[currentStep - 1];

    return currentSimulationStep?.codeLine;
  }, [steps, currentStep]);

  const handleAlgorithmChange = (newAlgorithm: AlgorithmType) => {
    setAlgorithm(newAlgorithm);
  };

  const handleSpeedChange = (newSpeed: SimulationSpeed) => {
    setSpeed(newSpeed);
  };

  const handleReset = () => {
    reset();
  };

  const handleGenerateNewOrders = () => {
    resetOrders();
    reset();
  };

  return (
    <div className="app">
      <Sidebar
        activeItem={activeItem}
        onItemChange={setActiveItem}
      />

      <div className="dashboard-main-layout">
        <div className="dashboard-main-content">
          <Header
            title="Simulador de Ordenamiento de Pedidos"
            subtitle="Visualiza y analiza algoritmos de ordenamiento paso a paso."
            algorithmName={algorithmInfo.name}
            status={status}
          />

          <main className="dashboard">
            <div className="dashboard-container">
              <Dashboard
                orders={simulationOrders}
                algorithm={algorithm}
                onAlgorithmChange={handleAlgorithmChange}
                speed={speed}
                onSpeedChange={handleSpeedChange}
                status={status}
                currentStep={currentStep}
                totalSteps={steps.length}
                onStart={start}
                onPause={pause}
                onResume={resume}
                onStop={stop}
                onReset={handleReset}
                onNextStep={nextStep}
                onPreviousStep={previousStep}
                language={language}
                onLanguageChange={setLanguage}
                currentCodeLine={currentCodeLine}
                comparisons={metrics.comparisons}
                swaps={metrics.swaps}
                executionTime={metrics.executionTime}
              />

              {activeItem === "orders" && (
                <div className="dashboard-extra-section">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handleGenerateNewOrders}
                  >
                    Generar nuevos pedidos
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
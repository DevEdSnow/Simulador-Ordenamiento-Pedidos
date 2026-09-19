import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  AlgorithmType,
} from "../types/Algorithm";

import type {
  Order,
} from "../types/Order";

import type {
  Simulation,
  SimulationMetrics,
  SimulationSpeed,
  SimulationStatus,
  SimulationStep,
} from "../types/Simulation";

import {
  initialSimulationMetrics,
} from "../types/Simulation";

import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";
import { heapSort } from "../algorithms/heapSort";
import { shellSort } from "../algorithms/shellSort";

export interface UseSimulationOptions {
  orders: Order[];
  algorithm?: AlgorithmType;
  speed?: SimulationSpeed;
}

export interface UseSimulationReturn {
  simulation: Simulation;

  status: SimulationStatus;
  algorithm: AlgorithmType;
  speed: SimulationSpeed;

  currentStep: number;
  totalSteps: number;
  progress: number;

  orders: Order[];
  originalOrders: Order[];

  steps: SimulationStep[];
  currentSimulationStep:
    | SimulationStep
    | undefined;

  metrics: SimulationMetrics;

  start: () => void;
  pause: () => void;
  resume: () => void;
  togglePause: () => void;
  stop: () => void;
  reset: () => void;

  setAlgorithm: (
    algorithm: AlgorithmType
  ) => void;

  setSpeed: (
    speed: SimulationSpeed
  ) => void;

  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;

  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
}

function executeAlgorithm(
  algorithm: AlgorithmType,
  orders: Order[]
) {
  switch (algorithm) {
    case "BUBBLE_SORT":
      return bubbleSort(orders);

    case "SELECTION_SORT":
      return selectionSort(orders);

    case "INSERTION_SORT":
      return insertionSort(orders);

    case "MERGE_SORT":
      return mergeSort(orders);

    case "QUICK_SORT":
      return quickSort(orders);

    case "HEAP_SORT":
      return heapSort(orders);

    case "SHELL_SORT":
      return shellSort(orders);

    default:
      return bubbleSort(orders);
  }
}

export function useSimulation(
  options: UseSimulationOptions
): UseSimulationReturn {
  const {
    orders,
    algorithm: initialAlgorithm = "BUBBLE_SORT",
    speed: initialSpeed = 500,
  } = options;

  const [algorithm, setAlgorithmState] =
    useState<AlgorithmType>(
      initialAlgorithm
    );

  const [speed, setSpeedState] =
    useState<SimulationSpeed>(
      initialSpeed
    );

  const [status, setStatus] =
    useState<SimulationStatus>("IDLE");

  const [originalOrders, setOriginalOrders] =
    useState<Order[]>(() =>
      orders.map((order) => ({
        ...order,
      }))
    );

  const [simulationOrders, setSimulationOrders] =
    useState<Order[]>(() =>
      orders.map((order) => ({
        ...order,
      }))
    );

  const [steps, setSteps] =
    useState<SimulationStep[]>([]);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [metrics, setMetrics] =
    useState<SimulationMetrics>({
      ...initialSimulationMetrics,
      elements: orders.length,
    });

  const timerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const ordersRef =
    useRef<Order[]>(orders);

  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const generateSimulation = useCallback(
    (
      selectedAlgorithm: AlgorithmType,
      sourceOrders: Order[]
    ) => {
      const cleanOrders = sourceOrders.map(
        (order) => ({
          ...order,
          comparando: false,
          intercambiando: false,
          ordenado: false,
        })
      );

      const result = executeAlgorithm(
        selectedAlgorithm,
        cleanOrders
      );

      return result;
    },
    []
  );

  const prepareSimulation = useCallback(
    (
      selectedAlgorithm: AlgorithmType,
      sourceOrders: Order[]
    ) => {
      const cleanOrders = sourceOrders.map(
        (order) => ({
          ...order,
          comparando: false,
          intercambiando: false,
          ordenado: false,
        })
      );

      const result = generateSimulation(
        selectedAlgorithm,
        cleanOrders
      );

      setOriginalOrders(
        cleanOrders.map((order) => ({
          ...order,
        }))
      );

      setSimulationOrders(
        cleanOrders.map((order) => ({
          ...order,
        }))
      );

      setSteps(result.steps);

      setCurrentStep(0);

      setMetrics({
        comparisons: result.comparisons,
        swaps: result.swaps,
        steps: result.steps.length,
        executionTime: 0,
        elements: cleanOrders.length,
      });

      setStatus("IDLE");
    },
    [generateSimulation]
  );

  useEffect(() => {
    prepareSimulation(
      initialAlgorithm,
      ordersRef.current
    );

    return () => {
      clearTimer();
    };
  }, [
    initialAlgorithm,
    clearTimer,
    prepareSimulation,
  ]);

  const applyStep = useCallback(
    (stepIndex: number) => {
      if (
        stepIndex < 0 ||
        stepIndex >= steps.length
      ) {
        return;
      }

      const step = steps[stepIndex];

      setSimulationOrders(
        step.orders.map((order) => ({
          ...order,
        }))
      );

      setCurrentStep(stepIndex + 1);
    },
    [steps]
  );

  const start = useCallback(() => {
    clearTimer();

    if (originalOrders.length === 0) {
      return;
    }

    const result = generateSimulation(
      algorithm,
      originalOrders
    );

    setSteps(result.steps);

    setCurrentStep(0);

    setSimulationOrders(
      originalOrders.map((order) => ({
        ...order,
        comparando: false,
        intercambiando: false,
        ordenado: false,
      }))
    );

    setMetrics({
      comparisons: result.comparisons,
      swaps: result.swaps,
      steps: result.steps.length,
      executionTime: 0,
      elements: originalOrders.length,
    });

    setStatus("RUNNING");
  }, [
    algorithm,
    clearTimer,
    generateSimulation,
    originalOrders,
  ]);

  const pause = useCallback(() => {
    clearTimer();

    setStatus((currentStatus) =>
      currentStatus === "RUNNING"
        ? "PAUSED"
        : currentStatus
    );
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (currentStep >= steps.length) {
      return;
    }

    setStatus("RUNNING");
  }, [currentStep, steps.length]);

  const togglePause = useCallback(() => {
    if (status === "RUNNING") {
      pause();
      return;
    }

    if (status === "PAUSED") {
      resume();
    }
  }, [pause, resume, status]);

  const stop = useCallback(() => {
    clearTimer();

    setStatus("IDLE");

    setCurrentStep(0);

    setSimulationOrders(
      originalOrders.map((order) => ({
        ...order,
        comparando: false,
        intercambiando: false,
        ordenado: false,
      }))
    );
  }, [clearTimer, originalOrders]);

  const reset = useCallback(() => {
    clearTimer();

    const currentOrders =
      ordersRef.current.map((order) => ({
        ...order,
        comparando: false,
        intercambiando: false,
        ordenado: false,
      }));

    setOriginalOrders(currentOrders);

    setSimulationOrders(currentOrders);

    setSteps([]);

    setCurrentStep(0);

    setMetrics({
      ...initialSimulationMetrics,
      elements: currentOrders.length,
    });

    setStatus("IDLE");
  }, [clearTimer]);

  const setAlgorithm = useCallback(
    (newAlgorithm: AlgorithmType) => {
      clearTimer();

      setAlgorithmState(newAlgorithm);

      const currentOrders =
        ordersRef.current.map((order) => ({
          ...order,
          comparando: false,
          intercambiando: false,
          ordenado: false,
        }));

      const result = generateSimulation(
        newAlgorithm,
        currentOrders
      );

      setOriginalOrders(currentOrders);

      setSimulationOrders(currentOrders);

      setSteps(result.steps);

      setCurrentStep(0);

      setMetrics({
        comparisons: result.comparisons,
        swaps: result.swaps,
        steps: result.steps.length,
        executionTime: 0,
        elements: currentOrders.length,
      });

      setStatus("IDLE");
    },
    [clearTimer, generateSimulation]
  );

  const setSpeed = useCallback(
    (newSpeed: SimulationSpeed) => {
      setSpeedState(newSpeed);
    },
    []
  );

  const nextStep = useCallback(() => {
    clearTimer();

    if (steps.length === 0) {
      return;
    }

    if (currentStep >= steps.length) {
      setStatus("COMPLETED");
      return;
    }

    applyStep(currentStep);

    if (currentStep + 1 >= steps.length) {
      setStatus("COMPLETED");
    }
  }, [
    applyStep,
    clearTimer,
    currentStep,
    steps.length,
  ]);

  const previousStep = useCallback(() => {
    clearTimer();

    if (steps.length === 0) {
      return;
    }

    if (currentStep <= 1) {
      setSimulationOrders(
        originalOrders.map((order) => ({
          ...order,
          comparando: false,
          intercambiando: false,
          ordenado: false,
        }))
      );

      setCurrentStep(0);
      setStatus("PAUSED");

      return;
    }

    const previousIndex =
      currentStep - 2;

    applyStep(previousIndex);

    setStatus("PAUSED");
  }, [
    applyStep,
    clearTimer,
    currentStep,
    originalOrders,
    steps.length,
  ]);

  const goToStep = useCallback(
    (step: number) => {
      clearTimer();

      if (steps.length === 0) {
        return;
      }

      const targetStep = Math.max(
        0,
        Math.min(step, steps.length)
      );

      if (targetStep === 0) {
        setSimulationOrders(
          originalOrders.map((order) => ({
            ...order,
            comparando: false,
            intercambiando: false,
            ordenado: false,
          }))
        );

        setCurrentStep(0);
        setStatus("PAUSED");

        return;
      }

      applyStep(targetStep - 1);

      if (targetStep >= steps.length) {
        setStatus("COMPLETED");
      } else {
        setStatus("PAUSED");
      }
    },
    [
      applyStep,
      clearTimer,
      originalOrders,
      steps.length,
    ]
  );

  useEffect(() => {
    if (status !== "RUNNING") {
      clearTimer();
      return;
    }

    if (currentStep >= steps.length) {
      clearTimer();
      setStatus("COMPLETED");
      return;
    }

    timerRef.current = setTimeout(() => {
      applyStep(currentStep);

      if (currentStep + 1 >= steps.length) {
        setStatus("COMPLETED");
      }
    }, speed);

    return () => {
      clearTimer();
    };
  }, [
    applyStep,
    clearTimer,
    currentStep,
    speed,
    status,
    steps.length,
  ]);

  const orderCount = simulationOrders.length;

  const progress =
    steps.length === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (currentStep / steps.length) * 100
          )
        );

  const currentSimulationStep =
    currentStep > 0
      ? steps[currentStep - 1]
      : undefined;

  const simulation: Simulation = {
    status,
    speed,
    algorithm,
    originalOrders,
    orders: simulationOrders,
    steps,
    currentStep,
    metrics,
  };

  return {
    simulation,

    status,
    algorithm,
    speed,

    currentStep,
    totalSteps: steps.length,
    progress,

    orders: simulationOrders,
    originalOrders,

    steps,
    currentSimulationStep,

    metrics,

    start,
    pause,
    resume,
    togglePause,
    stop,
    reset,

    setAlgorithm,
    setSpeed,

    nextStep,
    previousStep,
    goToStep,

    isRunning: status === "RUNNING",
    isPaused: status === "PAUSED",
    isCompleted: status === "COMPLETED",
  };
}

export default useSimulation;
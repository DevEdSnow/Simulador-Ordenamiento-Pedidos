import { useCallback, useMemo, useState } from "react";

import type {
  EstadoPedido,
  Order,
  PrioridadPedido,
} from "../types/Order";

import {
  getInitialOrders,
  getOrdersByPriority,
  getOrdersByStatus,
} from "../data/orders";

import {
  generateOrder,
  generateOrders,
  generateRandomOrders,
} from "../utils/generateOrders";

/**
 * Opciones disponibles para el hook de pedidos.
 */
export interface UseOrdersOptions {
  initialOrders?: Order[];
}

/**
 * Funciones y estado expuestos por useOrders.
 */
export interface UseOrdersReturn {
  orders: Order[];
  orderCount: number;
  totalValue: number;
  totalProducts: number;

  addOrder: (order?: Order) => void;
  addOrders: (count: number) => void;

  removeOrder: (id: number) => void;
  removeOrders: (ids: number[]) => void;

  updateOrder: (
    id: number,
    changes: Partial<Order>
  ) => void;

  setOrders: (orders: Order[]) => void;

  resetOrders: () => void;
  generateNewOrders: (count: number) => void;
  generateRandomOrderSet: (
    min?: number,
    max?: number
  ) => void;

  clearOrders: () => void;

  getOrderById: (id: number) => Order | undefined;
  getOrdersByPriority: (
    priority: PrioridadPedido
  ) => Order[];
  getOrdersByStatus: (
    status: EstadoPedido
  ) => Order[];
}

/**
 * Hook para administrar los pedidos del simulador.
 *
 * Centraliza todas las operaciones relacionadas
 * con los pedidos utilizados por la aplicación.
 *
 * @param options - Configuración inicial opcional.
 * @returns Estado y operaciones de los pedidos.
 */
export function useOrders(
  options: UseOrdersOptions = {}
): UseOrdersReturn {
  const initialOrders = options.initialOrders
    ? options.initialOrders.map((order) => ({
        ...order,
      }))
    : getInitialOrders();

  const [orders, setOrdersState] =
    useState<Order[]>(initialOrders);

  /**
   * Agrega un pedido individual.
   *
   * Si no se proporciona un pedido,
   * genera uno automáticamente.
   */
  const addOrder = useCallback(
    (order?: Order) => {
      const newOrder =
        order ?? generateOrder(orders.length + 1);

      setOrdersState((currentOrders) => [
        ...currentOrders,
        {
          ...newOrder,
          comparando: false,
          intercambiando: false,
          ordenado: false,
        },
      ]);
    },
    [orders.length]
  );

  /**
   * Agrega múltiples pedidos generados
   * automáticamente.
   */
  const addOrders = useCallback(
    (count: number) => {
      if (
        !Number.isFinite(count) ||
        count <= 0
      ) {
        return;
      }

      const total = Math.floor(count);

      setOrdersState((currentOrders) => {
        const newOrders = generateOrders(total);

        return [
          ...currentOrders,
          ...newOrders.map((order) => ({
            ...order,
            comparando: false,
            intercambiando: false,
            ordenado: false,
          })),
        ];
      });
    },
    []
  );

  /**
   * Elimina un pedido mediante su ID.
   */
  const removeOrder = useCallback((id: number) => {
    setOrdersState((currentOrders) =>
      currentOrders.filter(
        (order) => order.id !== id
      )
    );
  }, []);

  /**
   * Elimina varios pedidos mediante sus IDs.
   */
  const removeOrders = useCallback((ids: number[]) => {
    if (ids.length === 0) {
      return;
    }

    const idsSet = new Set(ids);

    setOrdersState((currentOrders) =>
      currentOrders.filter(
        (order) => !idsSet.has(order.id)
      )
    );
  }, []);

  /**
   * Actualiza parcialmente un pedido.
   */
  const updateOrder = useCallback(
    (id: number, changes: Partial<Order>) => {
      setOrdersState((currentOrders) =>
        currentOrders.map((order) =>
          order.id === id
            ? {
                ...order,
                ...changes,
              }
            : order
        )
      );
    },
    []
  );

  /**
   * Reemplaza todos los pedidos actuales.
   */
  const setOrders = useCallback((newOrders: Order[]) => {
    setOrdersState(
      newOrders.map((order) => ({
        ...order,
      }))
    );
  }, []);

  /**
   * Restaura los pedidos iniciales.
   */
  const resetOrders = useCallback(() => {
    setOrdersState(getInitialOrders());
  }, []);

  /**
   * Genera una nueva lista de pedidos.
   */
  const generateNewOrders = useCallback(
    (count: number) => {
      if (
        !Number.isFinite(count) ||
        count <= 0
      ) {
        return;
      }

      setOrdersState(
        generateOrders(Math.floor(count))
      );
    },
    []
  );

  /**
   * Genera una cantidad aleatoria de pedidos
   * dentro de un rango.
   */
  const generateRandomOrderSet = useCallback(
    (min = 5, max = 20) => {
      setOrdersState(
        generateRandomOrders(min, max)
      );
    },
    []
  );

  /**
   * Elimina todos los pedidos.
   */
  const clearOrders = useCallback(() => {
    setOrdersState([]);
  }, []);

  /**
   * Busca un pedido por ID.
   */
  const getOrderById = useCallback(
    (id: number): Order | undefined => {
      return orders.find(
        (order) => order.id === id
      );
    },
    [orders]
  );

  /**
   * Filtra los pedidos por prioridad.
   */
  const filterOrdersByPriority = useCallback(
    (priority: PrioridadPedido): Order[] => {
      return getOrdersByPriority(priority).filter(
        (initialOrder) =>
          orders.some(
            (order) =>
              order.id === initialOrder.id
          )
      );
    },
    [orders]
  );

  /**
   * Filtra los pedidos por estado.
   */
  const filterOrdersByStatus = useCallback(
    (status: EstadoPedido): Order[] => {
      return getOrdersByStatus(status).filter(
        (initialOrder) =>
          orders.some(
            (order) =>
              order.id === initialOrder.id
          )
      );
    },
    [orders]
  );

  /**
   * Cantidad actual de pedidos.
   */
  const orderCount = orders.length;

  /**
   * Valor total de los pedidos.
   */
  const totalValue = useMemo(
    () =>
      orders.reduce(
        (total, order) => total + order.valor,
        0
      ),
    [orders]
  );

  /**
   * Cantidad total de productos.
   */
  const totalProducts = useMemo(
    () =>
      orders.reduce(
        (total, order) => total + order.cantidad,
        0
      ),
    [orders]
  );

  return {
    orders,
    orderCount,
    totalValue,
    totalProducts,

    addOrder,
    addOrders,

    removeOrder,
    removeOrders,

    updateOrder,

    setOrders,

    resetOrders,
    generateNewOrders,
    generateRandomOrderSet,

    clearOrders,

    getOrderById,
    getOrdersByPriority:
      filterOrdersByPriority,
    getOrdersByStatus:
      filterOrdersByStatus,
  };
}

export default useOrders;
"use client";

import * as React from "react";

/* ---------------------------------- Types --------------------------------- */

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
};

type State = {
  toasts: Toast[];
};

type Action =
  | { type: "ADD"; toast: Toast }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" };

/* ---------------------------------- Store --------------------------------- */

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { toasts: [action.toast, ...state.toasts].slice(0, 3) };

    case "REMOVE":
      return { toasts: state.toasts.filter(t => t.id !== action.id) };

    case "CLEAR":
      return { toasts: [] };

    default:
      return state;
  }
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach(l => l(memoryState));
}

/* ---------------------------------- API ---------------------------------- */

function generateId() {
  return Math.random().toString(36).slice(2);
}

export function toast(props: Omit<Toast, "id">) {
  const id = generateId();

  dispatch({
    type: "ADD",
    toast: { id, ...props },
  });

  if (props.duration !== 0) {
    setTimeout(() => {
      dispatch({ type: "REMOVE", id });
    }, props.duration ?? 4000);
  }

  return {
    id,
    dismiss: () => dispatch({ type: "REMOVE", id }),
  };
}

/* ---------------------------------- Hook ---------------------------------- */

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const i = listeners.indexOf(setState);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: (id: string) => dispatch({ type: "REMOVE", id }),
    clear: () => dispatch({ type: "CLEAR" }),
  };
}
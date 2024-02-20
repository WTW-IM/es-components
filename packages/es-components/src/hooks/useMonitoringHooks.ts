import React, { useEffect, useRef, useCallback } from 'react';

type MonitoringEffectCallback<T> = (
  monitor: T
) => ReturnType<React.EffectCallback>;

export function useMonitoringEffect<T>(
  effect: MonitoringEffectCallback<T>,
  monitor: T
): void;
export function useMonitoringEffect<T>(
  effect: MonitoringEffectCallback<T>,
  deps: React.DependencyList,
  monitor: T
): void;
export function useMonitoringEffect<T>(
  ...args:
    | [MonitoringEffectCallback<T>, T]
    | [MonitoringEffectCallback<T>, React.DependencyList, T]
): void {
  const [effect, depsOrMonitor, monitor] = args;
  const depsIncluded = args.length === 3;
  const deps = depsIncluded
    ? (depsOrMonitor as React.DependencyList)
    : undefined;
  const monitorValue = depsIncluded ? (monitor as T) : (depsOrMonitor as T);

  const monitorRef = useRef(monitorValue);
  monitorRef.current = monitorValue;

  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    return effectRef.current(monitorRef.current);
  }, deps || []); // eslint-disable-line react-hooks/exhaustive-deps
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyMonitoringCallback<T> = (...args: [T, ...any]) => any;

type MonitoringCallbackArgs<MonitorT extends AnyMonitoringCallback<any>> =
  MonitorT extends (arg1: infer T, ...args: infer Args) => any
    ? [...Args]
    : never;

type MonitoringCallback<MonitorT extends AnyMonitoringCallback<any>> = (
  ...args: MonitoringCallbackArgs<MonitorT>
) => ReturnType<MonitorT>;
/* eslint-enable @typescript-eslint/no-explicit-any */

export function useMonitoringCallback<
  MonitorT extends AnyMonitoringCallback<MonitoredT>,
  MonitoredT
>(callback: MonitorT, monitor: MonitoredT): MonitoringCallback<MonitorT>;
export function useMonitoringCallback<
  MonitorT extends AnyMonitoringCallback<MonitoredT>,
  MonitoredT
>(
  callback: MonitorT,
  deps: React.DependencyList,
  monitor: MonitoredT
): MonitoringCallback<MonitorT>;
export function useMonitoringCallback<
  MonitorT extends AnyMonitoringCallback<MonitoredT>,
  MonitoredT
>(
  ...args: [MonitorT, MonitoredT] | [MonitorT, React.DependencyList, MonitoredT]
): MonitoringCallback<MonitorT> {
  const [callback, depsOrMonitor, monitor] = args;
  const depsIncluded = args.length === 3;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const deps = depsIncluded ? (depsOrMonitor as React.DependencyList) : [];
  const monitorValue: MonitoredT = depsIncluded
    ? (monitor as MonitoredT)
    : (depsOrMonitor as MonitoredT);
  const monitorRef = useRef(monitorValue);
  monitorRef.current = monitorValue;

  /* eslint-disable react-hooks/exhaustive-deps */
  const monitoredCallback = useCallback<MonitoringCallback<MonitorT>>(
    (...args) => {
      const result = callbackRef.current(
        monitorRef.current,
        ...args
      ) as ReturnType<MonitorT>;
      // eslint seems to think this is unsafe, but it's not
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    },
    deps
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  return monitoredCallback;
}

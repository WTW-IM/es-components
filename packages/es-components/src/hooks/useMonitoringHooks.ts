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
type SomeMonitoringCallback<T> = (...args: [T, ...any]) => any;

type MonitoringCallback<
  MonitorT extends SomeMonitoringCallback<MonitoredT>,
  MonitoredT
> = MonitorT extends (...args: [MonitoredT, ...infer Args]) => infer R
  ? (...args: Args) => R
  : never;
/* eslint-enable @typescript-eslint/no-explicit-any */

export function useMonitoringCallback<
  MonitorT extends SomeMonitoringCallback<MonitoredT>,
  MonitoredT
>(
  callback: MonitorT,
  monitor: MonitoredT
): MonitoringCallback<MonitorT, MonitoredT>;
export function useMonitoringCallback<
  MonitorT extends SomeMonitoringCallback<MonitoredT>,
  MonitoredT
>(
  callback: MonitorT,
  deps: React.DependencyList,
  monitor: MonitoredT
): MonitoringCallback<MonitorT, MonitoredT>;
export function useMonitoringCallback<
  MonitorT extends SomeMonitoringCallback<MonitoredT>,
  MonitoredT
>(
  ...args: [MonitorT, MonitoredT] | [MonitorT, React.DependencyList, MonitoredT]
): MonitoringCallback<MonitorT, MonitoredT> {
  type ReturnCallback = MonitoringCallback<MonitorT, MonitoredT>;
  const [callback, depsOrMonitor, monitor] = args;
  const depsIncluded = args.length === 3;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const deps = (depsIncluded ? depsOrMonitor : []) as React.DependencyList;
  const monitorValue = (depsIncluded ? monitor : depsOrMonitor) as MonitoredT;
  const monitorRef = useRef(monitorValue);
  monitorRef.current = monitorValue;

  /* eslint-disable @typescript-eslint/no-unsafe-return,react-hooks/exhaustive-deps */
  const monitoredCallback = useCallback<ReturnCallback>(
    ((...args: Parameters<ReturnCallback>) =>
      callbackRef.current(
        monitorRef.current,
        ...args
      ) as ReturnType<ReturnCallback>) as ReturnCallback,
    deps
  );
  /* eslint-enable @typescript-eslint/no-unsafe-return,react-hooks/exhaustive-deps */

  return monitoredCallback;
}

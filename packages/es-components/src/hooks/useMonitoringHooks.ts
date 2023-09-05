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
  useEffect(() => {
    return effect(monitorRef.current);
  }, deps || []); // eslint-disable-line react-hooks/exhaustive-deps
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyArray = any[];
/* eslint-enable @typescript-eslint/no-explicit-any */

type MonitoringCallback<T, O extends AnyArray, R> = (
  monitor: T,
  ...others: O
) => R;

type MonitoredCallback<O extends AnyArray, R> = (...args: O) => R;

export function useMonitoringCallback<T, O extends AnyArray, R>(
  callback: MonitoringCallback<T, O, R>,
  monitor: T
): MonitoredCallback<O, R>;
export function useMonitoringCallback<T, O extends AnyArray, R>(
  callback: MonitoringCallback<T, O, R>,
  deps: React.DependencyList,
  monitor: T
): MonitoredCallback<O, R>;
export function useMonitoringCallback<T, O extends AnyArray, R>(
  ...args:
    | [MonitoringCallback<T, O, R>, T]
    | [MonitoringCallback<T, O, R>, React.DependencyList, T]
): MonitoredCallback<O, R> {
  const [callback, depsOrMonitor, monitor] = args;
  const depsIncluded = args.length === 3;

  const deps = depsIncluded ? (depsOrMonitor as React.DependencyList) : [];
  const monitorValue = depsIncluded ? (monitor as T) : (depsOrMonitor as T);
  const monitorRef = useRef(monitorValue);
  monitorRef.current = monitorValue;

  const monitoredCallback = useCallback((...args: O) => {
    return callback(monitorRef.current, ...args);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return monitoredCallback;
}

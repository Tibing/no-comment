import { InjectionToken, Provider } from '@angular/core';
import { Location } from '@angular/common';

export const LocationSelector = new InjectionToken('');
export type Selector = () => string;

export const defaultIdSelectorProvider: Provider = {
  provide: LocationSelector,
  useFactory: (location: Location) => {
    return () => {
      return location.path(false);
    };
  },
  deps: [Location],
};

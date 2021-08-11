import { createFeatureSelector } from '@ngrx/store';
import { featureKey, IState } from '../reducers';

export const selectFeature = createFeatureSelector<IState>(featureKey);

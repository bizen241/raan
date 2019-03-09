import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import { ApiActions, apiReducer, ApiState } from "./api";
import { AppActions, appReducer, AppState } from "./app";
import { BuffersActions, buffersReducer, BuffersState } from "./buffers";
import { CacheActions, cacheReducer, CacheState } from "./cache";
import { ConfigActions, configReducer, ConfigState } from "./config";
import { PlayerActions, playerReducer, PlayerState } from "./player";

export interface RootState {
  api: ApiState;
  app: AppState;
  buffers: BuffersState;
  cache: CacheState;
  config: ConfigState;
  player: PlayerState;
  router: RouterState;
}

export const createReducer = (history: History) =>
  combineReducers({
    api: apiReducer,
    app: appReducer,
    buffers: buffersReducer,
    cache: cacheReducer,
    config: configReducer,
    player: playerReducer,
    router: connectRouter(history)
  });

export type Actions =
  | ApiActions
  | AppActions
  | BuffersActions
  | CacheActions
  | ConfigActions
  | PlayerActions
  | RouterAction;

export const connector = <OwnProps extends {}, SelectedState extends {}, SelectedActions extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => SelectedState,
  actionSelector: () => SelectedActions,
  component: ComponentType<SelectedState & SelectedActions>
) =>
  connect(
    stateSelector,
    actionSelector()
  )(React.memo(component) as any);

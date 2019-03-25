import { LOCATION_CHANGE } from "connected-react-router";
import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToEmptyObject, EntityObject, EntityType, EntityTypeToObject } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import * as api from "../api/client";
import { stringifySearchParams } from "../api/request/search";
import { buffersActions } from "./buffers";
import { cacheActions } from "./cache";

export enum ApiActionType {
  Request = "api/request",
  Success = "api/success",
  Failure = "api/failure",
  Reset = "api/reset"
}

type Key<E extends EntityObject> = string | SearchParams<E>;

export const apiSyncActions = {
  request: <E extends EntityObject>(method: keyof ApiState, type: EntityType, key: Key<E>) =>
    createAction(ApiActionType.Request, { method, type, key }),
  success: <E extends EntityObject>(method: keyof ApiState, type: EntityType, key: Key<E>) =>
    createAction(ApiActionType.Success, { method, type, key }),
  failure: <E extends EntityObject>(method: keyof ApiState, type: EntityType, key: Key<E>, code: number) =>
    createAction(ApiActionType.Failure, { method, type, key, code }),
  reset: <E extends EntityObject>(method: keyof ApiState, type: EntityType, key: Key<E>) =>
    createAction(ApiActionType.Reset, { method, type, key })
};

export type ApiActions = ActionUnion<typeof apiSyncActions>;

const getEntity = (type: EntityType, id: string): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.request("get", type, id));

  try {
    const result = await api.getEntity(type, id);

    dispatch(cacheActions.get(result));
    dispatch(apiSyncActions.success("get", type, id));
  } catch (e) {
    dispatch(apiSyncActions.failure("get", type, id, 404));
  }
};

const searchEntity = <E extends EntityObject>(
  type: EntityType,
  params: SearchParams<E>
): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.request("search", type, params));

  try {
    const result = await api.searchEntity(type, params);

    dispatch(cacheActions.search(type, params, result));
    dispatch(apiSyncActions.success("search", type, params));
  } catch (e) {
    dispatch(apiSyncActions.failure("search", type, params, 404));
  }
};

export const isLocalOnly = (id: string) => !isNaN(Number(id));

const uploadEntity = (type: EntityType, id: string): AsyncAction => async (dispatch, getState) => {
  const buffer = getState().buffers[type][id];
  if (buffer === undefined) {
    return;
  }

  dispatch(apiSyncActions.request("upload", type, id));

  try {
    const result = isLocalOnly(id)
      ? await api.createEntity(type, buffer.edited)
      : await api.updateEntity(type, id, buffer.edited);

    dispatch(cacheActions.get(result));
    dispatch(apiSyncActions.success("upload", type, id));
    dispatch(buffersActions.delete(type, id));
  } catch (e) {
    dispatch(apiSyncActions.failure("upload", type, id, 404));
  }
};

const deleteEntity = (type: EntityType, id: string): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.request("delete", type, id));

  try {
    await deleteEntity(type, id);

    dispatch(cacheActions.purge(type, id));
    dispatch(apiSyncActions.success("delete", type, id));
  } catch (e) {
    dispatch(apiSyncActions.failure("delete", type, id, 404));
  }
};

export const apiActions = {
  ...apiSyncActions,
  get: getEntity,
  search: searchEntity,
  upload: uploadEntity,
  delete: deleteEntity
};

type ResponseCodeMap = {
  [P in keyof EntityTypeToObject]: {
    [key: string]: number | undefined;
  }
};

export type ApiState = {
  get: ResponseCodeMap;
  search: ResponseCodeMap;
  upload: ResponseCodeMap;
  delete: ResponseCodeMap;
};

export const initialApiState: ApiState = {
  get: createEntityTypeToEmptyObject<ResponseCodeMap>(),
  search: createEntityTypeToEmptyObject<ResponseCodeMap>(),
  upload: createEntityTypeToEmptyObject<ResponseCodeMap>(),
  delete: createEntityTypeToEmptyObject<ResponseCodeMap>()
};

export const apiReducer: Reducer<ApiState, Actions> = (state = initialApiState, action) => {
  switch (action.type) {
    case ApiActionType.Request: {
      const { method, type, key } = action.payload;

      const keyString = typeof key === "string" ? key : stringifySearchParams(key);

      return {
        ...state,
        [method]: {
          ...state[method],
          [type]: {
            ...state[method][type],
            [keyString]: 102
          }
        }
      };
    }
    case ApiActionType.Success: {
      const { method, type, key } = action.payload;

      const keyString = typeof key === "string" ? key : stringifySearchParams(key);

      return {
        ...state,
        [method]: {
          ...state[method],
          [type]: {
            ...state[method][type],
            [keyString]: 200
          }
        }
      };
    }
    case ApiActionType.Failure: {
      const { method, type, key, code } = action.payload;

      const keyString = typeof key === "string" ? key : stringifySearchParams(key);

      return {
        ...state,
        [method]: {
          ...state[method],
          [type]: {
            ...state[method][type],
            [keyString]: code
          }
        }
      };
    }
    case ApiActionType.Reset: {
      const { method, type, key } = action.payload;

      const keyString = typeof key === "string" ? key : stringifySearchParams(key);

      return {
        ...state,
        [method]: {
          ...state[method],
          [type]: {
            ...state[method][type],
            [keyString]: undefined
          }
        }
      };
    }
    case LOCATION_CHANGE: {
      return initialApiState;
    }
    default:
      return state;
  }
};
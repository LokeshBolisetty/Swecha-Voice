import { Dispatch } from 'redux';
import { Clips } from './clips';
import { Recordings } from './recordings';
import StateTree from './tree';

export namespace Locale {
  export type State = string;

  enum ActionType {
    SET = 'SET_LOCALE',
  }

  interface SetAction {
    type: ActionType.SET;
    locale: string;
  }

  export type Action = SetAction;

  export const actions = {
    set: (locale: string) => (
      dispatch: Dispatch<SetAction | any>,
      getState: () => StateTree
    ) => {
      if (getState().locale == locale) return;
      dispatch({
        type: ActionType.SET,
        locale,
      });
      dispatch(Recordings.actions.buildNewSentenceSet());
      dispatch(Clips.actions.refillCache());
    },
  };

  export function reducer(state: State = null, action: Action): State {
    switch (action.type) {
      case ActionType.SET:
        return action.locale;

      default:
        return state;
    }
  }
}

import { connect } from 'react-redux';

import OnboardSteps from '../components/OnboardSteps';
import {
  gotoStep,
  nextStep,
  lastStep,
  settingsChanged,
  deckToggled,
  quizAnswered,
  quizChanged,
  quizClosed,
  finalize
} from '../../../actions/onboard';

import {updateStatus} from '../../../actions/status';

import {browserHistory} from 'react-router';

const mapStoreToProps = (state) => {
  return ({
    currentStep: state.onboard.currentStep,
    lastStep: lastStep,
    settings: state.onboard.settings,
    decks: state.onboard.decks,
    quizAnswers: state.onboard.quizAnswers,
    quizOpen: state.onboard.quizOpen,
    quizCorrect: state.onboard.quizCorrect,
    currentStatus: state.status.status
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNextClick: () => {
      dispatch(nextStep());
    },
    onSkipClick: () => {
      dispatch(gotoStep(lastStep));
    },
    gotoStep: (number) => {
      return () => {
        dispatch(gotoStep(number));
      };
    },
    onSettingsChange: (key) => {
      return (event) => {
        let value = false;
        if (event.target.checked) {
          value = true
        }
        dispatch(settingsChanged(key, value))
      }
    },
    onDeckToggled: (deck_id) => {
      dispatch(deckToggled(deck_id))
    },
    onCloseQuiz: () => {
      dispatch(quizClosed());
    },
    onAnswerQuiz: () => {
      dispatch(quizAnswered());
    },
    onAnswerChange: (key) => {
      return (event) => {
        const value = (event.target.value == 'true') ? true : false;
        dispatch(quizChanged(key, value));
      }
    },
    onFinalize: () => {
      dispatch(finalize()).then(() => {
        dispatch(updateStatus({...ownProps.status, initialized: true}))
        browserHistory.push('/');
      });
    }
  }
};

export default connect(mapStoreToProps, mapDispatchToProps)(OnboardSteps)
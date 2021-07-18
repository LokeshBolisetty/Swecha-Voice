import {
  Localized,
  withLocalization,
  WithLocalizationProps,
} from '@fluent/react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { DAILY_GOALS } from '../../../constants';
import { useAccount, useAPI } from '../../../hooks/store-hooks';
import { useTypedSelector } from '../../../stores/tree';
import URLS from '../../../urls';
import { LocaleLink, useLocale } from '../../locale-helpers';
import { CheckIcon, MicIcon, PlayOutlineIcon } from '../../ui/icons';
import { Button, LinkButton, TextButton } from '../../ui/ui';
import { SET_COUNT } from './contribution';
import { getTrackClass } from '../../../services/tracker';

import './success.css';

const COUNT_UP_MS = 500; // should be kept in sync with .contribution-success .done transition duration

const GoalPercentage = ({
  current,
  final,
}: {
  current: number;
  final: number;
}) => (
  <span className="goal-percentage">
    <span className="final">{final}%</span>
    <span className="current">{current}%</span>
  </span>
);

function Success({
  getString,
  onReset,
  type,
}: {
  type: 'speak' | 'listen';
  onReset: () => any;
} & WithLocalizationProps) {
  const api = useAPI();
  const account = useAccount();

  const [locale] = useLocale();

  const hasAccount = Boolean(account);
  const goalValue = DAILY_GOALS[type][0];

  const killAnimation = useRef(false);
  const startedAt = useRef(null);

  const [contributionCount, setContributionCount] = useState(null);
  const [currentCount, setCurrentCount] = useState(null);

  function countUp(time: number) {
    if (killAnimation.current) return;
    if (!startedAt.current) startedAt.current = time;
    const newCount = Math.min(
      Math.ceil((contributionCount * (time - startedAt.current)) / COUNT_UP_MS),
      contributionCount
    );
    setCurrentCount(newCount);

    if (newCount < contributionCount) {
      requestAnimationFrame(countUp);
    }
  }

  useEffect(() => {
    (type === 'speak'
      ? api.fetchDailyClipsCount()
      : api.fetchDailyVotesCount()
    ).then(value => {
      setContributionCount(value + SET_COUNT);
    });
    return () => {
      killAnimation.current = true;
    };
  }, []);

  useEffect(() => {
    if (contributionCount != null) {
      countUp(performance.now());
    }
  }, [contributionCount]);

  const finalPercentage = Math.ceil(
    (100 * (contributionCount || 0)) / goalValue
  );

  const ContributeMoreButton = (props: { children: React.ReactNode }) =>
    hasAccount ? (
      <Button
        className="contribute-more-button"
        rounded
        onClick={onReset}
        {...props}
      />
    ) : (
      <TextButton
        className="contribute-more-button secondary"
        onClick={onReset}
        {...props}
      />
    );

  const goalPercentage = (
    <GoalPercentage
      current={Math.ceil(
        (100 * (currentCount === null ? 0 : currentCount)) / goalValue
      )}
      final={finalPercentage}
    />
  );

  return (
    <div className="contribution-success">
      <div className="counter done">
        <CheckIcon />
        <Localized
          id="clips-with-count-pluralized"
          elems={{ bold: <b /> }}
          vars={{ count: SET_COUNT + '/' + SET_COUNT }}>
          <span className="text" />
        </Localized>
      </div>

      <Localized
        id={type === 'speak' ? 'goal-help-recording' : 'goal-help-validation'}
        elems={{ goalPercentage }}
        vars={{ goalValue }}>
        <h1 />
      </Localized>

      <div className="progress">
        <div
          className="done"
          style={{
            width: Math.min(finalPercentage, 100) + '%',
          }}
        />
      </div>
      {/*FORM ANONYMOUS */}
      <div className="container form-container">
        <div className="row">
          <div className="col" />
          <div className="col-8">
            <div className="form-card">
              <div className="form-body">
                <h1>Contribute to SWECHA VOICE</h1>
                <p style={{margin: '5px 15px'}}>This will help us to make improvements and prioritize new features,The survey should only take a minute and your responses are completely anonymous </p>
                <form style={{textAlign: 'center'}}>
                <h2 id="gender" style={{fontSize: '2.0rem'}}> Gender</h2>
                <select className="gender-dropdown">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <h2 id="ageGroup" style={{fontSize: '2.0rem'}}> Age group</h2>
                <select className="gender-dropdown age-dropdown">
                  <option>Less than 10 years</option>
                  <option>10-20 </option>
                  <option>21-30 </option>
                  <option>31-45</option>
                  <option>46-60</option>
                  <option>Greater than 60 years</option>
                </select>
                <h2 id="dialect" style={{fontSize: '2.0rem'}}> Dialect</h2>
                <select className="f gender-dropdown dialect-dropdown">
                  <option>Bengali</option>
                  <option>Bhojpuri</option>
                  <option>Gujrati</option>
                  <option>Haryanvi</option>
                  <option>Kannad</option>
                  <option>Kashmiri</option>
                  <option>Maghi</option>
                  <option>Malayalam</option>
                  <option>Marathi</option>
                  <option>Odia</option>
                  <option>Punjabi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Other Dialect</option>
                </select>
                <button type="button" className="button">Submit</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col" />
        </div>
      </div>

      {/* {hasAccount ? (
        !customGoal && (
          <div className="info-card">
            <Localized
              id="help-reach-hours-pluralized"
              vars={{ hours: 10000, language: getString(locale) }}>
              <p />
            </Localized>
            <Localized id="get-started-goals">
              <LinkButton rounded href={URLS.GOALS} />
            </Localized>
          </div>
        )
      ) : (
        <div className="info-card">
          <Localized id="profile-explanation">
            <p />
          </Localized>
          <Localized id="login-signup">
            <LinkButton
              rounded
              href="/login"
              className={getTrackClass('fs', `nudge-profile-on-succcess`)}
            />
          </Localized>
        </div>
      )} */}

      <ContributeMoreButton>
        {type === 'speak' ? <MicIcon /> : <PlayOutlineIcon />}
        <Localized id="contribute-more" vars={{ count: SET_COUNT }}>
          <span />
        </Localized>
      </ContributeMoreButton>

      {hasAccount && (
        <Localized id="edit-profile">
          <LocaleLink className="secondary" to={URLS.PROFILE_INFO} />
        </Localized>
      )}
    </div>
  );
}

export default withLocalization(Success);

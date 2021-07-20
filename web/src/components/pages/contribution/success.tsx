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
//import {sendDemographicData} from '../../../../../server/src/lib/model/db';
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

  const [locale] = useLocale();
  const goalValue = DAILY_GOALS[type][0];

  const killAnimation = useRef(false);
  const startedAt = useRef(null);
  const ageRanges = ['10-20', '20-30', '30-40', '40-50', '50-60', '60-100'];
  const genders = ['male', 'female', 'other'];
  const accents = ['Telangana', 'Central', 'Coastal', 'Rayalaseema'];
  const [contributionCount, setContributionCount] = useState(null);
  const [currentCount, setCurrentCount] = useState(null);
  const [age, setAge] = useState(ageRanges[0]);
  const [accent, setAccent] = useState(accents[0]);
  const [gender, setGender] = useState(genders[0]);

  const data = {
    age,
    accent,
    gender,
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(data);
    api.sendDemographics(age, accent, gender);
  };
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

  const ContributeMoreButton = (props: { children: React.ReactNode }) => (
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
                <p>
                  This will help us to make improvements and prioritize new
                  features,The survey should only take a minute and your
                  responses are completely anonymous{' '}
                </p>
                <form onSubmit={handleSubmit}>
                  <h2 id="gender" style={{ fontSize: '1.5rem' }}>
                    {' '}
                    Gender
                  </h2>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}>
                    {genders.map(g => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <h2 id="dialect" style={{ fontSize: '1.5rem' }}>
                    {' '}
                    Dialect
                  </h2>
                  <select
                    value={accent}
                    onChange={e => setAccent(e.target.value)}>
                    {accents.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <h2 id="ageGroup" style={{ fontSize: '1.5rem' }}>
                    {' '}
                    Age group
                  </h2>
                  <select value={age} onChange={e => setAge(e.target.value)}>
                    {ageRanges.map(ar => (
                      <option key={ar} value={ar}>
                        {ar}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <button type="submit" className="button">
                    Submit
                  </button>
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
    </div>
  );
}

export default withLocalization(Success);

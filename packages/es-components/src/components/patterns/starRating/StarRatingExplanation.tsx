import React from 'react';
import styled from 'styled-components';
import formatMessage from 'format-message';
import Modal, { ModalProps } from '../../containers/modal/Modal';
import ModalButtonContainer from '../../containers/modal/ModalButtonContainer';
import Button from '../../controls/buttons/Button';
import Table from '../../containers/table/Table';
import callRef from '../../util/callRef';
import useUniqueId from '../../util/useUniqueId';

formatMessage.setup({ missingTranslation: 'ignore' });

const HelpContent = styled(Modal.Body)`
  max-height: 750px;
  overflow-y: scroll;
  ul {
    display: block;
    list-style-type: disc;
    margin-bottom: 10px;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
    ul {
      list-style-type: circle;
    }
  }
`;

const CautionRating = styled.div`
  background-image: url(${ASSETS_PATH}images/poor-performer-mask.svg);
  background-size: 100% 100%;
  height: 30px;
  width: 150px;
`;

const StarRating = styled.div`
  background-image: url(${ASSETS_PATH}images/star-rating-mask.svg);
  background-color: #ffc436;
  height: 28px;
`;

const RatingTable = styled(Table)`
  border: 1px solid black;
  text-align: left;
  margin: 15px 0px;
  thead {
    font-weight: bold;
  }
  th,
  td {
    border: 1px solid black;
    padding: 8px;
    vertical-align: middle;
  }
  td {
    height: 63px;
  }
`;

export type StarRatingExplanationProps = Override<
  ModalProps,
  {
    parentNode: HTMLElement;
    closeModal?: () => void;
  }
>;

const StrongMessage = ({ children }: React.PropsWithChildren) => {
  const key = `bold-${useUniqueId()}`;
  return <strong key={key}>{children}</strong>;
};

const StarRatingExplanation = React.forwardRef<
  HTMLDivElement,
  StarRatingExplanationProps
>(function ForwardedStarRatingExplanation(
  { show, closeModal, parentNode, ...props },
  ref
) {
  return (
    <Modal
      show={show}
      size="large"
      onHide={closeModal}
      parentSelector={() => parentNode}
      overlayRef={(el: HTMLElement | null) =>
        callRef(ref, el as HTMLDivElement)
      }
      {...props}
    >
      <Modal.Header>{formatMessage('Plan Ratings')}</Modal.Header>
      <HelpContent>
        <p>
          {formatMessage(
            'The Overall Plan Rating combines scores, as rated by Medicare, for the types of services each plan offers.'
          )}
        </p>
        <RatingTable>
          <thead>
            <tr>
              <th>{formatMessage('Legend')}</th>
              <th>{formatMessage('Description')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CautionRating />
              </td>
              <td>
                {formatMessage(
                  'Caution - The plan has received low summary ratings from Medicare three years in a row.'
                )}
              </td>
            </tr>
            <tr>
              <td>
                <StarRating />
              </td>
              <td>
                {formatMessage(
                  "The plan has been given a 5 out 5 stars rating. People with Medicare can switch into these plans at any time during the year, even if it's not during an enrollment period."
                )}
              </td>
            </tr>
          </tbody>
        </RatingTable>

        <strong>{formatMessage('What is being measured?')}</strong>
        <ul>
          <li>
            {formatMessage.rich(
              '<s>For plans covering health services</s>, the overall score for quality of those services covers <s>36 different topics in 5 categories:</s>',
              {
                s: StrongMessage
              }
            )}
            <ul>
              <li>
                {formatMessage.rich(
                  '<s>Staying healthy: screenings, tests, and vaccines:</s> Includes how often members got various screening tests, vaccines, and other check-ups that help them stay healthy.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
              <li>
                {formatMessage.rich(
                  '<s>Managing chronic (long-term) conditions:</s> Includes how often members with different conditions got certain tests and treatments that help them manage their condition.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
              <li>
                {formatMessage.rich(
                  '<s>Ratings of health plan responsiveness and care:</s> Includes ratings of member satisfaction with the plan.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
              <li>
                {formatMessage.rich(
                  '<s>Member complaints, problems getting services, and choosing to leave the plan:</s> Includes how often members filed complaints against the plan and how often members choose to leave the plan. Includes how often Medicare found problems with the plan.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
              <li>
                {formatMessage.rich(
                  '<s>Health plan customer service:</s> Includes how well the plan handles calls and makes decisions about member appeals for health coverage.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
            </ul>
          </li>
          <li>
            {formatMessage.rich(
              '<s>For plans covering drug services,</s> the overall score for quality of those services covers <s>17 different topics in 4 categories:</s>',
              {
                s: StrongMessage
              }
            )}
            <ul>
              <li>
                {formatMessage.rich(
                  '<s>Drug plan customer service:</s> Includes how well the plan handles calls and makes decisions about member appeals for drug coverage.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
              <li>
                {formatMessage.rich(
                  '<s>Member complaints, problems getting services, and choosing to leave the plan:</s>  Includes how often members filed complaints about the plan and how often members choose to leave the plan. Includes how often Medicare found problems with the plan.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
              <li>
                {formatMessage.rich(
                  `<s>Member experience with plan's drug services:</s> Includes ratings of member satisfaction with the plan.`,
                  {
                    s: StrongMessage
                  }
                )}
              </li>
              <li>
                {formatMessage.rich(
                  '<s>Drug pricing and patient safety:</s> Includes how well the plan prices prescriptions and provides updated and accurate pricing information for the Medicare website. Includes information on how often members with certain medical conditions get prescription drugs that are considered safer and clinically recommended for their condition. Includes information on whether members are taking certain medications as directed.',
                  {
                    s: StrongMessage
                  }
                )}
              </li>
            </ul>
          </li>
          <li>
            {formatMessage.rich(
              '<s>For plans covering both health and drug services,</s> the overall score for quality of those services covers <s>all of the 53 topics listed above.</s>',
              {
                s: StrongMessage
              }
            )}
          </li>
        </ul>
        <p>
          <strong>
            {formatMessage(
              'Where does the information for the Overall Plan Rating come from?'
            )}
          </strong>
        </p>
        <ul>
          <li>
            {formatMessage.rich(
              'For quality of <s>health services</s>, the information comes from sources that include:',
              {
                s: StrongMessage
              }
            )}
            <ul>
              <li>{formatMessage('Member surveys done by Medicare')}</li>
              <li>{formatMessage('Information from clinicians')}</li>
              <li>{formatMessage('Information submitted by the plans')}</li>
              <li>
                {formatMessage(
                  "Results from Medicare's regular monitoring activities"
                )}
              </li>
            </ul>
          </li>
          <li>
            {formatMessage.rich(
              'For quality of <s>drug services</s>, the information comes from sources that include:',
              {
                s: StrongMessage
              }
            )}
            <ul>
              <li>{formatMessage('Member surveys done by Medicare')}</li>
              <li>
                {formatMessage(
                  'Reviews of billing and other information that plans submit to Medicare'
                )}
              </li>
              <li>
                {formatMessage(
                  "Results from Medicare's regular monitoring activities"
                )}
              </li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>
            {formatMessage('Why is the Overall Plan Rating important?')}
          </strong>
        </p>
        <p>
          {formatMessage(
            'The Overall Plan Rating gives you a single summary score that makes it easy for you to compare plans based on quality and performance. Learn more about differences among plans by looking at the detailed ratings.'
          )}
        </p>
        <p>
          {formatMessage(
            'Medicare evaluates plans based on a 5-Star rating system. Star Ratings are calculated each year and may change from one year to the next.'
          )}
        </p>
      </HelpContent>
      <Modal.Footer>
        <ModalButtonContainer>
          <Button onClick={closeModal}>{formatMessage('Close')}</Button>
        </ModalButtonContainer>
      </Modal.Footer>
    </Modal>
  );
});

export default StarRatingExplanation;

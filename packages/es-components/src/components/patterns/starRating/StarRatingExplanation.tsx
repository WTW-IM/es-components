import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from '../../containers/modal/Modal';
import ModalButtonContainer from '../../containers/modal/ModalButtonContainer';
import Button from '../../controls/buttons/Button';
import Table from '../../containers/table/Table';
import callRef from '../../util/callRef';
import useUniqueId from '../../util/useUniqueId';

const HelpContent = styled(Modal.Body)`
  max-height: 750px;
  overflow-y: scroll;

  ul {
    display: block;
    padding-left: 40px;
    margin-right: 0;
    margin-bottom: 10px;
    margin-left: 0;
    list-style-type: disc;

    ul {
      list-style-type: circle;
    }
  }
`;

const CautionRating = styled.div`
  width: 150px;
  height: 30px;
  background-image: url(${ASSETS_PATH}images/poor-performer-mask.svg);
  background-size: 100% 100%;
`;

const StarRating = styled.div`
  height: 28px;
  background-color: #ffc436;
  background-image: url(${ASSETS_PATH}images/star-rating-mask.svg);
`;

const RatingTable = styled(Table)`
  border: 1px solid black;
  margin: 15px 0;
  text-align: left;

  thead {
    font-weight: bold;
  }

  th,
  td {
    padding: 8px;
    border: 1px solid black;
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
      <Modal.Header>{'Plan Ratings'}</Modal.Header>
      <HelpContent>
        <p>
          {
            'The Overall Plan Rating combines scores, as rated by Medicare, for the types of services each plan offers.'
          }
        </p>
        <RatingTable>
          <thead>
            <tr>
              <th>{'Legend'}</th>
              <th>{'Description'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CautionRating />
              </td>
              <td>
                {
                  'Caution - The plan has received low summary ratings from Medicare three years in a row.'
                }
              </td>
            </tr>
            <tr>
              <td>
                <StarRating />
              </td>
              <td>
                {
                  "The plan has been given a 5 out 5 stars rating. People with Medicare can switch into these plans at any time during the year, even if it's not during an enrollment period."
                }
              </td>
            </tr>
          </tbody>
        </RatingTable>

        <strong>{'What is being measured?'}</strong>
        <ul>
          <li>
            <StrongMessage>For plans covering health services</StrongMessage>,
            the overall score for quality of those services covers{' '}
            <StrongMessage>36 different topics in 5 categories:</StrongMessage>
            <ul>
              <li>
                <StrongMessage>
                  Staying healthy: screenings, tests, and vaccines:
                </StrongMessage>{' '}
                Includes how often members got various screening tests,
                vaccines, and other check-ups that help them stay healthy.
              </li>
              <li>
                <StrongMessage>
                  Managing chronic (long-term) conditions:
                </StrongMessage>{' '}
                Includes how often members with different conditions got certain
                tests and treatments that help them manage their condition.
              </li>
              <li>
                <StrongMessage>
                  Ratings of health plan responsiveness and care:
                </StrongMessage>{' '}
                Includes ratings of member satisfaction with the plan.
              </li>
              <li>
                <StrongMessage>
                  Member complaints, problems getting services, and choosing to
                  leave the plan:
                </StrongMessage>{' '}
                Includes how often members filed complaints against the plan and
                how often members choose to leave the plan. Includes how often
                Medicare found problems with the plan.
              </li>
              <li>
                <StrongMessage>Health plan customer service:</StrongMessage>{' '}
                Includes how well the plan handles calls and makes decisions
                about member appeals for health coverage.
              </li>
            </ul>
          </li>
          <li>
            <StrongMessage>For plans covering drug services,</StrongMessage> the
            overall score for quality of those services covers{' '}
            <StrongMessage>17 different topics in 4 categories:</StrongMessage>
            <ul>
              <li>
                <StrongMessage>Drug plan customer service:</StrongMessage>{' '}
                Includes how well the plan handles calls and makes decisions
                about member appeals for drug coverage.
              </li>
              <li>
                <StrongMessage>
                  Member complaints, problems getting services, and choosing to
                  leave the plan:
                </StrongMessage>{' '}
                Includes how often members filed complaints about the plan and
                how often members choose to leave the plan. Includes how often
                Medicare found problems with the plan.
              </li>
              <li>
                <StrongMessage>
                  Member experience with plan&apos;s drug services:
                </StrongMessage>{' '}
                Includes ratings of member satisfaction with the plan.
              </li>
              <li>
                <StrongMessage>Drug pricing and patient safety:</StrongMessage>{' '}
                Includes how well the plan prices prescriptions and provides
                updated and accurate pricing information for the Medicare
                website. Includes information on how often members with certain
                medical conditions get prescription drugs that are considered
                safer and clinically recommended for their condition. Includes
                information on whether members are taking certain medications as
                directed.
              </li>
            </ul>
          </li>
          <li>
            <StrongMessage>
              For plans covering both health and drug services,
            </StrongMessage>{' '}
            the overall score for quality of those services covers{' '}
            <StrongMessage>all of the 53 topics listed above.</StrongMessage>
          </li>
        </ul>
        <p>
          <strong>
            {
              'Where does the information for the Overall Plan Rating come from?'
            }
          </strong>
        </p>
        <ul>
          <li>
            For quality of <StrongMessage>health services</StrongMessage>, the
            information comes from sources that include:
            <ul>
              <li>{'Member surveys done by Medicare'}</li>
              <li>{'Information from clinicians'}</li>
              <li>{'Information submitted by the plans'}</li>
              <li>{"Results from Medicare's regular monitoring activities"}</li>
            </ul>
          </li>
          <li>
            For quality of <StrongMessage>drug services</StrongMessage>, the
            information comes from sources that include:
            <ul>
              <li>{'Member surveys done by Medicare'}</li>
              <li>
                {
                  'Reviews of billing and other information that plans submit to Medicare'
                }
              </li>
              <li>{"Results from Medicare's regular monitoring activities"}</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>{'Why is the Overall Plan Rating important?'}</strong>
        </p>
        <p>
          {
            'The Overall Plan Rating gives you a single summary score that makes it easy for you to compare plans based on quality and performance. Learn more about differences among plans by looking at the detailed ratings.'
          }
        </p>
        <p>
          {
            'Medicare evaluates plans based on a 5-Star rating system. Star Ratings are calculated each year and may change from one year to the next.'
          }
        </p>
      </HelpContent>
      <Modal.Footer>
        <ModalButtonContainer>
          <Button onClick={closeModal}>{'Close'}</Button>
        </ModalButtonContainer>
      </Modal.Footer>
    </Modal>
  );
});

export default StarRatingExplanation;

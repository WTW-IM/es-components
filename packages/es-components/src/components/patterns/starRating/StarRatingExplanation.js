/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';
import formatMessage from 'format-message';
import { formatChildren } from 'format-message/react';
import Modal from '../../containers/modal/Modal';
import ModalButtonContainer from '../../containers/modal/ModalButtonContainer';
import Button from '../../controls/buttons/Button';
import Table from '../../containers/table/Table';

const HelpContent = styled(Modal.Body)`
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
  background-image: url(https://bdaim-webexcdn-p.azureedge.net/es-assets/images/poor-performer-mask.svg);
  background-size: 100% 100%;
  height: 30px;
  width: 150px;
`;

const StarRating = styled.div`
  background-image: url(https://bdaim-webexcdn-p.azureedge.net/es-assets/images/star-rating-mask.svg);
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

export default function StarRatingExplanation(props) {
  return (
    <Modal show={props.show} size="large" onHide={props.closeModal}>
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
            {formatChildren(
              formatMessage(
                '<0>For plans covering health services</0>, the overall score for quality of those services covers <0>36 different topics in 5 categories:</0>'
              ),
              [<strong key="bold" />]
            )}
            <ul>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Staying healthy: screenings, tests, and vaccines:</0> Includes how often members got various screening tests, vaccines, and other check-ups that help them stay healthy.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Managing chronic (long-term) conditions:</0> Includes how often members with different conditions got certain tests and treatments that help them manage their condition.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Ratings of health plan responsiveness and care:</0> Includes ratings of member satisfaction with the plan.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Member complaints, problems getting services, and choosing to leave the plan:</0> Includes how often members filed complaints against the plan and how often members choose to leave the plan. Includes how often Medicare found problems with the plan.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Health plan customer service:</0> Includes how well the plan handles calls and makes decisions about member appeals for health coverage.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
            </ul>
          </li>
          <li>
            {formatChildren(
              formatMessage(
                '<0>For plans covering drug services,</0> the overall score for quality of those services covers <0>17 different topics in 4 categories:</0>'
              ),
              [<strong key="bold" />]
            )}
            <ul>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Drug plan customer service:</0> Includes how well the plan handles calls and makes decisions about member appeals for drug coverage.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Member complaints, problems getting services, and choosing to leave the plan:</0>  Includes how often members filed complaints about the plan and how often members choose to leave the plan. Includes how often Medicare found problems with the plan.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
              <li>
                {formatChildren(
                  formatMessage(
                    "<0>Member experience with plan's drug services:</0> Includes ratings of member satisfaction with the plan."
                  ),
                  [<strong key="bold" />]
                )}
              </li>
              <li>
                {formatChildren(
                  formatMessage(
                    '<0>Drug pricing and patient safety:</0> Includes how well the plan prices prescriptions and provides updated and accurate pricing information for the Medicare website. Includes information on how often members with certain medical conditions get prescription drugs that are considered safer and clinically recommended for their condition. Includes information on whether members are taking certain medications as directed.'
                  ),
                  [<strong key="bold" />]
                )}
              </li>
            </ul>
          </li>
          <li>
            {formatChildren(
              formatMessage(
                '<0>For plans covering both health and drug services,</0> the overall score for quality of those services covers <0>all of the 53 topics listed above.</0>'
              ),
              [<strong key="bold" />]
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
            {formatChildren(
              formatMessage(
                'For quality of <0>health services</0>, the information comes from sources that include:'
              ),
              [<strong key="bold" />]
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
            {formatChildren(
              formatMessage(
                'For quality of <0>drug services</0>, the information comes from sources that include:'
              ),
              [<strong key="bold" />]
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
          <Button onClick={props.closeModal}>{formatMessage('Close')}</Button>
        </ModalButtonContainer>
      </Modal.Footer>
    </Modal>
  );
}

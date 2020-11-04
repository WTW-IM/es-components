import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatMessage from 'format-message';
import LinkButton from '../../controls/buttons/LinkButton';
import StarRatingExplanation from './StarRatingExplanation';
import useRootNode from '../../util/useRootNode';

formatMessage.setup({ missingTranslation: 'ignore' });

const StarContainer = styled.div`
  background-color: ${props =>
    !props.isPoorPerformer ? props.theme.colors.gray5 : 'transparent'};
  display: flex;
  flex-direction: column;
  height: 21px;
  margin-top: 3px;
  width: 133px;
`;

const StarRatingLink = styled(LinkButton)`
  color: ${props => props.theme.colors.gray8};
  border-bottom: 1px dashed;
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.gray8};
    border-bottom: 1px solid;
  }
`;

const StarFill = styled.span`
  background-color: #ffc436;
  display: block;
  height: 21px;
  margin-left: 2px;
  width: ${props => props.fillWidth};
`;

const StarOverlay = styled.div`
  background-image: url(https://bdaim-webexcdn-p.azureedge.net/es-assets/images/star-rating-mask.svg);
  height: 25px;
  margin-top: -23px;
`;

const PoorPerformerOverlay = styled.div`
  background-image: url(https://bdaim-webexcdn-p.azureedge.net/es-assets/images/poor-performer-mask.svg);
  background-size: 100% 100%;
  height: 30px;
  margin-top: -5px;
`;

function getStarRatingBackgroundWidth(rating) {
  const starWidth = 20.2;

  const spaceWidth = 7;

  const ratingFloor = Math.floor(rating);

  const spaceNumber =
    ratingFloor === rating && rating !== 0 ? ratingFloor - 1 : ratingFloor;

  const spacingAmount = spaceWidth * spaceNumber;

  const width = starWidth * rating;

  return `${width + spacingAmount}px`;
}

function getAriaText(isPoorPerformer, rating) {
  if (isPoorPerformer) {
    return formatMessage(
      'CMS has indicated that this plan is a poor performer'
    );
  }
  if (rating !== null) {
    return formatMessage(`CMS has rated this plan {rating} out of five stars`, {
      rating
    });
  }
  return '';
}

function StarRating({ rating, isPoorPerformer, onExplanationOpen, noRatingText }) {
  const [showHelp, updateShowHelp] = useState(false);
  const [rootNode, rootNodeRef] = useRootNode(document.body);
  const ariaText = getAriaText(isPoorPerformer, rating);

  return (
    <>
      <StarRatingLink
        ref={rootNodeRef}
        onClick={() => {
          if (onExplanationOpen) {
            onExplanationOpen();
          }
          updateShowHelp(true);
        }}
      >
        {rating === null && (
          <span>{formatMessage(noRatingText)}</span>
        )}
        {rating !== null && (
          <StarContainer
            aria-label={ariaText}
            isPoorPerformer={isPoorPerformer}
          >
            {!isPoorPerformer ? (
              <div>
                <StarFill fillWidth={getStarRatingBackgroundWidth(rating)} />
                <StarOverlay />
              </div>
            ) : (
              <div>
                <PoorPerformerOverlay />
              </div>
            )}
          </StarContainer>
        )}
      </StarRatingLink>
      <StarRatingExplanation
        show={showHelp}
        closeModal={() => updateShowHelp(false)}
        parentNode={rootNode}
      />
    </>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  isPoorPerformer: PropTypes.bool,
  onExplanationOpen: PropTypes.func,
  noRatingText: PropTypes.string
};

StarRating.defaultProps = {
  isPoorPerformer: false,
  onExplanationOpen: () => {},
  noRatingText: 'Star Rating not available'
};

export default StarRating;

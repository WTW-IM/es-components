import React, { useCallback, useState } from 'react';
import * as CSS from 'csstype';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkButton from '../../controls/buttons/LinkButton';
import StarRatingExplanation from './StarRatingExplanation';
import useRootNode from '../../util/useRootNode';
import { callRefs } from '../../util/callRef';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

const NOT_AVAILABLE_MESSAGE = 'Star Rating not available';

export type StarRatingProps = Override<
  JSXElementProps<'button'>,
  {
    rating: number;
    isPoorPerformer?: boolean;
    ratingCount?: number;
    ratingExplanation?: string;
    onExplanationOpen?: () => void;
    noRatingText?: string;
  }
>;

const StarContainer = styled.div<{ isPoorPerformer?: boolean }>`
  display: flex;
  width: 133px;
  height: 21px;
  flex-direction: column;
  margin-top: 3px;
  background-color: ${props =>
    !props.isPoorPerformer ? props.theme.colors.gray5 : 'transparent'};

  @media print {
    display: block;
  }
`;

const StarRatingLink = styled(LinkButton)`
  border-bottom: 1px dashed;
  color: ${props => props.theme.colors.gray8};
  text-decoration: none;

  &:hover,
  &:focus {
    border-bottom: 1px solid;
    color: ${props => props.theme.colors.gray8};
  }
`;

const StarFill = styled.span<{ fillWidth: CSS.Property.Width }>`
  display: block;
  width: ${props => props.fillWidth};
  height: 21px;
  margin-left: 2px;
  background-color: #ffc436;
`;

const StarOverlay = styled.div`
  height: 25px;
  margin-top: -23px;
  background-image: url(${ASSETS_PATH}images/star-rating-mask.svg);
`;

const PoorPerformerOverlay = styled.div`
  height: 30px;
  margin-top: -5px;
  background-image: url(${ASSETS_PATH}images/poor-performer-mask.svg);
  background-size: 100% 100%;
`;

function getStarRatingBackgroundWidth(rating: number) {
  const starWidth = 20.2;

  const spaceWidth = 7;

  const ratingFloor = Math.floor(rating);

  const spaceNumber =
    ratingFloor === rating && rating !== 0 ? ratingFloor - 1 : ratingFloor;

  const spacingAmount = spaceWidth * spaceNumber;

  const width = starWidth * rating;

  return `${width + spacingAmount}px`;
}

function getAriaText(isPoorPerformer: Maybe<boolean>, rating: Maybe<number>) {
  if (isPoorPerformer) {
    return 'CMS has indicated that this plan is a poor performer';
  }
  if (rating !== null) {
    return `CMS has rated this plan ${rating} out of five stars`;
  }
  return '';
}

const StarRating = React.forwardRef<HTMLButtonElement, StarRatingProps>(
  function ForwardedStarRating(
    {
      rating,
      isPoorPerformer = false,
      noRatingText = NOT_AVAILABLE_MESSAGE,
      onClick: onClickProp,
      onExplanationOpen,
      ...props
    },
    ref
  ) {
    const [showHelp, setShowHelp] = useState(false);
    const [rootNode, rootNodeRef] = useRootNode(document.body);
    const ariaText = getAriaText(isPoorPerformer, rating);

    const onClick = useMonitoringCallback(
      (
        [currentOnClick, currentOnExplanationOpen],
        e: React.MouseEvent<HTMLButtonElement>
      ) => {
        currentOnClick?.(e);
        currentOnExplanationOpen?.();
        setShowHelp(true);
      },
      [onClickProp, onExplanationOpen] as const
    );

    const closeModal = useCallback(() => {
      setShowHelp(false);
    }, []);

    return (
      <>
        <StarRatingLink
          ref={el => callRefs(el, rootNodeRef, ref)}
          {...props}
          onClick={onClick}
        >
          {rating === null && <span>{noRatingText}</span>}
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
          closeModal={closeModal}
          parentNode={rootNode}
        />
      </>
    );
  }
);

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  isPoorPerformer: PropTypes.bool,
  onExplanationOpen: PropTypes.func,
  noRatingText: PropTypes.string
};

export default StarRating;

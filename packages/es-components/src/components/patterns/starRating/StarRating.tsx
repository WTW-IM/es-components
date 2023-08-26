import React, { useCallback, useRef, useState } from 'react';
import * as CSS from 'csstype';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatMessage from 'format-message';
import LinkButton from '../../controls/buttons/LinkButton';
import StarRatingExplanation from './StarRatingExplanation';
import useRootNode from '../../util/useRootNode';
import noop from '../../util/noop';
import { callRefs } from '../../util/callRef';

formatMessage.setup({ missingTranslation: 'ignore' });

const NOT_AVAILABLE_MESSAGE = 'Star Rating not available' as const;

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
  background-color: ${props =>
    !props.isPoorPerformer ? props.theme.colors.gray5 : 'transparent'};
  display: flex;
  flex-direction: column;
  height: 21px;
  margin-top: 3px;
  width: 133px;

  @media print {
    display: block;
  }
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

const StarFill = styled.span<{ fillWidth: CSS.Property.Width }>`
  background-color: #ffc436;
  display: block;
  height: 21px;
  margin-left: 2px;
  width: ${props => props.fillWidth};
`;

const StarOverlay = styled.div`
  background-image: url(${ASSETS_PATH}images/star-rating-mask.svg);
  height: 25px;
  margin-top: -23px;
`;

const PoorPerformerOverlay = styled.div`
  background-image: url(${ASSETS_PATH}images/poor-performer-mask.svg);
  background-size: 100% 100%;
  height: 30px;
  margin-top: -5px;
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

const StarRating = React.forwardRef<HTMLButtonElement, StarRatingProps>(
  function ForwardedStarRating(passedProps, ref) {
    const {
      rating,
      isPoorPerformer = false,
      noRatingText = NOT_AVAILABLE_MESSAGE,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      onClick: _onClick,
      onExplanationOpen: _onExplanationOpen,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...props
    } = passedProps;
    const propsRef = useRef(passedProps);
    propsRef.current = passedProps;
    const [showHelp, setShowHelp] = useState(false);
    const [rootNode, rootNodeRef] = useRootNode(document.body);
    const ariaText = getAriaText(isPoorPerformer, rating);

    const onClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      e => {
        (propsRef.current.onClick || noop)(e);
        (propsRef.current.onExplanationOpen || noop)();
        setShowHelp(true);
      },
      []
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
          {rating === null && <span>{formatMessage(noRatingText)}</span>}
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

StarRating.defaultProps = {
  isPoorPerformer: false,
  onExplanationOpen: noop,
  noRatingText: NOT_AVAILABLE_MESSAGE
};

export default StarRating;

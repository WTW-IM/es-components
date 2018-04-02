export default function arrowStyles(colors, arrowSize, hasTitle) {
  const sharedStyles = `
        content: '';
        position: absolute;
        border-style: solid;
        border-color: transparent;
        border-width: ${arrowSize}px;
    `;

  return `
        .popper {
            margin: ${arrowSize}px;
        }
        .popper .popper__arrow {
            width: 0;
            height: 0;
            border-style: solid;
            position: absolute;
        }

        .popper[data-placement^="top"] .popper__arrow {
            border-color: transparent;
            border-width: ${arrowSize}px;
            border-bottom-width: 0;
            border-top-color: rgba(0, 0, 0, 0.3);
            bottom: -${arrowSize}px;
            left: calc(50% - ${arrowSize}px);
        }
        .popper[data-placement^="top"] .popper__arrow::after {
            ${sharedStyles}
            border-top-color: ${colors.white};
            border-bottom-width: 0;
            margin-left: -${arrowSize}px;
            bottom: 1px;
        }

        .popper[data-placement^="bottom"] .popper__arrow {
            border-color: transparent;
            border-width: ${arrowSize}px;
            border-top-width: 0;
            border-bottom-color: rgba(0, 0, 0, 0.3);
            top: -${arrowSize}px;
            left: calc(50% - ${arrowSize}px);

        }
        .popper[data-placement^="bottom"] .popper__arrow::after {
            ${sharedStyles}
            border-bottom-color: ${hasTitle ? colors.primary : colors.white};
            border-top-width: 0;
            margin-left: -${arrowSize}px;
            top: 1px;
        }

        .popper[data-placement^="left"] .popper__arrow {
            border-color: transparent;
            border-width: ${arrowSize}px;
            border-right-width: 0;
            border-left-color: rgba(0, 0, 0, 0.3);
            right: -${arrowSize}px;
            top: calc(50% - ${arrowSize}px);
        }
        .popper[data-placement^="left"] .popper__arrow::after {
            ${sharedStyles}
            border-left-color: ${colors.white};
            border-right-width: 0;
            margin-left: -${arrowSize}px;
            right: 1px;
            top: calc(50% - ${arrowSize}px);
        }

        .popper[data-placement^="right"] .popper__arrow {
            border-color: transparent;
            border-width: ${arrowSize}px;
            border-left-width: 0;
            border-right-color: rgba(0, 0, 0, 0.3);
            left: -${arrowSize}px;
            top: calc(50% - ${arrowSize}px);
        }
        .popper[data-placement^="right"] .popper__arrow::after {
            ${sharedStyles}
            border-right-color: ${colors.white};
            border-left-width: 0;
            margin-right: -${arrowSize}px;
            left: 1px;
            top: calc(50% - ${arrowSize}px);
        }
    `;
}

export default function arrowStyles(colors, arrowSize, hasTitle) {
  return `
        .popper {
            margin: 10px;
        }

        .popper .popper__arrow {
            width: 0;
            height: 0;
            border-style: solid;
            position: absolute;
        }

        .popper[data-placement^="top"] .popper__arrow {
            border-color: transparent;
            border-width: 10px;
            border-bottom-width: 0;
            border-top-color: rgba(0, 0, 0, 0.3);
            bottom: -10px;
            left: calc(50% - 10px);
        }
        .popper[data-placement^="top"] .popper__arrow::after {
            content: '';
            position: absolute;
            border-style: solid;
            border-color: transparent;
            border-width: 10px;
            border-top-color: ${colors.white};
            border-bottom-width: 0;
            margin-left: -10px;
            bottom: 1px;
        }

        .popper[data-placement^="bottom"] .popper__arrow {
            border-color: transparent;
            border-width: 10px;
            border-top-width: 0;
            border-bottom-color: rgba(0, 0, 0, 0.3);
            top: -10px;
            left: calc(50% - 10px);
        }
        .popper[data-placement^="bottom"] .popper__arrow::after {
            content: '';
            position: absolute;
            border-style: solid;
            border-color: transparent;
            border-width: 10px;
            border-bottom-color: ${colors.primary};
            border-top-width: 0;
            margin-left: -10px;
            top: 1px;
        }

        .popper[data-placement^="left"] .popper__arrow {
            border-color: transparent;
            border-width: 10px;
            border-right-width: 0;
            border-left-color: rgba(0, 0, 0, 0.3);
            right: -10px;
            top: calc(50% - 10px);
        }
        .popper[data-placement^="left"] .popper__arrow::after {
            content: '';
            position: absolute;
            border-style: solid;
            border-color: transparent;
            border-width: 10px;
            border-left-color: ${colors.white};
            border-right-width: 0;
            margin-left: -10px;
            right: 1px;
            top: calc(50% - 10px);
        }

        .popper[data-placement^="right"] .popper__arrow {
            border-color: transparent;
            border-width: 10px;
            border-left-width: 0;
            border-right-color: rgba(0, 0, 0, 0.3);
            left: -10px;
            top: calc(50% - 10px);
        }
        .popper[data-placement^="right"] .popper__arrow::after {
            content: '';
            position: absolute;
            border-style: solid;
            border-color: transparent;
            border-width: 10px;
            border-right-color: ${colors.white};
            border-left-width: 0;
            margin-right: -10px;
            left: 1px;
            top: calc(50% - 10px);
        }
    `;
}

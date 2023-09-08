import { InferProps } from 'prop-types';
import { Props as ReactModalProps } from 'react-modal';

declare module 'react-modal' {
  export const propTypes: InferProps<ReactModalProps>;
}

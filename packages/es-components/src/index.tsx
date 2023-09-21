/** Imports */
import './global';
import { withLoadingStateWhileRunning } from './components/controls/buttons/features/withLoadingStateWhileRunning';

export { default as Icon } from './components/base/icons/Icon';
export type { IconName } from 'es-components-shared-types';
export { iconNames } from 'es-components-shared-types';
export { default as FullColorIcon } from './components/base/icons/FullColorIcon';

export { default as Notification } from './components/containers/notification/Notification';
export { default as LightNotification } from './components/containers/notification/LightNotification';
export { default as MessageNotification } from './components/containers/notification/MessageNotification';
export {
  InlineMessage,
  Message
} from './components/containers/notification/Message';

export {
  default as Drawer,
  useDrawerItemContext,
  DrawerItemContext
} from './components/containers/drawer/Drawer';

export { default as Fieldset } from './components/containers/fieldset/Fieldset';
export { default as Tooltip } from './components/containers/tooltip/Tooltip';
export { default as Popover } from './components/containers/popover/Popover';
export { default as Modal } from './components/containers/modal/Modal';
export { default as ModalButtonContainer } from './components/containers/modal/ModalButtonContainer';
export { default as SlidingPane } from './components/containers/sliding-pane/SlidingPane';
export { default as Menu } from './components/containers/menu/Menu';
export { default as TabPanel } from './components/containers/tabPanels/TabPanel';
export { default as StripedContainer } from './components/containers/striped-container/StripedContainer';
export { default as Prompt } from './components/containers/prompt/Prompt';
export {
  default as Heading,
  PageHeading
} from './components/containers/heading/Heading';
export { default as Banner } from './components/containers/banner/Banner';
export { default as Table } from './components/containers/table/Table';
export { default as ResponsiveTable } from './components/containers/table/ResponsiveTable';
export { default as HorizontalScrollWrapper } from './components/containers/horizontalScrollWrapper/HorizontalScrollWrapper';
export { default as LoadingSkeleton } from './components/containers/loading-skeleton/LoadingSkeleton';

export {
  default as Form,
  FormContext,
  FormContextProvider
} from './components/containers/form/Form';
export { default as Control } from './components/controls/Control';
export { default as AdditionalHelp } from './components/controls/AdditionalHelp';
export { default as Label } from './components/controls/label/Label';
export { default as Textbox } from './components/controls/textbox/Textbox';
export { default as Textarea } from './components/controls/textbox/Textarea';
export { default as MaskedTextbox } from './components/controls/textbox/MaskedTextbox';
export { default as Button } from './components/controls/buttons/Button';
export { default as ActionButton } from './components/controls/buttons/ActionButton';
export { default as ToggleButton } from './components/controls/buttons/ToggleButton';
export { default as DropdownButton } from './components/controls/buttons/DropdownButton';
export { default as OutlineButton } from './components/controls/buttons/OutlineButton';
export { default as LinkButton } from './components/controls/buttons/LinkButton';

import Button from './components/controls/buttons/Button';
import OutlineButton from './components/controls/buttons/OutlineButton';
import LinkButton from './components/controls/buttons/LinkButton';
import ActionButton from './components/controls/buttons/ActionButton';

export const LoaderButton = withLoadingStateWhileRunning(Button);
export const LoaderOutlineButton = withLoadingStateWhileRunning(OutlineButton);
export const LoaderLinkButton = withLoadingStateWhileRunning(LinkButton);
export const LoaderActionButton = withLoadingStateWhileRunning(ActionButton);

export { default as IconButton } from './components/controls/buttons/IconButton';
export { default as PopoverLink } from './components/controls/buttons/PopoverLink';
export { default as AnswerButton } from './components/controls/answer-group/AnswerButton';
export { default as AnswerGroup } from './components/controls/answer-group/AnswerGroup';
export { default as RadioGroup } from './components/controls/radio-buttons/RadioGroup';
export { default as RadioButton } from './components/controls/radio-buttons/RadioButton';
export { default as Dropdown } from './components/controls/dropdown/Dropdown';
export { default as Checkbox } from './components/controls/checkbox/Checkbox';
export { default as CheckboxGroup } from './components/controls/checkbox/CheckboxGroup';
export { default as Switch } from './components/controls/switch/Switch';

export { default as Anchor } from './components/navigation/Anchor';
export { default as Breadcrumb } from './components/navigation/breadcrumb/Breadcrumb';
export { default as SideNav } from './components/navigation/sidenav/SideNav';
export { default as HorizontalNav } from './components/navigation/horizontalnav/HorizontalNav';

export { default as DatePicker } from './components/patterns/datepicker/DatePicker';
export { default as DateInput } from './components/patterns/dateInput/DateInput';
export { default as Incrementer } from './components/patterns/incrementer/Incrementer';
export { default as screenReaderOnly } from './components/patterns/screenReaderOnly/screenReaderOnly';
export { default as CallToAction } from './components/patterns/callToAction/CallToAction';
export { default as LightCallToAction } from './components/patterns/callToAction/LightCallToAction';
export { default as Action } from './components/patterns/callToAction/Action';
export { default as ProgressTracker } from './components/patterns/progress-tracker/ProgressTracker';
export { default as StarRating } from './components/patterns/starRating/StarRating';
export { default as StarRatingExplanation } from './components/patterns/starRating/StarRatingExplanation';
export { default as StatusTracker } from './components/patterns/statusTracker/StatusTracker';
export { default as SelectionDrawer } from './components/patterns/selectionDrawer/SelectionDrawer';

export { default as Spinner } from './components/base/spinner/Spinner';

export { default as Fade } from './components/util/Fade';
export { default as generateAlphaName } from './components/util/generateAlphaName';
export { useWindowWidth } from './components/util/useWindowWidth';
export { default as withWindowSize } from './components/util/withWindowSize';
export { default as StyleReset } from './components/util/StyleReset';
export { useTheme } from './components/util/useTheme';
export { isValidEmail } from './components/util/isValidEmail';
export {
  default as useRootNode,
  useRootNodeLocator
} from './components/util/useRootNode';
export { useLoadingState } from './hooks/useLoadingState';
export { useMountedOnlyState } from './hooks/useMountedOnlyState';
export { default as useTopZIndex } from './hooks/useTopZIndex';
export { default as useUniqueId } from './components/util/useUniqueId';

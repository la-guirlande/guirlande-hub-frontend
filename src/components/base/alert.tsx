import classNames from 'classnames';
import { FC, useState } from 'react';
import { VariantProps } from '../../utils/base-props';

/**
 * Alert props.
 */
interface AlertProps extends VariantProps {
  header?: string;
}

/**
 * Alert component.
 * 
 * An alert is a div that showed in the application window.
 * 
 * To use the alerts system, see the `Alert` hook.
 */
export const Alert: FC<AlertProps> = ({ variant, header, children }) => {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <div className={classNames(
      'm-5 p-4',
      'flex flex-col space-y-2',
      'rounded-md',
      `bg-${variant}`,
      'text-white',
      'drop-shadow-lg'
    )}>
      <div className="flex flex-row justify-between">
        <span className="text-lg font-bold">{header}</span>
        <button onClick={() => setVisible(false)}>X</button>
      </div>
      <hr />
      <div>{children}</div>
    </div>
  ) : (
    <></>
  );
}

Alert.defaultProps = {
  variant: 'primary',
  header: ''
}

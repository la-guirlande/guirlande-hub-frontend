import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';
import { VariantProps } from '../../utils/base-props';

/**
 * Input props.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps {}

/**
 * Input component.
 * 
 * This component is a `<input />` customization.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, variant, ...props }, ref) => (
  <input ref={ref} className={classNames(
    className,
    'px-2 py-1.5',
    'rounded-sm',
    `outline outline-1 outline-${variant}`,
    'text-black'
  )} {...props} />
));

Input.displayName = 'Input';
Input.defaultProps = {
  variant: 'primary'
}

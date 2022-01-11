import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps } from '../../utils/base-props';

/**
 * Button props.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps {}

/**
 * Button component.
 * 
 * This component is a `<button />` customization.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, children, ...props }, ref) => (
  <button ref={ref} className={classNames(
    className,
    'px-4 py-2',
    'rounded-sm',
    `bg-${variant} bg-opacity-100 hover:bg-opacity-70 disabled:bg-opacity-50`,
    'text-white font-bold',
    'disabled:cursor-not-allowed',
    'transition-all duration-200'
  )} {...props}>
    {children}
  </button>
));

Button.displayName = 'Button';
Button.defaultProps = {
  variant: 'primary'
}

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingAnimatedIcon } from '../utils/icons';
import { Button } from './base/button';
import { Input } from './base/input';

/**
 * Login form props.
 */
interface LoginFormProps {
  loading?: boolean;
  onSubmit?: (data: LoginFormData) => void;
}

/**
 * Login form data.
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Login form component.
 */
export const LoginForm: FC<LoginFormProps> = ({ loading, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ defaultValues: { email: '', password: '' } });

  const emailRegister = register('email', {
    required: { value: true, message: 'Email is required' },
    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
  });
  const passwordRegister = register('password', {
    required: { value: true, message: 'Password is required' }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Input type="text" placeholder="Email" variant="primary" {...emailRegister} />
          {errors.email && <small className="text-red-500">{errors.email.message}</small>}
        </div>
        <div className="flex flex-col gap-1">
          <Input type="password" placeholder="Password" variant="primary" {...passwordRegister} />
          {errors.password && <small className="text-red-500">{errors.password.message}</small>}
        </div>
        <Button type="submit" variant="primary" disabled={loading}>
          { loading ? <LoadingAnimatedIcon width="12" /> : 'Login' }
        </Button>
      </div>
    </form>
  );
}

LoginForm.displayName = 'Login form';
LoginForm.defaultProps = {
  loading: false,
  onSubmit: () => {}
}

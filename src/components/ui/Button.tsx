import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type ExtendedButtonVariants = 'text' | 'outlined' | 'contained';

interface ButtonProps extends Omit<MuiButtonProps, 'className'> {
  variant?: ExtendedButtonVariants;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'contained',
  size = 'medium',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant === 'contained' ? 'text' : variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
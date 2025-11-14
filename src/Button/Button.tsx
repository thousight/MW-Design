import './button.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button contents */
  label: string
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large'
  /** Is the button disabled? */
  disabled?: boolean
}

/** Primary UI component for user interaction */
export const Button = ({
  label,
  size = 'medium',
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const classes = ['storybook-button', `storybook-button--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}

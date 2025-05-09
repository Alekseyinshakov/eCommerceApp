interface formTypes {
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  list?: string
  className?: string
}

const FormInput = ({
  name,
  type = 'text',
  placeholder,
  required = false,
  list,
  className = '',
}: formTypes) => (
  <>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      list={list}
      className={className}
    />
  </>
)

export default FormInput

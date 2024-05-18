interface types {
  id: string;
  type: string;
  placeholder?: string;
  register?: any;
  name?: string;
  max?: string | number;
  maxLength?: string | number;
  isNumber?: boolean;
  defaultValue?: number | string;
  code?: boolean;
}

export default function Input(props: types) {
  return (
    <input
      {...props.register(props.name, { valueAsNumber: props.isNumber })}
      className={`outline-azul-primary rounded-[5px] ${
        props.code ? "text-4xl w-[13rem]  text-center p-1" : "p-1"
      } `}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      max={props.max}
      defaultValue={props.defaultValue}
    />
  );
}

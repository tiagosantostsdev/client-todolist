interface types {
  id: string;
  text: string;
}

export default function Label(props: types) {
  return <label className="text-white text-sm" htmlFor={`${props.id}`}>{props.text}</label>;
}

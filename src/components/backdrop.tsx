export default function Backdrop(props: React.ComponentProps<"div">) {
  return (
    <div {...props} className="bg-black opacity-50 h-full w-full absolute" />
  );
}

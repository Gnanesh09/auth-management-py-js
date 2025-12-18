export default function Input({ type = "text", name, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      className="w-full p-2 border rounded mt-3"
    />
  )
}

import api from "../api/axios"
import Input from "../components/Input"

export default function Login() {

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)
    const data = {
      email: form.get("email"),
      password: form.get("password"),
    }

    try {
      const res = await api.post("/auth/login", data)
      alert(res.data.message)
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />

        <button className="w-full bg-black text-white py-2 mt-4 rounded">
          Login
        </button>
      </form>
    </div>
  )
}
